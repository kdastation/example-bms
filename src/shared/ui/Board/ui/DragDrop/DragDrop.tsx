import merge from 'lodash/merge'
import React, {
  forwardRef,
  useId,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Slot } from '@radix-ui/react-slot'

import { isNull } from '../../../../is'
import { mergeRefs } from '../../../../react/lib/mergeRefs'
import { type DragDropShape } from '../../model/types/Shape'
import { useEventsPublic } from '../Events/Public'
import { useScene } from '../Scene/SceneProvider'

const DragDropProvider = ({ children }: { children: ReactNode }) => {
  const { stageRef } = useScene()

  const { onEvent } = useEventsPublic()

  return (
    <DndContext
      onDragEnd={(event) => {
        const stage = stageRef.current

        const hasCollisionWithContainer = !isNull(event.collisions) && event.collisions.length > 0

        if (!hasCollisionWithContainer) {
          return
        }

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

          onEvent?.({
            type: 'select',
            ids: [id],
          })

          onEvent?.({
            type: 'change-tool',
            tool: 'idle',
          })
        }, 0)
      }}
    >
      {children}
    </DndContext>
  )
}

const Container = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable',
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
      ref={mergeRefs([setNodeRef, ref])}
    >
      {children}
    </div>
  )
})

const DragDropElement = ({ children, shape }: { children: ReactElement; shape: DragDropShape }) => {
  const id = useId()

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      shape,
    },
  })

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 900 : 0,
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
