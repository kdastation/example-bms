import { type CardShape, type Shape, type ShapeAttrs } from '../../model/types/Shape'
import { createCard } from '../../packages/ShapeCreators'
import { generateId } from '../../packages/utils/utils'
import { Arrow } from './Arrow'
import { Card } from './Card'
import { Circle } from './Circle'
import { Image } from './Image'
import { Line } from './Line'
import { Rectangle } from './Rectangle'
import { Text } from './Text'

type Props = {
  shape: Shape
  selected: string[]
  onChangeAttrsShape?: (shapeAttrs: ShapeAttrs) => void
  onStartChangeText?: (shapeId: string) => void
  onEndChangeText?: (shapeId: string, newText: string) => void
  onAddNewCardShape?: (cardShape: CardShape) => void
}

export const FactoryShapes = ({
  shape,
  selected,
  onChangeAttrsShape,
  onStartChangeText,
  onEndChangeText,
  onAddNewCardShape,
}: Props) => {
  const handleChangeShape = (attrs: ShapeAttrs) => {
    onChangeAttrsShape?.(attrs)
  }

  switch (shape.type) {
    case 'rectangle':
      return <Rectangle {...shape} onChange={handleChangeShape} />

    case 'circle':
      return <Circle {...shape} onChange={handleChangeShape} />

    case 'image':
      return <Image {...shape} onChange={handleChangeShape} />

    case 'arrow':
      return <Arrow {...shape} onChange={handleChangeShape} />

    case 'text':
      return (
        <Text
          {...shape}
          onChange={handleChangeShape}
          onStartChangeText={() => {
            onStartChangeText?.(shape.id)
          }}
          onEndChangeText={(newText) => {
            onEndChangeText?.(shape.id, newText)
          }}
        />
      )

    case 'card':
      return (
        <Card
          {...shape}
          onChange={handleChangeShape}
          canCreateNewCard={
            shape.canCreateNewCard ? selected.length === 1 && selected.includes(shape.id) : false
          }
          onAddCard={(newCardAttrs) => {
            onAddNewCardShape?.(
              createCard({
                type: 'card',
                rotation: 0,
                id: generateId(),
                fill: shape.fill,
                canCreateNewCard: true,
                scale: {
                  x: 1,
                  y: 1,
                },
                ...newCardAttrs,
              })
            )
          }}
        />
      )

    case 'line':
      return <Line {...shape} onChange={handleChangeShape} />
  }
}
