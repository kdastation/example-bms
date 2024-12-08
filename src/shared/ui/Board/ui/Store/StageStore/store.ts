import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand/react'

type Stage = { x: number; y: number; scale: number }

export type Store = {
  x: number
  y: number
  scale: number
  setStage: (stage: Stage) => void
}

export const createStore = () => {
  return create<Store>(
    immer<Store>((set) => ({
      x: 0,
      y: 0,
      scale: 1,
      setStage: (stage) => {
        set(stage)
      },
    }))
  )
}
