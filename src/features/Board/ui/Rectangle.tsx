import type Konva from 'konva'
import React, { Fragment, useEffect, useRef, type RefObject } from 'react'
import { Rect, Transformer } from 'react-konva'

export const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef: RefObject<Konva.Rect> = useRef(null)
  const trRef: RefObject<Konva.Transformer> = useRef(null)

  useEffect(() => {
    if (isSelected) {
      if (trRef.current && shapeRef.current) {
        trRef.current?.nodes([shapeRef.current])
        trRef.current?.getLayer()?.batchDraw()
      }
    }
  }, [isSelected])

  return (
    <Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={() => {
          const node = shapeRef.current

          if (!node) {
            return
          }

          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          node.scaleX(1)
          node.scaleY(1)
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </Fragment>
  )
}
