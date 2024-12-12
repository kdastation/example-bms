import { type ReactNode } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

const Root = ({
  direction,
  children,
}: {
  direction: 'horizontal' | 'vertical'
  children: ReactNode
}) => {
  return <PanelGroup direction={direction}>{children}</PanelGroup>
}

const Item = ({
  defaultSize,
  minSize,
  children,
}: {
  defaultSize: number
  minSize: number
  children?: ReactNode
}) => {
  return (
    <Panel defaultSize={defaultSize} minSize={minSize}>
      {children}
    </Panel>
  )
}

const Handle = () => {
  return (
    <PanelResizeHandle
      style={{
        width: '8px',
        background: '#39414d',
      }}
    />
  )
}

export const ResizePanel = {
  Root,
  Item,
  Handle,
}
