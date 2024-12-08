import { useStoreShapes, type Shape } from '@entities/Shape'

import { InfoRectangle } from './InfoRectangle'

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
          rectangle={shape}
          onSave={(values) => {
            onSave?.(shape!.id, values)
          }}
        />
      )

    default:
      return <div>Этот тип фигуры пока что не поддерживается, ждите обновлений</div>
  }
}
