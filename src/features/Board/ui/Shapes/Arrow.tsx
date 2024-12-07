import type Konva from 'konva'
import { Arrow as KonvaArrow } from 'react-konva'

import { type ArrowData, type ShapeAttrs } from '../Shape'
import { generateShapeName, useDragShape, useTransformShape } from '../utils'

type Events = {
  onChange: (args: ShapeAttrs) => void
}

type Props = ArrowData & Events

export const Arrow = ({
  points,
  fill,
  canDrag = true,
  canSelect = true,
  stroke,
  onChange,
  ...props
}: Props) => {
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
