import React, { type CSSProperties, type ReactElement, type ReactNode } from 'react'

import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Slot } from '@radix-ui/react-slot'

import { useEventsPublic } from '../Events/Public'
import { useScene } from '../Scene/SceneProvider'
import { createRectangle } from '../Shapes/creators'

const DragDropProvider = ({ children }: { children: ReactNode }) => {
  const { stageRef } = useScene()

  const { onEvent } = useEventsPublic()

  return (
    <DndContext
      onDragEnd={(event) => {
        const stage = stageRef.current

        console.log(event)

        if (!stage) {
          return
        }

        setTimeout(() => {
          const pointerPosition = stage.getRelativePointerPosition()

          if (!pointerPosition) {
            return
          }

          onEvent?.({
            type: 'add-shape',
            shape: createRectangle({
              x: pointerPosition.x,
              y: pointerPosition.y,
              width: 400,
              height: 400,
              fill: 'blue',
              scale: {
                x: 1,
                y: 1,
              },
              rotation: 0,
            }),
          })
        }, 0)
      }}
    >
      {children}
    </DndContext>
  )
}

const Container = ({ children }: { children: ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable',
    data: {
      accepts: ['type1', 'type2'],
    },
  })
  return <div ref={setNodeRef}>{children}</div>
}

const DragDropElement = ({ children }: { children: ReactElement }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable',
    data: {
      type: 'type1',
    },
  })

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }

  return (
    <Slot draggable='true' {...attributes} {...listeners} style={style} ref={setNodeRef}>
      {children}
    </Slot>
  )
}

export const DragDrop = {
  Provider: DragDropProvider,
  Container,
  Element: DragDropElement,
}
