import type Konva from 'konva'
import React, { useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'

import { mergeRefs } from '@shared/react/lib/mergeRefs'

import { useSelectController } from './contoller/useSelectController'
import { Image, type ImageData } from './Image'
import { Rectangle, type RectangleData } from './Rectangle'
import { SceneProvider } from './SceneProvider'
import { Transform } from './Transform'

type RectangleShape = RectangleData & {
  type: 'rectangle'
}

type ImageShape = ImageData & {
  type: 'image'
}

type ShapeData = RectangleShape | ImageShape

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
