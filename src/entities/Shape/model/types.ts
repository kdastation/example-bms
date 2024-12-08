export type BaseShape = {
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
  canDrag?: boolean
  canSelect?: boolean
}

export type ArrowShape = BaseShape & {
  stroke: string
  points: number[]
  type: 'arrow'
}

export type CardShape = BaseShape & {
  fill: string
  canCreateNewCard?: boolean
  type: 'card'
}

export type CircleShape = BaseShape & {
  fill: string
  type: 'circle'
}

export type ImageShape = BaseShape & {
  src: string
  type: 'image'
}

export type LineShape = BaseShape & {
  stroke: string
  points: number[]
  type: 'line'
}

export type RectangleShape = BaseShape & {
  fill: string
  type: 'rectangle'
}

export type TextShape = BaseShape & {
  text: string
  color: string
  fontSize?: number
  type: 'text'
}

export type Shape =
  | ArrowShape
  | CardShape
  | CircleShape
  | ImageShape
  | LineShape
  | RectangleShape
  | TextShape
