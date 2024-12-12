import merge from 'lodash/merge'
import { v4 as uuidv4 } from 'uuid'

import {
  type ArrowShape,
  type CardShape,
  type LineShape,
  type RectangleShape,
} from '../../model/types/Shape'
import { distanceTwoPoints } from '../utils'

export const createLine = (
  args: Omit<LineShape, 'type' | 'height' | 'width' | 'x' | 'y' | 'scale' | 'id' | 'rotation'>
): LineShape => {
  const { points, ...other } = args

  const id = uuidv4().toString()

  return merge(
    {
      x: 0,
      y: 0,
      type: 'line',
      height: 400,
      width: 400,
      id,
      points,
      scale: {
        x: 1,
        y: 1,
      },
      rotation: 0,
      stroke: 'red',
    },
    other
  )
}

export const createRectangle = (args: Omit<RectangleShape, 'type' | 'id'>): RectangleShape => {
  const id = uuidv4().toString()

  return merge(
    {
      id,
      type: 'rectangle',
    },
    args
  )
}

export const createArrow = (
  args: Omit<ArrowShape, 'type' | 'height' | 'width' | 'x' | 'y' | 'scale' | 'id' | 'rotation'>
): ArrowShape => {
  const id = uuidv4().toString()

  const { points, ...other } = args

  return merge(
    {
      id: id,
      type: 'arrow',
      x: 0,
      y: 0,
      rotation: 0,
      points,
      width: distanceTwoPoints({
        x1: points[0],
        y1: points[1],
        x2: points[3],
        y2: points[4],
      }),
      height: distanceTwoPoints({
        x1: points[0],
        y1: points[1],
        x2: points[3],
        y2: points[4],
      }),
      scale: {
        x: 1,
        y: 1,
      },
      stroke: 'red',
    },
    other
  )
}

export const createCard = (args: CardShape): CardShape => {
  return args
}
