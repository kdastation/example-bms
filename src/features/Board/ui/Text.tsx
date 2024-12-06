import type Konva from 'konva'
import { Text as KonvaText } from 'react-konva'

import { type Shape } from './types'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

export type TextData = Shape & {
  text: string
  color: string
  canDrag?: boolean
  canSelect?: boolean
}

type Events = {
  onChange: (args: Shape) => void
}

type Props = TextData & Events

export const Text = ({
  text,
  color,
  canDrag = true,
  canSelect = true,
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

  const { ref: refShapeForTransform, onTransformEnd } = useTransformShape<Konva.Text>({
    onChange: (sizes) => {
      onChange?.({
        ...props,
        ...sizes,
      })
    },
  })

  return (
    <KonvaText
      {...props}
      text={text}
      color={color}
      name={generateShapeName('text', {
        canSelect,
      })}
      draggable={canDrag}
      ref={refShapeForTransform}
      onTransformEnd={onTransformEnd}
      onDragEnd={onDragEnd}
    />
  )
}
