import { type ReactNode } from 'react'

import { Flex } from '@shared/ui/Flex'

import { type Tool as ToolType } from '../model/types'
import { Tool } from './Tool'

type Props = {
  selectedTool: ToolType
  onSelect: (tool: ToolType) => void
}

export const Tools = ({ selectedTool, onSelect }: Props) => {
  const tools: { type: ToolType; icon: ReactNode }[] = [{ icon: 'idle', type: 'idle' }]

  return (
    <Flex align={'start'} direction={'column'} gap={32}>
      {tools.map((tool) => {
        return (
          <Tool
            isSelected={selectedTool === tool.type}
            key={tool.type}
            icon={tool.icon}
            onClick={() => {
              onSelect?.(tool.type)
            }}
          />
        )
      })}
    </Flex>
  )
}
