import { type ReactNode } from 'react'
import { type StageProps } from 'react-konva'

export type Controller = {
  stageProps: Partial<StageProps>
  elements?: ReactNode
}
