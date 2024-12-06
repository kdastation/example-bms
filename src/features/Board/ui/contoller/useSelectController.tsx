import Konva from 'konva'
import React, { useRef, useState } from 'react'
import { Rect } from 'react-konva'

import { getShapesCanBeSelect } from '../utils'

export const useSelectController = ({
  onSelect,
  selected,
}: {
  onSelect: (shapes: string[]) => void
  selected: string[]
}) => {
  const rectRef = useRef<Konva.Rect | null>(null)
  const stageRef = useRef<Konva.Stage | null>(null)

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

  const onTouchStart = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage()

    if (clickedOnEmpty) {
      onSelect?.([])
    }
  }

  const onMouseDown = (e) => {
    const isElement = e.target.findAncestor('.elements-container')

    const isTransformer = e.target.findAncestor('Transformer')

    if (isElement || isTransformer) {
      return
    }

    const pos = e.target.getStage().getPointerPosition()

    selection.current.visible = true
    selection.current.x1 = pos.x
    selection.current.y1 = pos.y
    selection.current.x2 = pos.x
    selection.current.y2 = pos.y

    updateSelectionRect()
  }

  const onMouseMove = (e) => {
    if (!selection.current.visible) {
      return
    }

    const pos = e.target.getStage().getPointerPosition()

    selection.current.x2 = pos.x
    selection.current.y2 = pos.y

    updateSelectionRect()
  }

  const onMouseUp = () => {
    selection.current.visible = false

    const stage = stageRef.current

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

  const onClick = (e) => {
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

    //TODO: рефакторинг
    if (!e.target.hasName('selectable')) {
      return
    }

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey

    const isSelected = selected.length > 0

    if (!isSelected) {
      onSelect([e.target.id()])
      return
    }

    if (!metaPressed && isSelected) {
      onSelect([e.target.id()])
      return
    }

    if (metaPressed && isSelected) {
      onSelect?.([...selected, e.target.id()])
    }
  }

  return {
    stageRef,
    onClick,
    onTouchStart,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    elements: <>{rect && <Rect ref={rectRef} fill='rgba(0,0,255,0.5)' {...rect} />}</>,
  }
}
