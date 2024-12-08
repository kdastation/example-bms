import { useStoreShapes } from '@entities/Shape'

export const useDelete = () => {
  const storeShapes = useStoreShapes()

  return (ids: string[]) => {
    ids.forEach((id) => {
      storeShapes.delete(id)
    })
  }
}
