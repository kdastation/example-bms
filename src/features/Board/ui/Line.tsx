import type Konva from 'konva'
import { Line as KonvaLine } from 'react-konva'

import { type Shape } from './types'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

export type LineData = Shape & {
  fill: string
  stroke: string
  points: number[]
  canDrag?: boolean
  canSelect?: boolean
}

type Events = {
  onChange: (args: Shape) => void
}

export const Line = ({
  points,
  fill,
  canDrag = true,
  canSelect = true,
  stroke,
  onChange,
  ...props
}: LineData & Events) => {
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
      fill={fill}
      stroke={stroke}
      strokeWidth={2}
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
