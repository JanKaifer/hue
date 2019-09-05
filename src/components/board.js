import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'

import Square from './square'
import { ItemTypes } from '../Constants'


// Stolen from Stack overflow: https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
function is_touch_device() {
  return true
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

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
  console.log("Using touch: " + is_touch_device())
  return (
    <DndProvider backend={is_touch_device() ? TouchBackend: HTML5Backend} options={{enableMouseEvents: true}}>
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
