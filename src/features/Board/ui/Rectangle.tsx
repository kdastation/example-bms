import type Konva from 'konva'
import React, { useRef } from 'react'
import { Rect } from 'react-konva'

import { generateShapeName } from './utils'

export type RectangleData = {
  x: number
  y: number
  width: number
  height: number
  id: string
  fill: string
  canDrag?: boolean
  canSelect?: boolean
}

export const Rectangle = ({
  onChange,
  canSelect = true,
  canDrag = true,
  ...props
}: RectangleData & {
  onChange: (args: RectangleData) => void
}) => {
  const ref = useRef<Konva.Rect | null>(null)

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

    node.scaleX(1)
    node.scaleY(1)
    onChange({
      ...props,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
    })
  }

  return (
    <Rect
      ref={ref}
      {...props}
      name={generateShapeName('rectangle', {
        canSelect,
      })}
      draggable={canDrag}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    />
  )
}
