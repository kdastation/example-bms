import type Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Transformer } from 'react-konva'

import { isTruthy } from '../../../../is'
import { useScene } from '../../packages/Scene/SceneProvider'

export const Transform = ({ ids }: { ids: string[] }) => {
  const { stageRef } = useScene()

  const transformRef = useRef<Konva.Transformer | null>(null)

  useEffect(() => {
    const stage = stageRef.current

    const transformer = transformRef.current

    if (!stage || !transformer) {
      return
    }

    const nodes = ids.map((id) => stage.findOne(`#${id}`)).filter(isTruthy)

    transformer.nodes(nodes)
  }, [ids])

  return (
    <Transformer
      ref={transformRef}
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 5 || newBox.height < 5) {
          return oldBox
        }
        return newBox
      }}
    />
  )
}
