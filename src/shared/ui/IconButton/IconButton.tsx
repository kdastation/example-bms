import classNames from 'classnames'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'

import styles from './IconButton.module.scss'

type Variants = 'secondary' | 'primary'

type Sizes = 1 | 2 | 3 | 4 | 5 | 6

const sizes: Record<Sizes, string> = {
  1: styles.size_1,
  2: styles.size_2,
  3: styles.size_3,
  4: styles.size_4,
  5: styles.size_5,
  6: styles.size_6,
}

const variants: Record<Variants, string> = {
  secondary: styles.secondary,
  primary: styles.primary,
}

export type Props = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  variant?: Variants
  size?: Sizes
  children?: ReactNode
  isRounded?: boolean
  isLoading?: boolean
  asChild?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      variant = 'secondary',
      size = 6,
      isRounded = false,
      type = 'button',
      className,
      isLoading,
      asChild,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button'

    return (
      <Component
        className={classNames(
          styles.base,
          [
            variants[variant],
            sizes[size],
            {
              [styles.radius_full]: isRounded,
            },
          ],
          className
        )}
        {...props}
        type={type}
        ref={ref}
      >
        {isLoading ? <div>loading...</div> : children}
      </Component>
    )
  }
)
