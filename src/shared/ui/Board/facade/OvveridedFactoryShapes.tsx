import { useEventsPublic } from '../modules/Events/Public'
import { useSelectedShapes } from '../modules/SelectStore'
import { FactoryShape, type FactoryShapeProps } from '../modules/Shapes'

export const OvveridedFactoryShape = ({ shape }: Pick<FactoryShapeProps, 'shape'>) => {
  const { selectedShapes } = useSelectedShapes()

  const { onEvent } = useEventsPublic()

  return (
    <FactoryShape
      shape={shape}
      selected={selectedShapes}
      onChangeAttrsShape={(shapeAttrs) => {
        onEvent?.({
          type: 'change-attrs',
          attrs: shapeAttrs,
        })
      }}
      onEndChangeText={(shapeId, newText) => {
        onEvent?.({
          type: 'end-change-text',
          newText: newText,
          id: shapeId,
        })

        onEvent?.({
          type: 'select',
          ids: [shapeId],
        })

        setTimeout(() => {
          onEvent?.({
            type: 'change-tool',
            tool: 'idle',
          })
        }, 100)
      }}
      onStartChangeText={(shapeId) => {
        onEvent?.({
          type: 'start-change-text',
          id: shapeId,
        })

        onEvent?.({
          type: 'select',
          ids: [],
        })

        onEvent?.({
          type: 'change-tool',
          tool: 'edit-text',
        })
      }}
      onAddNewCardShape={(newCardShape) => {
        onEvent?.({
          type: 'add-shape',
          shape: newCardShape,
        })

        onEvent?.({
          type: 'select',
          ids: [newCardShape.id],
        })
      }}
    />
  )
}
