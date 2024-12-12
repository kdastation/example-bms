import type Konva from 'konva'
import { v4 as uuidv4 } from 'uuid/dist/esm'

import { isTruthy } from '../../../../is'

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

export const distanceTwoPoints = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
}): number => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export const generateId = () => {
  return uuidv4().toString()
}
