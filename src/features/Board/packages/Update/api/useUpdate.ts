import { useStoreShapes, type Shape } from '@entities/Shape'

export const useUpdate = () => {
  const storeShapes = useStoreShapes()

  return (id: string, shape: DeepPartial<Shape>) => {
    storeShapes.update(id, shape)
  }
}
