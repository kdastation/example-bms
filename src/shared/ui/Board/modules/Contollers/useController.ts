import { createArrow, createLine, createRectangle } from '../../packages/ShapeCreators'
import { useEventsPublic } from '../Events/Public'
import { type Controller } from './Controller'
import { useArrowController } from './useArrowController'
import { useMiltyLineController } from './useMultiLineController'
import { useSelectController } from './useSelectController'
import { useTargetController } from './useTargetController'

export type StateController = 'idle' | 'add' | 'drag' | 'edit-text' | 'arrow' | 'multi-line'

export const useController = (
  state: StateController,
  controllers: {
    select: {
      selected: string[]
    }
  }
): Controller => {
  const { onEvent } = useEventsPublic()

  const selectController = useSelectController({
    onSelect: (ids) => {
      onEvent?.({
        type: 'select',
        ids,
      })
    },
    selected: controllers.select.selected,
  })

  const targetController = useTargetController({
    onTarget: ({ x, y }) => {
      const newRectangle = createRectangle({
        scale: {
          x: 1,
          y: 1,
        },
        width: 400,
        height: 400,
        x,
        y,
        fill: '#4387b1',
        rotation: 0,
      })

      onEvent?.({
        type: 'add-shape',
        shape: newRectangle,
      })

      onEvent?.({
        type: 'select',
        ids: [newRectangle.id],
      })

      onEvent?.({
        type: 'change-tool',
        tool: 'idle',
      })
    },
  })

  const arrowController = useArrowController({
    onAdd: (points) => {
      const newArrow = createArrow({
        points: [points.start.x, points.start.y, points.end.x, points.end.y],
        stroke: 'red',
      })

      onEvent?.({
        type: 'add-shape',
        shape: newArrow,
      })

      onEvent?.({
        type: 'select',
        ids: [newArrow.id],
      })

      onEvent?.({
        type: 'change-tool',
        tool: 'idle',
      })
    },
  })

  const multiLineController = useMiltyLineController({
    onAdd: (points) => {
      const newLine = createLine({
        points,
        stroke: 'red',
      })

      onEvent?.({
        type: 'add-shape',
        shape: newLine,
      })

      onEvent?.({
        type: 'select',
        ids: [newLine.id],
      })

      onEvent?.({
        type: 'change-tool',
        tool: 'idle',
      })
    },
  })

  if (state === 'idle') {
    return selectController
  }

  if (state === 'add') {
    return targetController
  }

  if (state === 'drag') {
    return {
      stageProps: { draggable: true },
    }
  }

  if (state === 'edit-text') {
    return {
      stageProps: {},
    }
  }

  if (state === 'arrow') {
    return arrowController
  }

  if (state === 'multi-line') {
    return multiLineController
  }

  return {
    stageProps: {},
  }
}
