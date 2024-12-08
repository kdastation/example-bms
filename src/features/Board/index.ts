import { DragDrop } from './ui/DragDrop/DragDrop'
import { Root, RootBoard } from './ui/Root'

export { type Shape } from './ui/Shape'

export { type StateController as Tool } from './ui/Contollers/useController'

export const Board = {
  Root,
  Board: RootBoard,
  DragDropElement: DragDrop.Element,
}
