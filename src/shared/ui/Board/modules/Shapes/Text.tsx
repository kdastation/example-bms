import type Konva from 'konva'
import { useRef, useState } from 'react'
import { Text as KonvaText } from 'react-konva'
import { Html } from 'react-konva-utils'
import TextareaAutosize from 'react-textarea-autosize'

import { mergeRefs } from '../../../../react/lib/mergeRefs'
import { type ShapeAttrs, type TextData } from '../../model/types/Shape'
import { generateShapeName } from '../../packages/utils/utils'
import { useDragShape, useTransformShape } from './lib/controls'

type Events = {
  onChange: (args: ShapeAttrs) => void
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
