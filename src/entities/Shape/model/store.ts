import merge from 'lodash/merge'
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand/react'

import { type Shape } from './types'

export type Store = {
  shapes: Shape[]
  add: (shape: Shape) => void
  delete: (id: string) => void
  update: (id, shape: DeepPartial<Shape>) => void
}

export const useStore = create<Store>(
  immer<Store>((set) => ({
    shapes: [],
    add: (shape) => {
      set((state) => {
        state.shapes.push(shape)
      })
    },
    delete: (id) => {
      set((state) => {
        state.shapes = state.shapes.filter((shape) => {
          return shape.id !== id
        })
      })
    },
    update: (id, updatedShape) => {
      set((state) => {
        state.shapes = state.shapes.map((shape) => {
          if (shape.id === id) {
            return merge(shape, updatedShape)
          }

          return shape
        })
      })
    },
  }))
)
