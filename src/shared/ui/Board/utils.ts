import { useScene } from './packages/Scene/SceneProvider'

export const useZoomOnShape = () => {
  const { stageRef } = useScene()

  return (id: string) => {
    const stage = stageRef.current

    if (!stage) {
      return
    }

    const shape = stage.findOne(`#${id}`)

    if (!shape) {
      console.error('Not found shape')
      return
    }

    const box = shape.getClientRect()

    stage.to({
      x: -shape.getPosition().x + stage.width() / 2 - box.width / 2,
      y: -shape.getPosition().y + stage.height() / 2 - box.height / 2,
      scaleX: 1,
      scaleY: 1,
    })
  }
}
