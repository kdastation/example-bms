import { useStoreShapes, type Shape } from '@entities/Shape'

import { InfoImage } from './InfoImage'
import { InfoRectangle } from './InfoRectangle'
import { InfoText } from './InfoText'

type Props = {
  id: string
  onSave?: (id: string, values: DeepPartial<Shape>) => void
}

export const Root = ({ id, onSave }: Props) => {
  const storeShapes = useStoreShapes()

  const shape = storeShapes.shapes.find((shape) => shape.id === id)

  if (!shape) {
    throw new Error('Shape not found')
  }

  switch (shape.type) {
    case 'rectangle':
      return (
        <InfoRectangle
          values={shape}
          onSave={(values) => {
            onSave?.(shape!.id, values)
          }}
        />
      )

    case 'text':
      return (
        <InfoText
          values={shape}
          onSave={(values) => {
            onSave?.(shape!.id, values)
          }}
        />
      )

    case 'image':
      return (
        <InfoImage
          values={shape}
          onSave={(values) => {
            onSave?.(shape!.id, values)
          }}
        />
      )

    default:
      return <div>Этот тип фигуры пока что не поддерживается, ждите обновлений</div>
  }
}
