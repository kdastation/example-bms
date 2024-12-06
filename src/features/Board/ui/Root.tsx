import type Konva from 'konva'
import React, { useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'

import { mergeRefs } from '@shared/react/lib/mergeRefs'

import { Circle, type CircleData } from './Circle'
import { useSelectController } from './contoller/useSelectController'
import { useZoomController } from './contoller/useZoomController'
import { Image, type ImageData } from './Image'
import { Rectangle, type RectangleData } from './Rectangle'
import { SceneProvider } from './SceneProvider'
import { StageProvider, useStage } from './StageProvider'
import { Transform } from './Transform'

type RectangleShape = RectangleData & {
  type: 'rectangle'
}

type ImageShape = ImageData & {
  type: 'image'
}

type CircleShape = CircleData & {
  type: 'circle'
}

type ShapeData = RectangleShape | ImageShape | CircleShape

const initialRectangles: ShapeData[] = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'blue',
    id: 'rect1',
    canSelect: false,
    canDrag: false,
    type: 'rectangle',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
    type: 'rectangle',
  },
  {
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect3',
    type: 'rectangle',
  },
  {
    type: 'image',
    x: 400,
    y: 400,
    canDrag: true,
    canSelect: true,
    id: 'image-1',
    width: 300,
    height: 300,
    src: 'https://p.turbosquid.com/ts-thumb/sC/TOOTGK/10EZr9Lr/10/jpg/1445892121/600x600/fit_q87/e696373449ba51fba8734edcda4dca4f780585b4/10.jpg',
  },
  {
    x: 300,
    y: 600,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'circle1',
    type: 'circle',
  },
]

const Board = () => {
  const stageRef = useRef<Konva.Stage | null>(null)

  const stageStore = useStage()

  const { setStage, ...stage } = stageStore((state) => state)

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

  const { onWheel } = useZoomController({
    onZoom: setStage,
  })

  return (
    <SceneProvider stageRef={stageRef}>
      <Stage
        ref={mergeRefs([stageRef, stageRefSelectController])}
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        {...handlers}
        onWheel={onWheel}
      >
        <Layer>
          {rectangles.map((rect, i) => {
            if (rect.type === 'circle') {
              return (
                <Circle
                  key={rect.id}
                  {...rect}
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
            }

            if (rect.type === 'image') {
              return (
                <Image
                  key={rect.id}
                  {...rect}
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
            }

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

export const Root = () => {
  return (
    <StageProvider>
      <Board />
    </StageProvider>
  )
}
