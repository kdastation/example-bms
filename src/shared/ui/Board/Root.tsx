import type Konva from 'konva'
import React, { useRef, type ReactNode } from 'react'
import { Layer, Stage } from 'react-konva'
import useResizeObserver from 'use-resize-observer'

import { type Shape } from './model/types/Shape'
import { useController, type StateController } from './modules/Contollers/useController'
import { useZoomController } from './modules/Contollers/useZoomController'
import { DragDrop } from './modules/DragDrop/DragDrop'
import { EventsPublicProvider, type OnEvent } from './modules/Events/Public'
import { FactoryShapes } from './modules/Shapes/FactoryShapes'
import { StageStoreProvider, useStageStore } from './modules/StageStore'
import { Transform } from './modules/Transform/Transform'
import { SceneProvider, useScene } from './packages/Scene/SceneProvider'

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

  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>()

  const stageStore = useStageStore()

  const { setStage, ...stage } = stageStore((state) => state)

  const { elements, stageProps } = useController(tool, {
    select: {
      selected,
    },
  })

  const { onWheel } = useZoomController({
    onZoom: setStage,
  })

  return (
    <DragDrop.Container ref={ref}>
      <Stage
        style={{
          width: '100%',
        }}
        ref={stageRef}
        width={width}
        height={height}
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
