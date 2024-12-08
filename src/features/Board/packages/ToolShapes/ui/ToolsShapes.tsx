import { Board } from '@shared/ui/Board'
import { Flex } from '@shared/ui/Flex'

const SIZE_TOOL = 100

export const ToolsShapes = () => {
  return (
    <Flex wrap={'wrap'} gap={32}>
      <Board.DragDropElement
        shape={{
          type: 'image',
          rotation: 0,
          scale: {
            x: 1,
            y: 1,
          },
          height: 300,
          width: 300,
          src: 'https://static.insales-cdn.com/images/products/1/7222/329129014/2._%D0%BC%D0%B8%D0%BD%D1%8C%D0%BE%D0%BD_610%D1%85850_%D0%BC%D0%BC.jpg',
        }}
      >
        <img
          width={SIZE_TOOL}
          height={SIZE_TOOL}
          src='https://static.insales-cdn.com/images/products/1/7222/329129014/2._%D0%BC%D0%B8%D0%BD%D1%8C%D0%BE%D0%BD_610%D1%85850_%D0%BC%D0%BC.jpg'
          alt='minoin'
        />
      </Board.DragDropElement>

      <Board.DragDropElement
        shape={{
          type: 'rectangle',
          rotation: 0,
          scale: {
            x: 1,
            y: 1,
          },
          height: 300,
          width: 300,
          fill: '#15cb85',
        }}
      >
        <div
          style={{
            width: SIZE_TOOL,
            height: SIZE_TOOL,
            background: '#15cb85',
          }}
        />
      </Board.DragDropElement>

      <Board.DragDropElement
        shape={{
          type: 'circle',
          rotation: 0,
          scale: {
            x: 1,
            y: 1,
          },
          height: 300,
          width: 300,
          fill: 'red',
        }}
      >
        <div
          style={{
            width: SIZE_TOOL,
            height: SIZE_TOOL,
            background: 'red',
            borderRadius: '100%',
          }}
        />
      </Board.DragDropElement>
      <Board.DragDropElement
        shape={{
          type: 'text',
          rotation: 0,
          scale: {
            x: 1,
            y: 1,
          },
          height: 20,
          width: 200,
          text: 'Текст',
          color: 'red',
          fontSize: 20,
        }}
      >
        <p style={{ color: 'red' }}>Текст</p>
      </Board.DragDropElement>
      <Board.DragDropElement
        shape={{
          type: 'card',
          rotation: 0,
          scale: {
            x: 1,
            y: 1,
          },
          height: 300,
          width: 300,
          fill: 'rgb(255, 249, 177)',
          canCreateNewCard: true,
        }}
      >
        <div
          style={{
            width: SIZE_TOOL,
            height: SIZE_TOOL,
            background: 'rgb(255, 249, 177)',
            boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
            borderRadius: 8,
          }}
        />
      </Board.DragDropElement>
    </Flex>
  )
}
