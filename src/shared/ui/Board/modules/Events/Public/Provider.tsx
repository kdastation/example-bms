import { useMemo, type ReactNode } from 'react'

import { useEventCallback } from '../../../../../react/hooks/useEventCallback'
import { createContext } from '../../../../../react/lib/createContext'
import { type EventPublic } from './types'

export type OnEvent = (event: EventPublic) => void

export type EventsPublicProvider = {
  onEvent: (event: EventPublic) => void
}

const [EventsPublicContextProvider, useEventsPublic] = createContext<EventsPublicProvider>({
  name: 'SceneContextProvider',
  hookName: 'useScene',
  providerName: '<EventsPublicContextProvider />',
})

export const EventsPublicProvider = ({
  onEvent,
  children,
}: EventsPublicProvider & { children: ReactNode }) => {
  const onEventCb = useEventCallback(onEvent)

  const values = useMemo((): EventsPublicProvider => {
    return {
      onEvent: onEventCb,
    }
  }, [onEventCb])

  return <EventsPublicContextProvider value={values}>{children}</EventsPublicContextProvider>
}

export { useEventsPublic }
