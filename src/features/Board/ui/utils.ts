import type Konva from 'konva'

import { isTruthy } from '@shared/is'

export const generateShapeName = (
  name: string,
  {
    canSelect,
  }: {
    canSelect?: boolean
  }
) => {
  const names = [name, canSelect && 'selectable'].filter(isTruthy)

  return names.join(' ')
}

export const getShapesCanBeSelect = (stage: Konva.Stage) => {
  return stage.find((node) => {
    return node.hasName('selectable')
  })
}
