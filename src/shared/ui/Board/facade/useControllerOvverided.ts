import { useController, type StateController } from '../modules/Contollers'
import { useEventsPublic } from '../modules/Events/Public'
import { createArrow, createLine, createRectangle } from '../packages/ShapeCreators'

export const useControllerOvverided = (state: StateController, selectedShapes: string[]) => {
  const { onEvent } = useEventsPublic()

  return useController(state, {
    select: {
      onSelect: (ids) => {
        onEvent?.({
          type: 'select',
          ids,
        })
      },
      selected: selectedShapes,
    },
    target: {
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
    },
    arrow: {
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
    },
    multiLine: {
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
    },
  })
}
