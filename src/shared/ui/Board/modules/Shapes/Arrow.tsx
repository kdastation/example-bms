import type Konva from 'konva'
import { Arrow as KonvaArrow } from 'react-konva'

import { type ArrowData, type ShapeAttrs } from '../../model/types/Shape'
import { generateShapeName } from '../../packages/utils/utils'
import { useDragShape, useTransformShape } from './lib/controls'

type Events = {
  onChange: (args: ShapeAttrs) => void
}

type Props = ArrowData & Events

export const Arrow = ({
  points,
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
