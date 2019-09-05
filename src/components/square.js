import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { useDrop } from 'react-dnd'

import Tile from './tile'
import { ItemTypes } from '../Constants'

const useStyles = makeStyles({
  square: {
    background: '#EEE',
    border: p => `1px solid ${ p.hasTile ? '#FAA': '#CCC'}`,
  }
});

function Square({hasTile, onDrop}) {
  const [, drop] = useDrop({
    accept: ItemTypes.TILE,
    drop: onDrop,
  })

  const c = useStyles({hasTile});
  return (
    <div
      className={c.square}
      ref={drop}
    >
      {hasTile && <Tile/>}
    </div>
  );
}

export default Square;
