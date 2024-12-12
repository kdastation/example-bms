import { DragDrop } from './modules/DragDrop'
import { useZoomOnShape } from './modules/ZoomOnShape'
import { Root, RootBoard } from './Root'

export { type Shape } from './model/types/Shape'

export { type StateController as Tool } from './modules/Contollers/useController'

export const Board = {
  Root,
  Board: RootBoard,
  DragDropElement: DragDrop.Element,
}

export const utils = {
  useZoomOnShape,
}
