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
}: {
  onChange: (args: { x: number; y: number; width: number; height: number }) => void
}) => {
  const ref = useRef<T | null>(null)

  const onTransformEnd = () => {
    const node = ref.current

    if (!node) {
      return
    }

    const scaleX = node.scaleX()
    const scaleY = node.scaleY()

    node.scaleX(1)
    node.scaleY(1)

    onChange({
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
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
