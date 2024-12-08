import { listToRecord } from '@shared/lib/lisToRecord'
import { type Shape } from '@shared/ui/Board'
import { Flex } from '@shared/ui/Flex'

import { Card } from './Card'

type Props = {
  shapes: Shape[]
  onSelect?: (id: string) => void
  selected?: string[]
}

export const Root = ({ shapes, onSelect, selected }: Props) => {
  const recordSelected = listToRecord(selected || [], (id) => id)

  return (
    <Flex direction={'column'}>
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
