import type Konva from 'konva'
import React, { useRef } from 'react'
import { Layer, Stage } from 'react-konva'

import { useController, type StateController } from './Contollers/useController'
import { useZoomController } from './Contollers/useZoomController'
import { EventsPublicProvider, useEventsPublic, type OnEvent } from './Events/Public'
import { SceneProvider } from './Scene/SceneProvider'
import { type Shape } from './Shape'
import { createArrow, createLine, createRectangle } from './Shapes/creators'
import { FactoryShapes } from './Shapes/FactoryShapes'
import { StageStoreProvider, useStageStore } from './Store/StageStore'
import { Transform } from './Transform'

const Board = ({
  shapes,
  selected,
  tool,
}: {
  shapes: Shape[] //TODO: refactor
  selected: string[]
  tool: StateController
}) => {
  const stageRef = useRef<Konva.Stage | null>(null)

  const stageStore = useStageStore()

  const { setStage, ...stage } = stageStore((state) => state)

  const { onEvent } = useEventsPublic()

  const { elements, stageProps } = useController(tool, {
    select: {
      onSelect: (ids) => {
        onEvent?.({
          type: 'select',
          ids,
        })
      },
      selected,
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
          fill: 'red',
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

  const { onWheel } = useZoomController({
    onZoom: setStage,
  })

  return (
    <SceneProvider stageRef={stageRef}>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        {...stageProps}
        onWheel={onWheel}
      >
        <Layer>
          {shapes.map((shape) => {
            return <FactoryShapes selected={selected} key={shape.id} shape={shape} />
          })}

          {elements}
        </Layer>

        <Layer>
          <Transform ids={selected} />
        </Layer>
      </Stage>
    </SceneProvider>
  )
}

type Props = {
  onEvent?: OnEvent
  shapes: Shape[]
  tool: StateController

  //TODO: refactor
  selected: string[]
}

export const Root = ({ onEvent, shapes, selected, tool }: Props) => {
  return (
    <EventsPublicProvider
      onEvent={(event) => {
        onEvent?.(event)
      }}
    >
      <StageStoreProvider>
        <Board tool={tool} selected={selected} shapes={shapes} />
      </StageStoreProvider>
    </EventsPublicProvider>
  )
}
