import { type Shape } from '@entities/Shape'

import { listToRecord } from '@shared/lib/lisToRecord'
import { Flex } from '@shared/ui/Flex'

import { Card } from './Card'

export type Props = {
  shapes: Shape[]
  onSelect?: (id: string) => void
  selected?: string[]
}

export const Root = ({ shapes, onSelect, selected }: Props) => {
  const recordSelected = listToRecord(selected || [], (id) => id)

  return (
    <Flex gap={32} direction={'column'}>
      {shapes.map((shape) => {
        return (
          <Card
            isSelected={recordSelected[shape.id]}
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
