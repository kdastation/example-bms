
## Контролируемый движок холста

Пример использования

```
import merge from 'lodash/merge'
import { useState } from 'react'

import { Board, utils, type Shape } from '@shared/ui/Board'

const ExampleZoomShape = () => {
  const zoomOnShape = utils.useZoomOnShape()

  return (
    <button
      onClick={() => {
        zoomOnShape('rectangle-id')
      }}
    >
      Пример зума к фигуре
    </button>
  )
}

const ExampleDragDropElement = () => {
  return (
    <div>
      Пример драг дроп элементов
      <Board.DragDropElement
        shape={{
          type: 'image',
          src: 'https://static.insales-cdn.com/images/products/1/7222/329129014/2._%D0%BC%D0%B8%D0%BD%D1%8C%D0%BE%D0%BD_610%D1%85850_%D0%BC%D0%BC.jpg',
          height: 300,
          width: 300,
          rotation: 0,
          scale: {
            x: 1,
            y: 1,
          },
        }}
      >
        <button>Брось меня на карту</button>
      </Board.DragDropElement>
    </div>
  )
}

export const Example = () => {
  const [selectedShapes, setSelectedShapes] = useState<string[]>([])

  const [tool, setTool] = useState('idle')

  const [shapes, setShapes] = useState<Shape[]>([
    {
      type: 'rectangle',
      id: 'rectangle-id',
      height: 400,
      width: 400,
      scale: {
        x: 1,
        y: 1,
      },
      x: 50,
      y: 50,
      rotation: 0,
      fill: 'red',
    },
  ])

  const updateShapes = (id: string, updatedShape: DeepPartial<Shape>) => {
    setShapes((prevShapes) => {
      return prevShapes.map((shape) => {
        if (shape.id === id) {
          return merge(shape, updatedShape)
        }

        return shape
      })
    })
  }

  const addShapes = (newShape: Shape) => {
    setShapes((prev) => [...prev, newShape])
  }

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <Board.Root
        onEvent={(event) => {
          if (event.type === 'change-attrs') {
            updateShapes(event.attrs.id, event.attrs)
          }

          if (event.type === 'select') {
            setSelectedShapes(event.ids)
          }

          if (event.type === 'add-shape') {
            addShapes(event.shape)
          }

          if (event.type === 'change-tool') {
            setTool(event.tool)
          }

          if (event.type === 'end-change-text') {
            updateShapes(event.id, {
              text: event.newText,
            })
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 40,
          }}
        >
          <ExampleZoomShape />
          <ExampleDragDropElement />
        </div>

        <Board.Board tool={tool} selected={selectedShapes} shapes={shapes} />
      </Board.Root>
    </div>
  )
}

```