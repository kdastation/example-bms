import {
  type ArrowShape,
  type CardShape,
  type CircleShape,
  type ImageShape,
  type LineShape,
  type RectangleShape,
  type TextShape,
} from 'shared/ui/Board/model/types/Shape'

export type DragDropRectangleShape = Omit<RectangleShape, 'x' | 'y' | 'id'>

export type DragDropCircleShape = Omit<CircleShape, 'x' | 'y' | 'id'>

export type DragDropArrowShape = Omit<ArrowShape, 'x' | 'y' | 'id'>

export type DragDropCardShape = Omit<CardShape, 'x' | 'y' | 'id'>

export type DragDropLineShape = Omit<LineShape, 'x' | 'y' | 'id'>

export type DragDropTextShape = Omit<TextShape, 'x' | 'y' | 'id'>

export type DragDropImageShape = Omit<ImageShape, 'x' | 'y' | 'id'>

export type DragDropShape =
  | DragDropRectangleShape
  | DragDropCircleShape
  | DragDropArrowShape
  | DragDropCardShape
  | DragDropLineShape
  | DragDropTextShape
  | DragDropImageShape
