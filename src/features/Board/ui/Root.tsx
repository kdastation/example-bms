import { useState } from 'react'

import { useStoreShapes } from '@entities/Shape'

import { useEventListener } from '@shared/react/hooks/useEventListener'
import { Board, utils } from '@shared/ui/Board'
import { Flex } from '@shared/ui/Flex'

import { useDelete } from '../packages/Delete'
import { InfoTab } from '../packages/InfoShape'
import { apiSelectShapes, ProviderSelectShapes } from '../packages/Select'
import { ShapesList } from '../packages/ShapesList'
import { Tools, type Tool } from '../packages/Tools'
import { ToolsShapes } from '../packages/ToolShapes'
import { useUpdate } from '../packages/Update'

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
  const [tool, setTool] = useState<Tool>('idle')

  const storeShapes = useStoreShapes()

  const shapes = storeShapes.shapes

  const selectedShapes = apiSelectShapes.useGetSelectedIds()

  const selectShapes = apiSelectShapes.useSelect()

  const deleteShapes = useDelete()

  const updateShapes = useUpdate()

  useEventListener('keydown', (event) => {
    if (event.key === 'Delete' && selectedShapes.length > 0) {
      deleteShapes(selectedShapes)
      selectShapes([])
    }

    if (event.code === 'Space') {
      setTool('drag')
    }
  })

  useEventListener('keyup', (event) => {
    if (event.code === 'Space') {
      setTool('idle')
    }
  })

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Excalidraw Example</h1>
      <div style={{ height: '500px' }}>
        <Board.Root
          onEvent={(event) => {
            if (event.type === 'change-attrs') {
              updateShapes(event.attrs.id, event.attrs)
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
              updateShapes(event.id, {
                text: event.newText,
              })
            }
          }}
        >
          <Flex gap={30} align={'start'}>
            <Flex align={'start'} direction={'column'} gap={12}>
              <Tools selectedTool={tool} onSelect={setTool} />
            </Flex>

            <Flex align={'start'} gap={32} direction={'column'}>
              <Board.Board tool={tool} selected={selectedShapes} shapes={shapes} />
              <ToolsShapes />
            </Flex>

            <OverridedShapesList />

            {selectedShapes.length === 1 && (
              <InfoTab
                id={selectedShapes[0]}
                onSave={(id, values) => {
                  updateShapes(id, values)
                }}
              />
            )}
          </Flex>
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
