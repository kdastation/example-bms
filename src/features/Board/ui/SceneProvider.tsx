import type Konva from 'konva'
import React, { useMemo, type ReactNode, type RefObject } from 'react'

import { createContext } from '@shared/react/lib/createContext'

export type Scene = {
  stageRef: RefObject<Konva.Stage | null>
}

const [SceneContextProvider, useScene] = createContext<Scene>({
  name: 'SceneContextProvider',
  hookName: 'useDeps',
  providerName: '<SceneContextProvider />',
})

export const SceneProvider = ({ stageRef, children }: Scene & { children: ReactNode }) => {
  const values = useMemo((): Scene => {
    return {
      stageRef,
    }
  }, [])

  return <SceneContextProvider value={values}>{children}</SceneContextProvider>
}

export { useScene }
