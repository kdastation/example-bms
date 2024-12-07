import { type StateController } from '../../Contollers/useController'
import { type Shape, type ShapeAttrs } from '../../Shape'

export type EventChangeAttrs = {
  type: 'change-attrs'
  attrs: ShapeAttrs
}

export type EventStartChangeText = {
  type: 'start-change-text'
  id: string
}

export type EventEndChangeText = {
  type: 'end-change-text'
  id: string
  newText: string
}

type EventSelect = {
  type: 'select'
  ids: string[]
}

type EventChangeTool = {
  type: 'change-tool'
  tool: StateController
}

type EventAddShape = {
  type: 'add-shape'
  shape: Shape
}

export type EventPublic =
  | EventChangeAttrs
  | EventStartChangeText
  | EventEndChangeText
  | EventSelect
  | EventChangeTool
  | EventAddShape
