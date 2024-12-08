import { useState } from 'react'

import { useStoreShapes } from '@entities/Shape'

import { Board, utils, type Tool } from '@shared/ui/Board'
import { Flex } from '@shared/ui/Flex'

import { apiSelectShapes, ProviderSelectShapes } from '../packages/Select'
import { ShapesList } from '../packages/ShapesList'
import { ToolsShapes } from '../packages/ToolShapes'

const OverridedShapesList = () => {
  const storeShapes = useStoreShapes()

  const shapes = storeShapes.shapes

  const selectedShapes = apiSelectShapes.useGetSelectedIds()

  const selectShapes = apiSelectShapes.useSelect()

  const zoomOnShape = utils.useZoomOnShape()

  return (
    <ShapesList
      shapes={shapes}
      selected={selectedShapes}
      onSelect={(id) => {
        selectShapes?.(id)

        zoomOnShape(id)
      }}
    />
  )
}

const Root = () => {
  const storeShapes = useStoreShapes()

  const shapes = storeShapes.shapes

  const selectedShapes = apiSelectShapes.useGetSelectedIds()

  const selectShapes = apiSelectShapes.useSelect()

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
              selectShapes(event.ids)
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
            <Board.Board tool={tool} selected={selectedShapes} shapes={shapes} />

            <OverridedShapesList />
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

export const RootProvider = () => {
  return (
    <ProviderSelectShapes>
      <Root />
    </ProviderSelectShapes>
  )
}
