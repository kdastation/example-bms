import { useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { useStoreShapes } from '@entities/Shape'

import { useEventListener } from '@shared/react/hooks/useEventListener'
import { Board, utils } from '@shared/ui/Board'
import { Flex } from '@shared/ui/Flex'

import { useCreateShape } from '../packages/Create'
import { useDelete } from '../packages/Delete'
import { InfoTab } from '../packages/InfoShape'
import { apiSelectShapes, ProviderSelectShapes } from '../packages/Select'
import { ShapesList } from '../packages/ShapesList'
import { Tools, type Tool } from '../packages/Tools'
import { ToolsShapes } from '../packages/ToolShapes'
import { useUpdate } from '../packages/Update'

const OverridedShapesList = () => {
  const selectedShapes = apiSelectShapes.useGetSelectedIds()

  const selectShapes = apiSelectShapes.useSelect()

  const zoomOnShape = utils.useZoomOnShape()

  return (
    <ShapesList
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

  const createShape = useCreateShape()

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
    <Board.Root
      onEvent={(event) => {
        if (event.type === 'change-attrs') {
          updateShapes(event.attrs.id, event.attrs)
        }

        if (event.type === 'select') {
          selectShapes(event.ids)
        }

        if (event.type === 'add-shape') {
          createShape(event.shape)
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
          padding: '40px',
          height: '100%',
        }}
      >
        <PanelGroup direction={'horizontal'}>
          <Panel defaultSize={5} minSize={5}>
            <Tools selectedTool={tool} onSelect={setTool} />
          </Panel>
          <PanelResizeHandle
            style={{
              width: '8px',
              background: '#39414d',
            }}
          />

          <Panel defaultSize={30} minSize={20}>
            <div
              style={{
                height: '78%',
                border: '1px solid black',
                marginBottom: '32px',
              }}
            >
              <Board.Board tool={tool} selected={selectedShapes} shapes={shapes} />
            </div>

            <ToolsShapes />
          </Panel>

          <PanelResizeHandle
            style={{
              width: '8px',
              background: '#39414d',
            }}
          />
          <Panel defaultSize={10} minSize={10}>
            <Flex align={'start'}>
              <OverridedShapesList />
            </Flex>
          </Panel>

          <PanelResizeHandle
            style={{
              width: '8px',
              background: '#39414d',
            }}
          />

          <Panel defaultsize={20} minSize={10}>
            {selectedShapes.length === 1 && (
              <InfoTab
                id={selectedShapes[0]}
                onSave={(id, values) => {
                  updateShapes(id, values)
                }}
              />
            )}
          </Panel>
        </PanelGroup>
      </div>
    </Board.Root>
  )
}

export const RootProvider = () => {
  return (
    <ProviderSelectShapes>
      <Root />
    </ProviderSelectShapes>
  )
}
