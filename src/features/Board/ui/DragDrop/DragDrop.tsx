import merge from 'lodash/merge'
import React, { type CSSProperties, type ReactElement, type ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Slot } from '@radix-ui/react-slot'

import { useEventsPublic } from '../Events/Public'
import { useScene } from '../Scene/SceneProvider'
import { type DragDropShape } from '../Shape'

const DragDropProvider = ({ children }: { children: ReactNode }) => {
  const { stageRef } = useScene()

  const { onEvent } = useEventsPublic()

  return (
    <DndContext
      onDragEnd={(event) => {
        const stage = stageRef.current

        const newShape = event.active.data.current.shape as DragDropShape

        if (!stage) {
          return
        }

        setTimeout(() => {
          const pointerPosition = stage.getRelativePointerPosition()

          if (!pointerPosition) {
            return
          }

          const id = uuidv4().toString()

          onEvent?.({
            type: 'add-shape',
            shape: merge(newShape, {
              x: pointerPosition.x,
              y: pointerPosition.y,
              id,
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
  })

  return <div ref={setNodeRef}>{children}</div>
}

const DragDropElement = ({ children, shape }: { children: ReactElement; shape: DragDropShape }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable',
    data: {
      shape,
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