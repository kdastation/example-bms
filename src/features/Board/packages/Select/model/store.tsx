import { useState, type ReactNode } from 'react'
import { immer } from 'zustand/middleware/immer'
import { create, type UseBoundStore } from 'zustand/react'
import { type StoreApi } from 'zustand/vanilla'

import { isArray } from '@shared/is'
import { createContext } from '@shared/react/lib/createContext'

type Store = {
  ids: string[]
  select: (id: string | string[]) => void
}

const createStore = () => {
  return create<Store>(
    immer<Store>((set) => ({
      ids: [],
      select: (ids) => {
        set({
          ids: isArray(ids) ? ids : [ids],
        })
      },
    }))
  )
}

const [StoreContextProvider, useStore] = createContext<UseBoundStore<StoreApi<Store>>>({
  name: 'StoreContextProvider',
  hookName: 'useStore',
  providerName: '<StoreContextProvider />',
})

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => createStore())

  return <StoreContextProvider value={store}>{children}</StoreContextProvider>
}

export { useStore }
