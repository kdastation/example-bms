import { useEffect } from 'react'

import { useEventCallback } from './useEventCallback'

export const useEventListener = <Type extends keyof WindowEventMap>(
  type: Type,
  callback: (this: Window, ev: WindowEventMap[Type]) => any,
  element = window
) => {
  const eventCallback = useEventCallback(callback)

  useEffect(() => {
    element.addEventListener(type, eventCallback)

    return () => {
      element.removeEventListener(type, eventCallback)
    }
  }, [type, element, eventCallback])
}
