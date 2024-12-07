import { useState } from 'react'

import { Board, type Shape, type Tool } from '@features/Board'
import { distanceTwoPoints } from '@features/Board/ui/utils'

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
    type: 'arrow',
    x: 0,
    y: 0,
    id: 'line-1',
    stroke: 'red',
    points: [150, 150, 300, 300],
    width: distanceTwoPoints({ x1: 150, y1: 150, x2: 150, y2: 150 }),
    height: distanceTwoPoints({ x1: 150, y1: 150, x2: 150, y2: 150 }),
    scale: {
      x: 1,
      y: 1,
    },
    rotation: 0,
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
        <Board
          tool={tool}
          selected={selected}
          shapes={shapes}
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
          }}
        />
      </div>
    </>
  )
}
