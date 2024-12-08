import { useState } from 'react'

import { useStoreShapes } from '@entities/Shape'

import { Board, utils, type Tool } from '@shared/ui/Board'
import { Flex } from '@shared/ui/Flex'

import { ShapesList, type PropsShapesList } from '../packages/ShapesList'
import { ToolsShapes } from '../packages/ToolShapes'

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

  const storeShapes = useStoreShapes()

  const shapes = storeShapes.shapes

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
              storeShapes.update(event.attrs.id, event.attrs)
            }

            if (event.type === 'select') {
              setSelected(event.ids)
            }

            if (event.type === 'add-shape') {
              storeShapes.add(event.shape)
            }

            if (event.type === 'change-tool') {
              setTool(event.tool)
            }

            if (event.type === 'end-change-text') {
              storeShapes.update(event.id, {
                text: event.newText,
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
