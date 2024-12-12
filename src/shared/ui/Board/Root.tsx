import type Konva from 'konva'
import React, { useRef, type ReactNode } from 'react'
import { Layer, Stage } from 'react-konva'
import useResizeObserver from 'use-resize-observer'

import { OvveridedFactoryShape } from './facade/OvveridedFactoryShapes'
import { useControllerOvverided } from './facade/useControllerOvverided'
import { type Shape } from './model/types/Shape'
import { useZoomController, type StateController } from './modules/Contollers'
import { DragDrop } from './modules/DragDrop'
import { EventsPublicProvider, type OnEvent } from './modules/Events/Public'
import { SelectedShapesProvider, useSelectedShapes } from './modules/SelectStore'
import { StageStoreProvider, useStageStore } from './modules/StageStore'
import { Transform } from './modules/Transform'
import { SceneProvider, useScene } from './packages/Scene/SceneProvider'

const Board = ({ shapes, tool }: { shapes: Shape[]; tool: StateController }) => {
  const { stageRef } = useScene()

  const { selectedShapes } = useSelectedShapes()

  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>()

  const stageStore = useStageStore()

  const { setStage, ...stage } = stageStore((state) => state)

  const { elements, stageProps } = useControllerOvverided(tool)

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
            return <OvveridedFactoryShape key={shape.id} shape={shape} />
          })}

          {elements}
        </Layer>

        <Layer>
          <Transform ids={selectedShapes} />
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
        <DragDrop.Provider
          onDropShape={(shape) => {
            onEvent?.({
              type: 'add-shape',
              shape: shape,
            })

            onEvent?.({
              type: 'select',
              ids: [shape.id],
            })

            onEvent?.({
              type: 'change-tool',
              tool: 'idle',
            })
          }}
        >
          {children}
        </DragDrop.Provider>
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
    <SelectedShapesProvider selectedShapes={props.selected}>
      <StageStoreProvider>
        <Board {...props} />
      </StageStoreProvider>
    </SelectedShapesProvider>
  )
}
