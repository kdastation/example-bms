import React, { useState, type ReactNode } from 'react'
import { type UseBoundStore } from 'zustand/react'
import { type StoreApi } from 'zustand/vanilla'

import { createContext } from '@shared/react/lib/createContext'

import { createStore, type Store } from './StageStore'

const [StageContextProvider, useStage] = createContext<UseBoundStore<StoreApi<Store>>>({
  name: 'StageContextProvider',
  hookName: 'useStage',
  providerName: '<StageContextProvider />',
})

export const StageProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => createStore())

  return <StageContextProvider value={store}>{children}</StageContextProvider>
}

export { useStage }
