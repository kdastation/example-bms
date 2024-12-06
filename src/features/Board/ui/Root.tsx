import Konva from 'konva'
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { Layer, Rect, Stage, Transformer } from 'react-konva'

import { createContext } from '@shared/react/lib/createContext'
import { mergeRefs } from '@shared/react/lib/mergeRefs'

const Rectangle = ({ shapeProps, onChange }) => {
  const shapeRef = React.useRef()

  return (
    <Rect
      ref={shapeRef}
      {...shapeProps}
      name='rectangle'
      draggable
      onDragEnd={(e) => {
        console.log(e.target.id(), e.target.x(), e.target.y())
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
        })
      }}
      onTransformEnd={(e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = shapeRef.current
        const scaleX = node.scaleX()
        const scaleY = node.scaleY()

        // we will reset it back
        node.scaleX(1)
        node.scaleY(1)
        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          // set minimal value
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY),
        })
      }}
    />
  )
}

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'blue',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
  },
]

export type Scene = {
  stageRef: RefObject<Konva.Stage | null>
}

const [SceneContextProvider, useScene] = createContext<Scene>({
  name: 'SceneContextProvider',
  hookName: 'useDeps',
  providerName: '<SceneContextProvider />',
})

export const SceneProvider = ({ stageRef, children }: Scene & { children: ReactNode }) => {
  const values = useMemo((): Scene => {
    return {
      stageRef,
    }
  }, [])

  return <SceneContextProvider value={values}>{children}</SceneContextProvider>
}

const Transform = ({ ids }: { ids: string[] }) => {
  const { stageRef } = useScene()

  const transformRef = useRef<Konva.Transformer | null>(null)

  useEffect(() => {
    const stage = stageRef.current

    const transformer = transformRef.current

    if (!stage || !transformer) {
      return
    }

    const nodes = ids.map((id) => stage.findOne(`#${id}`))

    transformer.nodes(nodes)
  }, [ids])

  return (
    <Transformer
      ref={transformRef}
      boundBoxFunc={(oldBox, newBox) => {
        // limit resize
        if (newBox.width < 5 || newBox.height < 5) {
          return oldBox
        }
        return newBox
      }}
    />
  )
}

const useSelectController = ({
  onSelect,
  selected,
}: {
  onSelect: (shapes: string[]) => void
  selected: string[]
}) => {
  const rectRef = useRef<Konva.Rect | null>(null)
  const stageRef = useRef<Konva.Stage | null>(null)

  const [rect, setRect] = useState<{
    x: number
    y: number
    width: number
    height: number
    visible: boolean
  }>(null)

  const selection = useRef({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  })

  const updateSelectionRect = () => {
    setRect({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
      fill: 'rgba(0, 161, 255, 0.3)',
    })
  }

  const onTouchStart = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage()

    if (clickedOnEmpty) {
      onSelect?.([])
    }
  }

  const onMouseDown = (e) => {
    const isElement = e.target.findAncestor('.elements-container')

    const isTransformer = e.target.findAncestor('Transformer')

    if (isElement || isTransformer) {
      return
    }

    const pos = e.target.getStage().getPointerPosition()

    selection.current.visible = true
    selection.current.x1 = pos.x
    selection.current.y1 = pos.y
    selection.current.x2 = pos.x
    selection.current.y2 = pos.y

    updateSelectionRect()
  }

  const onMouseMove = (e) => {
    if (!selection.current.visible) {
      return
    }

    const pos = e.target.getStage().getPointerPosition()

    selection.current.x2 = pos.x
    selection.current.y2 = pos.y

    updateSelectionRect()
  }

  const onMouseUp = () => {
    selection.current.visible = false

    const stage = stageRef.current

    const { x1, x2, y1, y2 } = selection.current

    const moved = x1 !== x2 || y1 !== y2

    if (!moved) {
      updateSelectionRect()
      return
    }

    if (selected.length > 1) {
      updateSelectionRect()
      return
    }

    const selBox = rectRef.current?.getClientRect()

    if (!selBox || !stage) {
      return
    }

    const selectableShapes = stage.find('.rectangle')

    const shapesInRect = selectableShapes.filter((elementNode) => {
      const elementBox = elementNode.getClientRect()

      return Konva.Util.haveIntersection(selBox, elementBox)
    })

    onSelect?.(shapesInRect.map((el) => el.id()))

    updateSelectionRect()
  }

  const onClick = (e) => {
    // if we are selecting with rect, do nothing
    const { x1, x2, y1, y2 } = selection.current

    const moved = x1 !== x2 || y1 !== y2

    if (moved) {
      return
    }

    const stage = e.target.getStage()

    if (e.target === stage) {
      onSelect?.([])
      return
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('rectangle')) {
      return
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey

    const isSelected = selected.length > 0

    if (!metaPressed && !isSelected) {
      onSelect([e.target.id()])
    } else if (metaPressed && isSelected) {
      onSelect?.(selected.filter((oldId) => oldId !== e.target.id()))
    } else if (metaPressed && !isSelected) {
      onSelect?.([...selected, e.target.id()])
    }
  }

  return {
    stageRef,
    onClick,
    onTouchStart,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    elements: <>{rect && <Rect ref={rectRef} fill='rgba(0,0,255,0.5)' {...rect} />}</>,
  }
}

export const Root = () => {
  const stageRef = useRef<Konva.Stage | null>(null)

  const [rectangles, setRectangles] = useState(initialRectangles)
  const [selectedIds, selectShapes] = useState([])

  const {
    elements,
    stageRef: stageRefSelectController,
    ...handlers
  } = useSelectController({
    onSelect: selectShapes,
    selected: selectedIds,
  })

  return (
    <SceneProvider stageRef={stageRef}>
      <Stage
        ref={mergeRefs([stageRef, stageRefSelectController])}
        width={window.innerWidth}
        height={window.innerHeight}
        {...handlers}
      >
        <Layer>
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                getKey={i}
                shapeProps={rect}
                onChange={(newAttrs) => {
                  setRectangles((prevState) => {
                    const rects = prevState.slice()
                    rects[i] = newAttrs

                    return rects
                  })
                }}
              />
            )
          })}

          {elements}
        </Layer>

        <Layer>
          <Transform ids={selectedIds} />
        </Layer>
      </Stage>
    </SceneProvider>
  )
}
