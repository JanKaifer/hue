import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { useDrop } from 'react-dnd'

import Tile from './tile'
import { ItemTypes } from '../Constants'

const useStyles = makeStyles({
  square: {
    background: '#000',
    border: p => `0px solid ${ p.correct ? '#CCC': '#000'}`,
    position: 'relative',

    zIndex: p => p.selected ? 1: 0,
    transform: p => p.selected ? 'scale(1.2)': 'scale(1)',
    transition: 'all .1s ease-out',
    cursor: p => p.fixed? 'initial': 'pointer',
    "&::before": {
      display: p => p.fixed ? 'block': 'none',
      content: '" "',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '100%',
      backgroundColor: '#000',
      width: '10%',
      height: '10%',
    }
  }
});

function Square({tileColor, onDrop, onClick, selected, fixed, dndItem, correct}) {
  const [, drop] = useDrop({
    accept: ItemTypes.TILE,
    canDrop: () => !fixed,
    drop: a => {console.log(a); onDrop(a)},
  })

  const c = useStyles({selected, fixed, correct});
  return (
    <div
      className={c.square}
      ref={drop}
      onClick={fixed ? undefined: onClick}
    >
      <Tile
        color={tileColor}
        item={dndItem}
        fixed={fixed}
      />
    </div>
  );
}

export default Square;
