import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { useDrop } from 'react-dnd'

import Tile from './tile'
import { ItemTypes } from '../Constants'

const useStyles = makeStyles({
  square: {
    background: '#000',
    border: `1px solid '#CCC'`,

    zIndex: p => p.selected ? 1: 0,
    transform: p => p.selected ? 'scale(1.2)': 'scale(1)',
    transition: 'all .1s ease-out',
  }
});

function Square({tileColor, onDrop, onClick, selected, dndItem}) {
  const [, drop] = useDrop({
    accept: ItemTypes.TILE,
    drop: onDrop,
  })

  const c = useStyles({selected});
  return (
    <div
      className={c.square}
      ref={drop}
      onClick={onClick}
    >
      <Tile color={tileColor} item={dndItem}/>
    </div>
  );
}

export default Square;
