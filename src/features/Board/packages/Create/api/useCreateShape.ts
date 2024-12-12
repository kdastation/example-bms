import { useStoreShapes, type Shape } from '@entities/Shape'

type Args = Shape
export const useCreateShape = () => {
  const storeShapes = useStoreShapes()

  return (shape: Args) => {
    storeShapes.add(shape)
  }
}
