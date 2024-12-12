import { useStoreShapes } from '@entities/Shape'

import { listToRecord } from '@shared/lib/lisToRecord'
import { Flex } from '@shared/ui/Flex'

import { Card } from './Card'

export type Props = {
  onSelect?: (id: string) => void
  selected?: string[]
}

export const Root = ({ onSelect, selected }: Props) => {
  const storeShapes = useStoreShapes()

  const shapes = storeShapes.shapes

  const recordSelected = listToRecord(selected || [], (id) => id)

  return (
    <Flex gap={32} direction={'column'}>
      {shapes.map((shape) => {
        return (
          <Card
            isSelected={Boolean(recordSelected[shape.id])}
            onClick={() => {
              onSelect?.(shape.id)
            }}
            key={shape.id}
            type={shape.type}
          />
        )
      })}
    </Flex>
  )
}
