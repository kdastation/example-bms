import { useMemo } from 'react'

import { useLatest } from './useLatest'

type Fn<ARGS extends any[], R> = (...args: ARGS) => R

export function useEventCallback<A extends any[], R>(fn: Fn<A, R>): Fn<A, R> {
  const ref = useLatest<Fn<A, R>>(fn)

  return useMemo(
    () =>
      (...args: A): R => {
        const { current } = ref
        return current(...args)
      },
    []
  )
}
