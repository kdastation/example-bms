import type Konva from 'konva'
import { Arrow as KonvaArrow } from 'react-konva'

import { type Shape } from './types'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

export type ArrowData = Shape & {
  stroke: string
  points: number[]
  canDrag?: boolean
  canSelect?: boolean
}

type Events = {
  onChange: (args: Shape) => void
}

export const Arrow = ({
  points,
  fill,
  canDrag = true,
  canSelect = true,
  stroke,
  onChange,
  ...props
}: ArrowData & Events) => {
  const { onDragEnd } = useDragShape({
    onChange: (coords) => {
      onChange?.({
        ...props,
        ...coords,
      })
    },
  })

  const { ref: refShapeForTransform, onTransformEnd } = useTransformShape<Konva.Arrow>({
    onChange: (sizes) => {
      onChange?.({
        ...props,
        ...sizes,
      })
    },
    formatScale: false,
  })

  return (
    <KonvaArrow
      ref={refShapeForTransform}
      points={points}
      fill={fill}
      stroke={stroke}
      strokeWidth={8}
      name={generateShapeName('arrow', {
        canSelect,
      })}
      onDragEnd={onDragEnd}
      draggable={canDrag}
      onTransformEnd={onTransformEnd}
      {...props}
    />
  )
}
