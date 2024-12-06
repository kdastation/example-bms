import type Konva from 'konva'
import { Image as ReactKonvaImage } from 'react-konva'
import useImage from 'use-image'

import { type Shape } from './types'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

export type ImageData = Shape & {
  src: string
  canSelect?: boolean
  canDrag?: boolean
}

type Events = {
  onChange: (args: Shape) => void
}

export const Image = ({
  src,
  canSelect = true,
  canDrag = true,
  onChange,
  ...props
}: ImageData & Events) => {
  const [img] = useImage(src)

  const { onDragEnd } = useDragShape({
    onChange: (coords) => {
      onChange?.({
        ...props,
        ...coords,
      })
    },
  })

  const { ref: refShapeForTransform, onTransformEnd } = useTransformShape<Konva.Image>({
    onChange: (sizes) => {
      onChange?.({
        ...props,
        ...sizes,
      })
    },
  })

  return (
    <ReactKonvaImage
      image={img}
      {...props}
      name={generateShapeName('image', {
        canSelect,
      })}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
      draggable={canDrag}
      ref={refShapeForTransform}
    />
  )
}
