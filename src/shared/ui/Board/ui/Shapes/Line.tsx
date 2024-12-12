import type Konva from 'konva'
import { Line as KonvaLine } from 'react-konva'

import { type LineData, type ShapeAttrs } from '../../model/types/Shape'
import { generateShapeName, useDragShape, useTransformShape } from '../utils'

type Events = {
  onChange: (args: ShapeAttrs) => void
}

type Props = LineData & Events

export const Line = ({
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

  const { ref: refShapeForTransform, onTransformEnd } = useTransformShape<Konva.Line>({
    onChange: (sizes) => {
      onChange?.({
        ...props,
        ...sizes,
      })
    },
    formatScale: false,
  })

  return (
    <KonvaLine
      ref={refShapeForTransform}
      points={points}
      stroke={stroke}
      strokeWidth={8}
      name={generateShapeName('line', {
        canSelect,
      })}
      onDragEnd={onDragEnd}
      draggable={canDrag}
      onTransformEnd={onTransformEnd}
      {...props}
    />
  )
}
