import { type ReactNode } from 'react'

import { CursorSvg, DragSvg } from '@shared/assets/icons'
import { Flex } from '@shared/ui/Flex'
import { IconButton } from '@shared/ui/IconButton'

import { type Tool as ToolType } from '../model/types'

type Props = {
  selectedTool: ToolType
  onSelect: (tool: ToolType) => void
}

export const Tools = ({ selectedTool, onSelect }: Props) => {
  const tools: { type: ToolType; icon: ReactNode }[] = [
    { icon: <CursorSvg />, type: 'idle' },
    { type: 'drag', icon: <DragSvg /> },
  ]

  return (
    <Flex align={'start'} direction={'column'} gap={32}>
      {tools.map((tool) => {
        const isSelected = tool.type === selectedTool

        return (
          <IconButton
            variant={isSelected ? 'primary' : 'secondary'}
            key={tool.type}
            onClick={() => {
              onSelect?.(tool.type)
            }}
          >
            {tool.icon}
          </IconButton>
        )
      })}
    </Flex>
  )
}
