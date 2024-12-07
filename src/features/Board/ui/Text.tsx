import type Konva from 'konva'
import { useRef, useState } from 'react'
import { Text as KonvaText } from 'react-konva'
import { Html } from 'react-konva-utils'
import TextareaAutosize from 'react-textarea-autosize'

import { mergeRefs } from '@shared/react/lib/mergeRefs'

import { type Shape } from './types'
import { generateShapeName, useDragShape, useTransformShape } from './utils'

export type TextData = Shape & {
  text: string
  color: string
  canDrag?: boolean
  canSelect?: boolean
  fontSize?: number
}

type Events = {
  onChange: (args: Shape) => void
  onStartChangeText?: () => void
  onEndChangeText?: (text: string) => void
}

type Props = TextData & Events

export const Text = ({
  text,
  color,
  canDrag = true,
  canSelect = true,
  onChange,
  onEndChangeText,
  onStartChangeText,
  fontSize = 14,
  ...props
}: Props) => {
  const ref = useRef<Konva.Text | null>(null)

  const textNode = ref.current

  const [isVisibleInput, setIsVisibleInput] = useState(false)

  const { onDragEnd } = useDragShape({
    onChange: (coords) => {
      onChange?.({
        ...props,
        ...coords,
      })
    },
  })

  const { ref: refShapeForTransform, onTransformEnd } = useTransformShape<Konva.Text>({
    onChange: (sizes) => {
      onChange?.({
        ...props,
        ...sizes,
      })
    },
  })

  const handleDbClick = () => {
    setIsVisibleInput(true)

    onStartChangeText?.()
  }

  return (
    <>
      <KonvaText
        {...props}
        text={text}
        onDblClick={handleDbClick}
        color={color}
        name={generateShapeName('text', {
          canSelect,
        })}
        fontSize={fontSize}
        fill={color}
        draggable={canDrag}
        ref={mergeRefs([refShapeForTransform, ref])}
        onTransformEnd={onTransformEnd}
        onDragEnd={onDragEnd}
      />

      {textNode && isVisibleInput && (
        <Html
          transformFunc={(attrs) => {
            const coords = textNode?.getAbsolutePosition()

            return {
              ...attrs,
              ...coords,
              rotation: textNode?.rotation(),
            }
          }}
        >
          <div
            style={{
              minHeight: textNode.height(),
              backgroundColor: 'white',
            }}
          >
            <TextareaAutosize
              style={{
                width: textNode.width(),
                color,
                fontSize: fontSize,
                border: 'none',
                outline: 'none',
                resize: 'none',
              }}
              autoFocus
              onBlur={(event) => {
                onChange({
                  ...props,
                  height: event.target.getBoundingClientRect().height,
                })

                onEndChangeText?.(event.target.value)

                setIsVisibleInput(false)
              }}
              defaultValue={text}
            />
          </div>
        </Html>
      )}
    </>
  )
}
