import Konva from 'konva'
import { useState } from 'react'
import { Group, KonvaNodeComponent, Layer, Line, Shape, Stage } from 'react-konva'

import { Rectangle } from './Rectangle'

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
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
] as const

export const Root = () => {
  const [rectangles, setRectangles] = useState(initialRectangles)
  const [selectedId, selectShape] = useState<string | null>(null)

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage()

    if (clickedOnEmpty) {
      selectShape(null)
    }
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id)
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice()
                rects[i] = newAttrs
                setRectangles(rects)
              }}
            />
          )
        })}
      </Layer>
    </Stage>
  )
}
