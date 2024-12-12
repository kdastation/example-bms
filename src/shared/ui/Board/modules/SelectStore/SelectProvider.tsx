import { useMemo, type ReactNode } from 'react'

import { createContext } from '../../../../react/lib/createContext'

export type State = {
  selectedShapes: string[]
}

const [SelectedShapesContextProvider, useSelectedShapes] = createContext<State>({
  name: 'SelectedShapesContextProvider',
  hookName: 'useSelectedShapes',
  providerName: '<SelectedShapesContextProvider />',
})

export const SelectedShapesProvider = ({
  selectedShapes,
  children,
}: State & { children: ReactNode }) => {
  const values = useMemo((): State => {
    return {
      selectedShapes,
    }
  }, [selectedShapes])

  return <SelectedShapesContextProvider value={values}>{children}</SelectedShapesContextProvider>
}

export { useSelectedShapes }
