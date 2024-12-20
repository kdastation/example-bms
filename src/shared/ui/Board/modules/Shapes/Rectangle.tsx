import type Konva from 'konva'
import { Rect } from 'react-konva'

import { type RectangleData, type ShapeAttrs } from '../../model/types/Shape'
import { generateShapeName } from '../../packages/utils/utils'
import { useDragShape, useTransformShape } from './lib/controls'

type Events = {
  onChange: (args: ShapeAttrs) => void
}

type Props = RectangleData & Events

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
