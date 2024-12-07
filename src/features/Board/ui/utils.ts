import type Konva from 'konva'
import { useRef } from 'react'

import { isTruthy } from '@shared/is'

export const generateShapeName = (
  name: string,
  {
    canSelect,
  }: {
    canSelect?: boolean
  }
) => {
  const names = [name, canSelect && 'selectable'].filter(isTruthy)

  return names.join(' ')
}

export const getShapesCanBeSelect = (stage: Konva.Stage) => {
  return stage.find((node) => {
    return node.hasName('selectable')
  })
}

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

export const distanceTwoPoints = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
}) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
