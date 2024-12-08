import classNames from 'classnames'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { Slot } from '@radix-ui/react-slot'

import styles from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end' | 'normal' | 'stretch'
export type FlexDirection = 'row' | 'column' | 'rowReverse'
export type FlexWrap = 'nowrap' | 'wrap'
export type FlexGap = 1 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 26 | 30 | 32 | 40

const justifyClasses: Record<FlexJustify, string> = {
  start: styles.justify_start,
  center: styles.justify_center,
  end: styles.justify_end,
  between: styles.justify_between,
}

const alignClasses: Record<FlexAlign, string> = {
  start: styles.align_start,
  center: styles.align_center,
  end: styles.align_end,
  normal: styles.align_normal,
  stretch: styles.align_stretch,
}

const directionClasses: Record<FlexDirection, string> = {
  row: styles.direction_row,
  column: styles.direction_column,
  rowReverse: styles.direction_row_reverse,
}

const gapClasses: Record<FlexGap, string> = {
  1: styles.gap_1,
  2: styles.gap_2,
  4: styles.gap_4,
  6: styles.gap_6,
  8: styles.gap_8,
  10: styles.gap_10,
  12: styles.gap_12,
  16: styles.gap_16,
  24: styles.gap_24,
  20: styles.gap_20,
  26: styles.gap_26,
  30: styles.gap_30,
  32: styles.gap_32,
  40: styles.gap_40,
}

type Props = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean
  justify?: FlexJustify
  align?: FlexAlign
  direction?: FlexDirection
  wrap?: FlexWrap
  gap?: FlexGap
  fullWidth?: boolean
  fullHeight?: boolean
  isInline?: boolean
}
export const Flex = forwardRef<HTMLDivElement, Props>(
  (
    {
      asChild,
      className,
      justify = 'start',
      align = 'center',
      direction = 'row',
      wrap = 'nowrap',
      gap,
      fullWidth = false,
      isInline = false,
      fullHeight = false,
      ...props
    },
    ref
  ) => {
    const classes = [
      className,
      justifyClasses[justify],
      alignClasses[align],
      directionClasses[direction],
      styles[wrap],
      gap && gapClasses[gap],
    ]

    const mods = {
      [styles.full_width]: fullWidth,
      [styles.inline_flex]: isInline,
      [styles.full_height]: fullHeight,
    }

    const Component = asChild ? Slot : 'div'
    return <Component {...props} ref={ref} className={classNames(styles.flex, classes, mods)} />
  }
)

Flex.displayName = 'Flex'
