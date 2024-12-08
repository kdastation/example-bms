import { useState } from 'react'

import { Board, utils, type Shape, type Tool } from '@shared/ui/Board'
import { Flex } from '@shared/ui/Flex'

import { ShapesList, type PropsShapesList } from '../packages/ShapesList'
import { ToolsShapes } from '../packages/ToolShapes'

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

const OverridedShapesList = ({ shapes, onSelect, selected }: PropsShapesList) => {
  const zoomOnShape = utils.useZoomOnShape()

  return (
    <ShapesList
      shapes={shapes}
      selected={selected}
      onSelect={(id) => {
        onSelect?.(id)

        zoomOnShape(id)
      }}
    />
  )
}

export const Root = () => {
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
          <Flex gap={30} align={'start'}>
            <Board.Board tool={tool} selected={selected} shapes={shapes} />

            <OverridedShapesList
              selected={selected}
              onSelect={(id) => {
                setSelected([id])
              }}
              shapes={shapes}
            />
          </Flex>

          <div
            style={{
              marginTop: '20px',
            }}
          >
            <ToolsShapes />
          </div>
        </Board.Root>
      </div>
    </>
  )
}
