import type Konva from 'konva'
import { type WheelEvent } from 'react'

import { isNumber } from '../../../../is'

export const useZoomController = ({
  onZoom,
}: {
  onZoom?: (args: { scale: number; x: number; y: number }) => void
}) => {
  return {
    onWheel: (e: Konva.KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault()

      const scaleBy = 1.02

      const stage = e.target.getStage() as Konva.Stage | null

      if (!stage) {
        return
      }

      const oldScale = stage.scaleX()

      const pointerX = stage.getPointerPosition()?.x

      const pointerY = stage.getPointerPosition()?.y

      if (!isNumber(pointerY) || !isNumber(pointerX)) {
        return
      }

      const mousePointTo = {
        x: pointerX / oldScale - stage.x() / oldScale,
        y: pointerY / oldScale - stage.y() / oldScale,
      }

      const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy

      onZoom?.({
        scale: newScale,
        x: (pointerX / newScale - mousePointTo.x) * newScale,
        y: (pointerY / newScale - mousePointTo.y) * newScale,
      })
    },
  }
}
