import type Konva from 'konva'
import { Image as ReactKonvaImage } from 'react-konva'
import useImage from 'use-image'

import { type ImageData, type ShapeAttrs } from '../../model/types/Shape'
import { generateShapeName } from '../../packages/utils/utils'
import { useDragShape, useTransformShape } from './lib/controls'

type Events = {
  onChange: (args: ShapeAttrs) => void
}

type Props = ImageData & Events

export const Image = ({ src, canSelect = true, canDrag = true, onChange, ...props }: Props) => {
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
