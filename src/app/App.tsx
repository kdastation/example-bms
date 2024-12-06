import { Board } from '@features/Board'

export const App = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Excalidraw Example</h1>
      <div style={{ height: '500px' }}>
        <Board />
      </div>
    </>
  )
}
