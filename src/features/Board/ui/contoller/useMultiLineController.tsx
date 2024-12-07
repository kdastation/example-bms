import type Konva from 'konva'
import { useState, type MouseEvent } from 'react'
import { Arrow, Line } from 'react-konva'

import { isNull } from '@shared/is'

import { type Controller } from '../types'

type Points = number[]

export type MultiLineControllerArgs = {
  onAdd?: (points: Points) => void
}

export const useMiltyLineController = ({ onAdd }: MultiLineControllerArgs): Controller => {
  const [points, setPoints] = useState<Points | null>(null)

  const [pointsMove, setPointsMove] = useState<Points | null>(null)

  return {
    stageProps: {
      onMouseDown(e: Konva.KonvaEventObject<MouseEvent>) {
        const stage = e.target.getStage() as Konva.Stage | null

        if (!stage) {
          return
        }

        const cursorPosition = stage.getRelativePointerPosition()

        if (!cursorPosition) {
          return
        }

        setPoints((prev) => {
          if (isNull(prev)) {
            return [cursorPosition.x, cursorPosition.y]
          }

          return [...prev, cursorPosition.x, cursorPosition.y]
        })

        if (!isNull(pointsMove) && pointsMove?.length > 8) {
          onAdd?.(pointsMove)

          setPoints(null)
          setPointsMove(null)
        }
      },
      onMouseMove(e: Konva.KonvaEventObject<MouseEvent>) {
        const stage = e.target.getStage() as Konva.Stage | null

        if (!stage) {
          return
        }

        const cursorPosition = stage.getRelativePointerPosition()

        if (isNull(points) || points.length < 2) {
          return
        }

        if (!cursorPosition) {
          return
        }

        setPointsMove([...points, cursorPosition.x, cursorPosition.y])
      },
    },
    elements: (
      <>
        {!isNull(pointsMove) && (
          <Line strokeWidth={8} points={pointsMove} fill={'red'} stroke={'red'} />
        )}
      </>
    ),
  }
}
