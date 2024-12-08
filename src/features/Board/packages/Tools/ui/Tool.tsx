import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

type Props = {
  icon: ReactNode
  isSelected: boolean
} & ComponentPropsWithoutRef<'button'>

export const Tool = forwardRef<HTMLButtonElement, Props>(({ icon, isSelected, ...props }, ref) => {
  return (
    <button {...props} ref={ref}>
      {icon}
    </button>
  )
})
