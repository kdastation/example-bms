import type Konva from 'konva'
import { Circle as KonvaCircle } from 'react-konva'

import { type CircleData, type ShapeAttrs } from '../../model/types/Shape'
import { generateShapeName } from '../../packages/utils/utils'
import { useDragShape, useTransformShape } from './lib/controls'

type Events = {
  onChange: (args: ShapeAttrs) => void
}

type Props = CircleData & Events

export const Circle = ({ onChange, canSelect = true, canDrag = true, fill, ...props }: Props) => {
  const { ref: refShapeForTransform, onTransformEnd } = useTransformShape<Konva.Circle>({
    onChange: (sizes) => {
      onChange?.({
        ...props,
        ...sizes,
      })
    },
  })

  const { onDragEnd } = useDragShape({
    onChange: (coords) => {
      onChange?.({
        ...props,
        ...coords,
      })
    },
  })

  return (
    <KonvaCircle
      ref={refShapeForTransform}
      {...props}
      fill={fill}
      name={generateShapeName('circle', {
        canSelect,
      })}
      draggable={canDrag}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  )
}
