import { useInsertionEffect, useRef } from 'react'

export const useLatest = <T>(value: T) => {
  const valueRef = useRef(value)

  useInsertionEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef
}
