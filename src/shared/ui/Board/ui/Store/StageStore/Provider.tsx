import React, { useState, type ReactNode } from 'react'
import { type UseBoundStore } from 'zustand/react'
import { type StoreApi } from 'zustand/vanilla'

import { createContext } from '../../../../../react/lib/createContext'
import { createStore, type Store } from './store'

const [StageStoreContextProvider, useStageStore] = createContext<UseBoundStore<StoreApi<Store>>>({
  name: 'StageStoreContextProvider',
  hookName: 'useStageStore',
  providerName: '<StageStoreContextProvider />',
})

export const StageStoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => createStore())

  return <StageStoreContextProvider value={store}>{children}</StageStoreContextProvider>
}

export { useStageStore }
