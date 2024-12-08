import { useState } from 'react'

import { Board, type Shape, type Tool } from '@features/Board'

const initialShapes: Shape[] = [
  {
    type: 'rectangle',
    y: 0,
    x: 0,
    height: 120,
    width: 160,
    fill: 'red',
    scale: {
      x: 1,
      y: 1,
    },
    id: 'rect-1',
    rotation: 0,
  },
  {
    type: 'circle',
    x: 100,
    y: 100,
    rotation: 0,
    scale: {
      x: 1,
      y: 1,
    },
    fill: 'green',
    width: 40,
    height: 40,
    id: 'circle-1',
  },
  {
    type: 'card',
    rotation: 0,
    scale: {
      x: 1,
      y: 1,
    },
    height: 400,
    width: 400,
    fill: 'rgb(255, 249, 177)',
    id: 'card-1',
    x: 300,
    y: 300,
    canCreateNewCard: true,
  },
  {
    type: 'text',
    scale: {
      x: 1,
      y: 1,
    },
    height: 400,
    width: 400,
    rotation: 0,
    text: 'sadsada',
    id: 'text-1',
    fontSize: 14,
    color: 'red',
    x: 100,
    y: 200,
  },
]

export const App = () => {
  const [selected, setSelected] = useState<string[]>([])

  const [shapes, setShapes] = useState<Shape[]>(
    JSON.parse(localStorage.getItem('shapes')) || initialShapes
  )

  const [tool, setTool] = useState<Tool>('idle')

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Excalidraw Example</h1>
      <div style={{ height: '500px' }}>
        <button
          onClick={() => {
            localStorage.setItem('shapes', JSON.stringify(shapes))
          }}
        >
          save
        </button>
        <button
          onClick={() => {
            setTool('idle')
          }}
        >
          idle
        </button>

        <button
          onClick={() => {
            setTool('add')
          }}
        >
          add
        </button>

        <button
          onClick={() => {
            setTool('drag')
          }}
        >
          drag
        </button>

        <button
          onClick={() => {
            setTool('arrow')
          }}
        >
          arrow
        </button>

        <button
          onClick={() => {
            setTool('multi-line')
          }}
        >
          multiline controller
        </button>

        <Board.Root
          onEvent={(event) => {
            if (event.type === 'change-attrs') {
              setShapes((prevState) => {
                return prevState.map((shape) => {
                  if (shape.id === event.attrs.id) {
                    return {
                      ...shape,
                      ...event.attrs,
                    }
                  }

                  return shape
                })
              })
            }

            if (event.type === 'select') {
              setSelected(event.ids)
            }

            if (event.type === 'add-shape') {
              setShapes((prev) => [...prev, event.shape])
            }

            if (event.type === 'change-tool') {
              setTool(event.tool)
            }

            if (event.type === 'end-change-text') {
              setShapes((prev) => {
                return prev.map((shape) => {
                  if (shape.type === 'text' && shape.id === event.id) {
                    return {
                      ...shape,
                      text: event.newText,
                    }
                  }

                  return shape
                })
              })
            }
          }}
        >
          <Board.DragDropElement
            shape={{
              type: 'image',
              rotation: 0,
              scale: {
                x: 1,
                y: 1,
              },
              height: 400,
              width: 400,
              src: 'https://static.insales-cdn.com/images/products/1/7222/329129014/2._%D0%BC%D0%B8%D0%BD%D1%8C%D0%BE%D0%BD_610%D1%85850_%D0%BC%D0%BC.jpg',
            }}
          >
            <div
              style={{
                color: 'red',
              }}
            >
              Квадрат
            </div>
          </Board.DragDropElement>
          <Board.Board tool={tool} selected={selected} shapes={shapes} />
        </Board.Root>
      </div>
    </>
  )
}
