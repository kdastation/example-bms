import type Konva from 'konva'
import { useState } from 'react'
import { Circle, Group, Rect } from 'react-konva'

import { callAllHandlers } from '@shared/react/lib/callAllHandlers'

import { type CardData, type ShapeAttrs } from './Shape'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

type Events = {
  onAddCard?: ({
    width,
    height,
    y,
    x,
  }: {
    width: number
    height: number
    x: number
    y: number
  }) => void
  onChange?: (shape: ShapeAttrs) => void
}

type Direction = 'left' | 'right'

type Props = CardData & Events

export const Card = ({
  canDrag = true,
  canSelect = true,
  fill,
  onAddCard,
  onChange,
  canCreateNewCard,
  ...props
}: Props) => {
  const [canVisiblePoint, setCanVisiblePoint] = useState(false)

  const [visiblePredictCard, setVisiblePredictCard] = useState<Direction | null>(null)

  const { onDragEnd } = useDragShape({
    onChange: (coords) => {
      onChange?.({
        ...props,
        ...coords,
      })
    },
  })

  const { ref: refShapeForTransform, onTransformEnd } = useTransformShape<Konva.Group>({
    onChange: (sizes) => {
      onChange?.({
        ...props,
        ...sizes,
      })
    },
  })

  const getPredictCardCoords = (direction: 'left' | 'right') => {
    return {
      width: props.width,
      height: props.height,
      x: direction === 'right' ? props.x + props.width + 60 : props.x - props.width - 60,
      y: props.y,
    }
  }

  return (
    <>
      <Group
        ref={refShapeForTransform}
        draggable={canDrag}
        onDragEnd={onDragEnd}
        onTransformEnd={callAllHandlers(onTransformEnd, () => {
          setCanVisiblePoint(true)
        })}
        x={props.x}
        y={props.y}
        name={generateShapeName('card', {
          canSelect,
        })}
        onMouseDown={() => {
          setCanVisiblePoint(false)
        }}
        onMouseUp={() => {
          setCanVisiblePoint(true)
        }}
        onTransformStart={() => {
          setCanVisiblePoint(false)
        }}
        {...props}
      >
        <Rect
          shadowBlur={40}
          shadowColor={'black'}
          cornerRadius={8}
          width={props.width}
          height={props.height}
          fill={fill}
        />
      </Group>

      {canCreateNewCard && canVisiblePoint && (
        <Circle
          width={40}
          height={40}
          x={props.x + props.width + 30}
          y={props.y + props.height / 2}
          fill={'blue'}
          onMouseEnter={() => setVisiblePredictCard('right')}
          onMouseLeave={() => {
            setVisiblePredictCard(null)
          }}
          onClick={() => {
            onAddCard?.(getPredictCardCoords('right'))

            setVisiblePredictCard(null)
          }}
        />
      )}

      {canCreateNewCard && canVisiblePoint && (
        <Circle
          width={40}
          height={40}
          x={props.x - 30}
          y={props.y + props.height / 2}
          fill={'blue'}
          onMouseEnter={() => setVisiblePredictCard('left')}
          onMouseLeave={() => {
            setVisiblePredictCard(null)
          }}
          onClick={() => {
            onAddCard?.(getPredictCardCoords('left'))

            setVisiblePredictCard(null)
          }}
        />
      )}

      {visiblePredictCard === 'right' && (
        <Rect
          {...getPredictCardCoords('right')}
          fill={fill}
          shadowBlur={40}
          shadowColor={'black'}
          opacity={0.5}
          shadowOpacity={0.5}
        />
      )}

      {visiblePredictCard === 'left' && (
        <Rect
          {...getPredictCardCoords('left')}
          fill={fill}
          shadowBlur={40}
          shadowColor={'black'}
          opacity={0.5}
          shadowOpacity={0.5}
        />
      )}
    </>
  )
}
