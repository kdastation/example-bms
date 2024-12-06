import type Konva from 'konva'
import React, { useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'

import { mergeRefs } from '@shared/react/lib/mergeRefs'

import { useSelectController } from './contoller/useSelectController'
import { Rectangle, type RectangleData } from './Rectangle'
import { SceneProvider } from './SceneProvider'
import { Transform } from './Transform'

const initialRectangles: RectangleData[] = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'blue',
    id: 'rect1',
    canSelect: false,
    canDrag: false,
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
  },
  {
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect3',
  },
]

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
                key={rect.id}
                width={rect.width}
                fill={rect.fill}
                y={rect.y}
                x={rect.x}
                canSelect={rect.canSelect}
                canDrag={rect.canDrag}
                height={rect.height}
                id={rect.id}
                onChange={(newAttrs) => {
                  setRectangles((prevState) => {
                    const rects = prevState.slice()
                    rects[i] = {
                      ...rects[i],
                      ...newAttrs,
                    }

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
