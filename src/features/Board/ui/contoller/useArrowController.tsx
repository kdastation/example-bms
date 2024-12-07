import type Konva from 'konva'
import { useState, type MouseEvent } from 'react'
import { Arrow } from 'react-konva'

import { isNull } from '@shared/is'

import { type Controller } from './Controller'

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

type Points = {
  start: {
    x: number
    y: number
  }
  end?: {
    x: number
    y: number
  }
}

export type ArrowControllerArgs = {
  onAdd?: (points: RequireKeys<Points, 'end' | 'start'>) => void
}

export const useArrowController = ({ onAdd }: ArrowControllerArgs): Controller => {
  const [points, setPoints] = useState<Points | null>(null)

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

        setPoints({
          start: {
            x: cursorPosition.x,
            y: cursorPosition.y,
          },
        })
      },
      onMouseMove(e: Konva.KonvaEventObject<MouseEvent>) {
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
            return null
          }

          return {
            ...prev,
            end: {
              x: cursorPosition.x,
              y: cursorPosition.y,
            },
          }
        })
      },
      onMouseUp() {
        if (!isNull(points) && points.start && points.end) {
          onAdd?.({
            start: points.start,
            end: points.end,
          })
        }

        setPoints(null)
      },
    },
    elements: (
      <>
        {points && points.start && points.end && (
          <Arrow
            points={[points.start.x, points.start.y, points.end.x, points.end.y]}
            fill={'red'}
            stroke={'red'}
            strokeWidth={8}
          />
        )}
      </>
    ),
  }
}
