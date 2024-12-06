import type Konva from 'konva'
import React from 'react'
import { Circle as KonvaCircle } from 'react-konva'

import { type Shape } from './types'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

export type CircleData = Shape & {
  fill: string
  canDrag?: boolean
  canSelect?: boolean
}

export const Circle = ({
  onChange,
  canSelect = true,
  canDrag = true,
  fill,
  ...props
}: CircleData & {
  onChange: (args: Shape) => void
}) => {
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
