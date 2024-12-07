import type Konva from 'konva'
import { type MouseEvent } from 'react'

import { type Controller } from '../types'

export type TargetControllerArgs = {
  onTarget?: (args: { x: number; y: number }) => void
}

export const useTargetController = ({ onTarget }: TargetControllerArgs): Controller => {
  return {
    stageProps: {
      onMouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => {
        onTarget?.({
          x: e.target.getRelativePointerPosition()?.x as number,
          y: e.target.getRelativePointerPosition()?.y as number,
        })
      },
    },
  }
}
