import type Konva from 'konva'
import { useMemo, type ReactNode, type RefObject } from 'react'

import { createContext } from '../../../../react/lib/createContext'

export type Scene = {
  stageRef: RefObject<Konva.Stage>
}

const [SceneContextProvider, useScene] = createContext<Scene>({
  name: 'SceneContextProvider',
  hookName: 'useScene',
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
