import { useStore } from './store'

export const useGetSelectedIds = () => {
  const store = useStore()

  return store((state) => state.ids)
}

export const useSelect = () => {
  const store = useStore()

  return store((state) => state.select)
}

export const useGetCountSelected = () => {
  const selectedIds = useGetSelectedIds()

  return selectedIds.length
}
