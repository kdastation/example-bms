import type Konva from 'konva'
import { useRef } from 'react'

import { isTruthy } from '../../../is'
import { useScene } from './Scene/SceneProvider'

import Vector2d = Konva.Vector2d

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
}): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export const useZoomOnShape = () => {
  const { stageRef } = useScene()

  return (id: string) => {
    const stage = stageRef.current

    if (!stage) {
      return
    }

    const shape = stage.findOne(`#${id}`)

    if (!shape) {
      console.error('Not found shape')
      return
    }

    const box = shape.getClientRect()

    stage.to({
      x: -shape.getPosition().x + stage.width() / 2 - box.width / 2,
      y: -shape.getPosition().y + stage.height() / 2 - box.height / 2,
      scaleX: 1,
      scaleY: 1,
    })
  }
}
