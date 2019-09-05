import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Square from './square'
import { ItemTypes } from '../Constants'

const [ W, H ] = [5, 5]

const useStyles = makeStyles({
  board: {
    height: 500,
    width: 500,

    display: 'grid',
    gridTemplateColumns: `repeat(${W}, 1fr)`,
    gridTemplateRows:    `repeat(${H}, 1fr)`,
  }
});

function Board({pos, setPos}) {
  const c = useStyles();
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={c.board}
      >
        {(()=>{
          const squares = []
          for (let y = 0; y < H; ++y) {
            for (let x = 0; x < W; ++x) {
              squares.push(
                <Square
                  key={[x,y].join(', ')}
                  hasTile={pos.x === x && pos.y === y}
                  onDrop={() => setPos({x, y})}
                />
              )
            }
          }
          return squares
        })()}
      </div>
    </DndProvider>
  );
}

export default Board;
