import { v4 as uuidv4 } from 'uuid'

import { type Shape, type ShapeAttrs } from '../../model/types/Shape'
import { useEventsPublic } from '../Events/Public'
import { Arrow } from './Arrow'
import { Card } from './Card'
import { Circle } from './Circle'
import { createCard } from './creators'
import { Image } from './Image'
import { Line } from './Line'
import { Rectangle } from './Rectangle'
import { Text } from './Text'

type Props = {
  shape: Shape
  selected: string[]
}

export const FactoryShapes = ({ shape, selected }: Props) => {
  const { onEvent } = useEventsPublic()

  const handleChangeShape = (attrs: ShapeAttrs) => {
    onEvent?.({
      attrs: attrs,
      type: 'change-attrs',
    })
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
            onEvent?.({
              type: 'start-change-text',
              id: shape.id,
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
          onEndChangeText={(newText) => {
            onEvent?.({
              type: 'end-change-text',
              newText: newText,
              id: shape.id,
            })

            onEvent?.({
              type: 'select',
              ids: [shape.id],
            })

            setTimeout(() => {
              onEvent?.({
                type: 'change-tool',
                tool: 'idle',
              })
            }, 100)
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
            //TODO: add generate id
            const id = uuidv4().toString()

            onEvent?.({
              type: 'add-shape',
              shape: createCard({
                type: 'card',
                rotation: 0,
                id: id,
                fill: shape.fill,
                canCreateNewCard: true,
                scale: {
                  x: 1,
                  y: 1,
                },
                ...newCardAttrs,
              }),
            })

            onEvent?.({
              type: 'select',
              ids: [id],
            })
          }}
        />
      )

    case 'line':
      return <Line {...shape} onChange={handleChangeShape} />
  }
}
