import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { type Shape } from '@shared/ui/Board'

type Type = Shape['type']

type Props = ComponentPropsWithoutRef<'div'> & {
  type: Type
  isSelected: boolean
}

export const Card = forwardRef<HTMLDivElement, Props>(({ type, isSelected, ...props }, ref) => {
  const translations: Record<Type, string> = {
    card: 'Карточка',
    arrow: 'Стрелка',
    circle: 'Круг',
    text: 'Текст',
    image: 'Изображение',
    line: 'Линия',
    rectangle: 'Квадрат',
  }

  return (
    <p
      style={{
        color: isSelected ? 'red' : 'unset',
        border: isSelected ? '1px solid red' : 'unset',
        cursor: 'pointer',
      }}
      {...props}
      ref={ref}
    >
      {translations[type]}
    </p>
  )
})
