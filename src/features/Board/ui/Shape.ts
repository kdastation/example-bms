export type ShapeAttrs = {
  id: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scale: {
    x: number
    y: number
  }
}

export type ShapeData = ShapeAttrs & {
  canDrag?: boolean
  canSelect?: boolean
}

export type ArrowData = ShapeData & {
  stroke: string
  points: number[]
}

export type CardData = ShapeData & {
  fill: string
  canCreateNewCard?: boolean
}

export type CircleData = ShapeData & {
  fill: string
}

export type ImageData = ShapeData & {
  src: string
}

export type LineData = ShapeData & {
  stroke: string
  points: number[]
}

export type RectangleData = ShapeData & {
  fill: string
}

export type TextData = ShapeData & {
  text: string
  color: string
  fontSize?: number
}

export type RectangleShape = RectangleData & {
  type: 'rectangle'
}

export type ImageShape = ImageData & {
  type: 'image'
}

export type CircleShape = CircleData & {
  type: 'circle'
}

export type TextShape = TextData & {
  type: 'text'
}

export type LineShape = LineData & {
  type: 'line'
}

export type CardShape = CardData & {
  type: 'card'
}

export type ArrowShape = ArrowData & {
  type: 'arrow'
}

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

export type Shape =
  | RectangleShape
  | ImageShape
  | CircleShape
  | TextShape
  | LineShape
  | CardShape
  | ArrowShape
