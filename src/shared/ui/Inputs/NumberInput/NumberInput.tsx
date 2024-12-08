import { forwardRef, useRef } from 'react'
import { useNumberFieldState } from 'react-stately'

import { useNumberField, type AriaNumberFieldProps } from '@react-aria/numberfield'

import { mergeRefs } from '../../../react/lib/mergeRefs'

type Props = AriaNumberFieldProps

export const NumberInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const state = useNumberFieldState({
    ...props,
    locale: 'ru',
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    inputProps: { size, ...inputProps },
  } = useNumberField(props, state, inputRef)

  return <input {...inputProps} ref={mergeRefs([inputRef, ref])} />
})
