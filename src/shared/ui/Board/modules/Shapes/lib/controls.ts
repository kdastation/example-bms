import type Konva from 'konva'
import { useRef } from 'react'

import Vector2d = Konva.Vector2d
export const useTransformShape = <T extends Konva.Shape>({
  onChange,
  formatScale = true,
}: {
  onChange: (args: {
    x: number
    y: number
    width: number
    height: number
    rotation: number
    scale: {
      x: number
      y: number
    }
  }) => void
  formatScale?: boolean
}) => {
  const ref = useRef<T | null>(null)

  const onTransformEnd = () => {
    const node = ref.current

    if (!node) {
      return
    }

    const scaleX = node.scaleX()
    const scaleY = node.scaleY()

    if (formatScale) {
      node.scaleX(1)
      node.scaleY(1)
    }

    onChange({
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
      rotation: node.rotation(),
      scale: node.scale() as Vector2d,
    })
  }

  return {
    ref,
    onTransformEnd,
  }
}

export const useDragShape = ({
  onChange,
}: {
  onChange: (args: { x: number; y: number }) => void
}) => {
  return {
    onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
      onChange({
        x: e.target.x(),
        y: e.target.y(),
      })
    },
  }
}
