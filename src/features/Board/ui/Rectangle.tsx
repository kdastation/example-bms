import type Konva from 'konva'
import React from 'react'
import { Rect } from 'react-konva'

import { type Shape } from './types'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

export type RectangleData = Shape & {
  fill: string
  canDrag?: boolean
  canSelect?: boolean
}

export const Rectangle = ({
  onChange,
  canSelect = true,
  canDrag = true,
  fill,
  ...props
}: RectangleData & {
  onChange: (args: Shape) => void
}) => {
  const { ref: refShapeForTransform, onTransformEnd } = useTransformShape<Konva.Rect>({
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
    <Rect
      ref={refShapeForTransform}
      {...props}
      fill={fill}
      name={generateShapeName('rectangle', {
        canSelect,
      })}
      draggable={canDrag}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  )
}
