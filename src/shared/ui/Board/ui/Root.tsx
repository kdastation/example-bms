import type Konva from 'konva'
import React, { useRef, type ReactNode } from 'react'
import { Layer, Stage } from 'react-konva'

import { useController, type StateController } from './Contollers/useController'
import { useZoomController } from './Contollers/useZoomController'
import { DragDrop } from './DragDrop/DragDrop'
import { EventsPublicProvider, useEventsPublic, type OnEvent } from './Events/Public'
import { SceneProvider, useScene } from './Scene/SceneProvider'
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
  shapes: Shape[]
  selected: string[]
  tool: StateController
}) => {
  const { stageRef } = useScene()

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
    <DragDrop.Container>
      <Stage
        style={{
          border: '1px solid black',
          width: 'fit-content',
        }}
        ref={stageRef}
        width={900}
        height={900}
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
    </DragDrop.Container>
  )
}

export const Root = ({ onEvent, children }: { onEvent?: OnEvent; children: ReactNode }) => {
  const stageRef = useRef<Konva.Stage | null>(null)

  return (
    <EventsPublicProvider
      onEvent={(event) => {
        onEvent?.(event)
      }}
    >
      <SceneProvider stageRef={stageRef}>
        <DragDrop.Provider>{children}</DragDrop.Provider>
      </SceneProvider>
    </EventsPublicProvider>
  )
}

type Props = {
  shapes: Shape[]
  selected: string[]
  tool: StateController
}

export const RootBoard = ({ ...props }: Props) => {
  return (
    <StageStoreProvider>
      <Board {...props} />
    </StageStoreProvider>
  )
}
