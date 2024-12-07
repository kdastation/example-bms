import Konva from 'konva'
import React, { useRef, useState, type MouseEvent } from 'react'
import { Rect } from 'react-konva'

import { distanceTwoPoints, getShapesCanBeSelect } from '../utils'
import { type Controller } from './Controller'

export type SelectControllerArgs = {
  onSelect: (shapes: string[]) => void
  selected: string[]
}

export const useSelectController = ({
  onSelect,
  selected,
  enabled = true,
}: SelectControllerArgs & {
  enabled?: boolean
}): Controller => {
  const rectRef = useRef<Konva.Rect | null>(null)

  const [rect, setRect] = useState<{
    x: number
    y: number
    width: number
    height: number
    visible: boolean
  }>(null)

  const selection = useRef({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  })

  const updateSelectionRect = () => {
    setRect({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
    })
  }

  const onTouchStart = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!enabled) {
      return
    }

    const clickedOnEmpty = e.target === e.target.getStage()

    if (clickedOnEmpty) {
      onSelect?.([])
    }
  }

  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!enabled) {
      return
    }

    const isElement = e.target.findAncestor('.elements-container')

    const isTransformer = e.target.findAncestor('Transformer')

    if (isElement || isTransformer) {
      return
    }

    const stage = e.target.getStage() as Konva.Stage

    const pos = stage.getRelativePointerPosition()

    if (!pos) {
      return
    }

    selection.current.visible = true
    selection.current.x1 = pos.x
    selection.current.y1 = pos.y
    selection.current.x2 = pos.x
    selection.current.y2 = pos.y

    updateSelectionRect()
  }

  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!enabled) {
      return
    }

    if (!selection.current.visible) {
      return
    }

    const stage = e.target.getStage() as Konva.Stage

    const pos = stage.getRelativePointerPosition()

    if (!pos) {
      return
    }

    if (
      distanceTwoPoints({
        x1: selection.current.x1,
        y2: selection.current.y1,
        x2: pos.x,
        y1: pos.y,
      }) < 150
    ) {
      return
    }

    selection.current.x2 = pos.x
    selection.current.y2 = pos.y

    updateSelectionRect()
  }

  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!enabled) {
      return
    }

    selection.current.visible = false

    const stage = e.target.getStage() as Konva.Stage | null

    const { x1, x2, y1, y2 } = selection.current

    const moved = x1 !== x2 || y1 !== y2

    if (!moved) {
      updateSelectionRect()
      return
    }

    const selBox = rectRef.current?.getClientRect()

    if (!selBox || !stage) {
      return
    }

    const selectableShapes = getShapesCanBeSelect(stage)

    const shapesInRect = selectableShapes.filter((elementNode) => {
      const elementBox = elementNode.getClientRect()

      return Konva.Util.haveIntersection(selBox, elementBox)
    })

    onSelect?.(shapesInRect.map((el) => el.id()))

    updateSelectionRect()
  }

  const onClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!enabled) {
      return
    }

    const { x1, x2, y1, y2 } = selection.current

    const moved = x1 !== x2 || y1 !== y2

    if (moved) {
      return
    }

    const stage = e.target.getStage()

    if (e.target === stage) {
      onSelect?.([])
      return
    }

    //TODO: refactor
    const canSelectTarget = e.target.hasName('selectable')

    const canSelectParent = e.target.parent?.hasName('selectable')

    if (!canSelectParent && !canSelectTarget) {
      return
    }

    const idShape = canSelectParent ? e.target.parent?.id?.() : e.target.id?.()

    if (!idShape) {
      return
    }

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey

    const isSelected = selected.length > 0

    if (!isSelected) {
      onSelect([idShape])
      return
    }

    if (!metaPressed && isSelected) {
      onSelect([idShape])
      return
    }

    if (metaPressed && isSelected) {
      onSelect?.([...selected, idShape])
    }
  }

  return {
    stageProps: { onClick, onTouchStart, onMouseDown, onMouseMove, onMouseUp },
    elements: <>{rect && <Rect ref={rectRef} fill='rgba(0,0,255,0.5)' {...rect} />}</>,
  }
}
