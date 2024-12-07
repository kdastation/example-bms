import type Konva from 'konva'
import React, { useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'

import { mergeRefs } from '@shared/react/lib/mergeRefs'

import { Card, type CardData } from './Card'
import { Circle, type CircleData } from './Circle'
import { useController, type StateController } from './contoller/useController'
import { useZoomController } from './contoller/useZoomController'
import { Image, type ImageData } from './Image'
import { Line, type LineData } from './Line'
import { Rectangle, type RectangleData } from './Rectangle'
import { SceneProvider } from './SceneProvider'
import { StageProvider, useStage } from './StageProvider'
import { Text, type TextData } from './Text'
import { Transform } from './Transform'
import { distanceTwoPoints } from './utils'

type RectangleShape = RectangleData & {
  type: 'rectangle'
}

type ImageShape = ImageData & {
  type: 'image'
}

type CircleShape = CircleData & {
  type: 'circle'
}

type TextShape = TextData & {
  type: 'text'
}

type LineShape = LineData & {
  type: 'line'
}

type CardShape = CardData & {
  type: 'card'
}

type ShapeData = RectangleShape | ImageShape | CircleShape | TextShape | LineShape | CardShape

const initialRectangles: ShapeData[] = [
  {
    type: 'rectangle',
    y: 0,
    x: 0,
    height: 120,
    width: 160,
    fill: 'red',
    scale: {
      x: 1,
      y: 1,
    },
    id: 'rect-1',
    rotation: 0,
  },
  {
    type: 'circle',
    x: 100,
    y: 100,
    rotation: 0,
    scale: {
      x: 1,
      y: 1,
    },
    fill: 'green',
    width: 40,
    height: 40,
    id: 'circle-1',
  },
  {
    type: 'line',
    x: 0,
    y: 0,
    id: 'line-1',
    stroke: 'red',
    fill: 'red',
    points: [150, 150, 300, 300],
    width: distanceTwoPoints({ x1: 150, y1: 150, x2: 150, y2: 150 }),
    height: distanceTwoPoints({ x1: 150, y1: 150, x2: 150, y2: 150 }),
    scale: {
      x: 1,
      y: 1,
    },
    rotation: 0,
  },
  {
    type: 'card',
    rotation: 0,
    scale: {
      x: 1,
      y: 1,
    },
    height: 400,
    width: 400,
    fill: 'rgb(255, 249, 177)',
    id: 'card-1',
    x: 300,
    y: 300,
    canCreateNewCard: true,
  },
]

const Board = () => {
  const stageRef = useRef<Konva.Stage | null>(null)

  const stageStore = useStage()

  const { setStage, ...stage } = stageStore((state) => state)

  const [rectangles, setRectangles] = useState<ShapeData[]>(
    JSON.parse(localStorage.getItem('shapes')) || initialRectangles
  )

  const [selectedIds, selectShapes] = useState([])

  const [stateController, setStateController] = useState<StateController>('idle')

  const {
    ref: refStageController,
    elements,
    stageProps,
  } = useController(stateController, {
    select: {
      onSelect: selectShapes,
      selected: selectedIds,
    },
    target: {
      onTarget: ({ x, y }) => {
        setRectangles((prev) => {
          return [
            ...prev,
            {
              x,
              y,
              fill: 'red',
              width: 400,
              height: 400,
              id: `rectangle-${prev.length + 10}`,
              rotation: 0,
              type: 'rectangle',
              scale: {
                x: 1,
                y: 1,
              },
            },
          ]
        })
      },
    },
    arrow: {
      onAdd: (points) => {
        setRectangles((prev) => {
          return [
            ...prev,
            {
              id: `line-${prev.length + 10}`,
              rotation: 0,
              type: 'line',
              fill: 'red',
              stroke: 'red',
              x: 0,
              y: 0,
              points: [points.start.x, points.start.y, points.end.x, points.end.y],
              width: distanceTwoPoints({
                x1: points.start.x,
                y1: points.start.y,
                x2: points.end.x,
                y2: points.end.y,
              }),
              height: distanceTwoPoints({
                x1: points.start.x,
                y1: points.start.y,
                x2: points.end.x,
                y2: points.end.y,
              }),
              scale: {
                x: 1,
                y: 1,
              },
            },
          ]
        })
      },
    },
    multiLine: {
      onAdd: (points) => {
        const newId = `line-kek-${rectangles.length}`
        setRectangles((prev) => {
          return [
            ...prev,
            {
              type: 'line',
              x: 0,
              y: 0,
              points,
              fill: 'red',
              stroke: 'red',
              scale: {
                x: 1,
                y: 1,
              },
              width: 400,
              height: 400,
              id: newId,
              rotation: 0,
            },
          ]
        })

        selectShapes([newId])

        setStateController('idle')
      },
    },
  })

  const { onWheel } = useZoomController({
    onZoom: setStage,
  })

  return (
    <div>
      <div>
        <button
          onClick={() => {
            localStorage.setItem('shapes', JSON.stringify(rectangles))
          }}
        >
          save
        </button>
        <button
          onClick={() => {
            setStateController('idle')
          }}
        >
          idle
        </button>

        <button
          onClick={() => {
            setStateController('add')
          }}
        >
          add
        </button>

        <button
          onClick={() => {
            setStateController('drag')
          }}
        >
          drag
        </button>

        <button
          onClick={() => {
            setStateController('arrow')
          }}
        >
          arrow
        </button>

        <button
          onClick={() => {
            setStateController('multi-line')
          }}
        >
          multiline controller
        </button>
      </div>
      <SceneProvider stageRef={stageRef}>
        <Stage
          ref={mergeRefs([stageRef, refStageController])}
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
            {rectangles.map((rect, i) => {
              if (rect.type === 'card') {
                console.log(
                  rect.canCreateNewCard
                    ? selectedIds.length === 1 && selectedIds.includes(rect.id)
                    : false
                )

                return (
                  <Card
                    key={rect.id}
                    {...rect}
                    canCreateNewCard={
                      rect.canCreateNewCard
                        ? selectedIds.length === 1 && selectedIds.includes(rect.id)
                        : false
                    }
                    onChange={(newAttrs) => {
                      setRectangles((prevState) => {
                        const rects = prevState.slice()
                        rects[i] = {
                          ...rects[i],
                          ...newAttrs,
                        }

                        return rects
                      })
                    }}
                    onAddCard={(newCardAttrs) => {
                      const newCardId = `card-${rectangles.length}`

                      setRectangles((prev) => {
                        return [
                          ...prev,
                          {
                            type: 'card',
                            rotation: 0,
                            id: newCardId,
                            fill: rect.fill,
                            canCreateNewCard: true,
                            scale: {
                              x: 1,
                              y: 1,
                            },
                            ...newCardAttrs,
                          },
                        ]
                      })

                      selectShapes([newCardId])
                    }}
                  />
                )
              }

              if (rect.type === 'line') {
                return (
                  <Line
                    key={rect.id}
                    {...rect}
                    onChange={(newAttrs) => {
                      setRectangles((prevState) => {
                        const rects = prevState.slice()
                        rects[i] = {
                          ...rects[i],
                          ...newAttrs,
                        }

                        return rects
                      })
                    }}
                  />
                )
              }

              if (rect.type === 'text') {
                return (
                  <Text
                    key={rect.id}
                    {...rect}
                    onChange={(newAttrs) => {
                      setRectangles((prevState) => {
                        const rects = prevState.slice()
                        rects[i] = {
                          ...rects[i],
                          ...newAttrs,
                        }

                        return rects
                      })
                    }}
                    onEndChangeText={(newText) => {
                      setRectangles((prevState) => {
                        const rects = prevState.slice()

                        if (rects[i].type === 'text') {
                          rects[i] = {
                            ...rects[i],
                            text: newText,
                          }
                        }

                        return rects
                      })

                      selectShapes([rect.id])

                      setTimeout(() => {
                        setStateController('idle')
                      }, 100)
                    }}
                    onStartChangeText={() => {
                      setStateController('edit-text')
                      selectShapes([])
                    }}
                  />
                )
              }

              if (rect.type === 'circle') {
                return (
                  <Circle
                    key={rect.id}
                    {...rect}
                    onChange={(newAttrs) => {
                      setRectangles((prevState) => {
                        const rects = prevState.slice()
                        rects[i] = {
                          ...rects[i],
                          ...newAttrs,
                        }

                        return rects
                      })
                    }}
                  />
                )
              }

              if (rect.type === 'image') {
                return (
                  <Image
                    key={rect.id}
                    {...rect}
                    onChange={(newAttrs) => {
                      setRectangles((prevState) => {
                        const rects = prevState.slice()
                        rects[i] = {
                          ...rects[i],
                          ...newAttrs,
                        }

                        return rects
                      })
                    }}
                  />
                )
              }

              return (
                <Rectangle
                  key={rect.id}
                  width={rect.width}
                  fill={rect.fill}
                  y={rect.y}
                  x={rect.x}
                  canSelect={rect.canSelect}
                  canDrag={rect.canDrag}
                  height={rect.height}
                  id={rect.id}
                  onChange={(newAttrs) => {
                    setRectangles((prevState) => {
                      const rects = prevState.slice()
                      rects[i] = {
                        ...rects[i],
                        ...newAttrs,
                      }

                      return rects
                    })
                  }}
                />
              )
            })}

            {elements}
          </Layer>

          <Layer>
            <Transform ids={selectedIds} />
          </Layer>
        </Stage>
      </SceneProvider>
    </div>
  )
}

export const Root = () => {
  return (
    <StageProvider>
      <Board />
    </StageProvider>
  )
}
