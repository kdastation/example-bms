import type Konva from 'konva'
import { useRef } from 'react'
import { Image as ReactKonvaImage } from 'react-konva'
import useImage from 'use-image'

import { generateShapeName } from './utils'

type Shape = {
  x: number
  y: number
  width: number
  height: number
  id: string
}

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
  const ref = useRef<Konva.Image | null>(null)

  const [img] = useImage(src)

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onChange({
      ...props,
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  const handleTransformEnd = () => {
    const node = ref.current

    if (!node) {
      return
    }

    const scaleX = node.scaleX()
    const scaleY = node.scaleY()

    onChange({
      ...props,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
    })
  }

  return (
    <ReactKonvaImage
      image={img}
      {...props}
      name={generateShapeName('image', {
        canSelect,
      })}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      draggable={canDrag}
    />
  )
}
