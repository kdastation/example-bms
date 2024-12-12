import type Konva from 'konva'
import React, { useRef, type ReactNode } from 'react'
import { Layer, Stage } from 'react-konva'
import useResizeObserver from 'use-resize-observer'

import { type Shape } from './model/types/Shape'
import { useController, type StateController } from './modules/Contollers/useController'
import { useZoomController } from './modules/Contollers/useZoomController'
import { DragDrop } from './modules/DragDrop'
import { EventsPublicProvider, useEventsPublic, type OnEvent } from './modules/Events/Public'
import { FactoryShapes } from './modules/Shapes/FactoryShapes'
import { StageStoreProvider, useStageStore } from './modules/StageStore'
import { Transform } from './modules/Transform'
import { SceneProvider, useScene } from './packages/Scene/SceneProvider'
import { createArrow, createLine, createRectangle } from './packages/ShapeCreators'

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

  const { onEvent } = useEventsPublic()

  const { setStage, ...stage } = stageStore((state) => state)

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
            return (
              <FactoryShapes
                onChangeAttrsShape={(shapeAttrs) => {
                  onEvent?.({
                    type: 'change-attrs',
                    attrs: shapeAttrs,
                  })
                }}
                onEndChangeText={(shapeId, newText) => {
                  onEvent?.({
                    type: 'end-change-text',
                    newText: newText,
                    id: shapeId,
                  })

                  onEvent?.({
                    type: 'select',
                    ids: [shapeId],
                  })

                  setTimeout(() => {
                    onEvent?.({
                      type: 'change-tool',
                      tool: 'idle',
                    })
                  }, 100)
                }}
                onStartChangeText={(shapeId) => {
                  onEvent?.({
                    type: 'start-change-text',
                    id: shapeId,
                  })

                  onEvent?.({
                    type: 'select',
                    ids: [],
                  })

                  onEvent?.({
                    type: 'change-tool',
                    tool: 'edit-text',
                  })
                }}
                onAddNewCardShape={(newCardShape) => {
                  onEvent?.({
                    type: 'add-shape',
                    shape: newCardShape,
                  })

                  onEvent?.({
                    type: 'select',
                    ids: [newCardShape.id],
                  })
                }}
                selected={selected}
                key={shape.id}
                shape={shape}
              />
            )
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
    <StageStoreProvider>
      <Board {...props} />
    </StageStoreProvider>
  )
}
