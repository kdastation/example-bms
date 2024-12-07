import type Konva from 'konva'
import React from 'react'
import { Rect } from 'react-konva'

import { type ShapeAttrs } from './Shape'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

type Events = {
  onChange: (args: ShapeAttrs) => void
}

type Props = ShapeAttrs & Events

export const Rectangle = ({
  onChange,
  canSelect = true,
  canDrag = true,
  fill,
  ...props
}: Props) => {
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
      cornerRadius={8}
      draggable={canDrag}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  )
}
