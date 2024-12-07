import type Konva from 'konva'
import { type MutableRefObject, type ReactNode } from 'react'
import { type StageProps } from 'react-konva'

export type Shape = {
  x: number
  y: number
  width: number
  height: number
  id: string
  rotation: number
  scale: {
    x: number
    y: number
  }
}

export type Controller = {
  stageProps: Partial<StageProps>
  ref?: MutableRefObject<Konva.Stage | null>
  elements?: ReactNode
}
