import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { useDrag } from 'react-dnd'

import { ItemTypes } from '../Constants'

const useStyles = makeStyles({
  tile: {
    height: '100%',
    width: '100%',
    background: 'red',
    opacity: p => p.isDragging ? .5: 1,
    cursor: 'move',
  }
});

function Tile({}) {
  const [ {isDragging}, drag ] = useDrag({
    item: {
      type: ItemTypes.TILE,
		},
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  const c = useStyles({isDragging});
  return (
    <div
      className={c.tile}
      ref={drag}
      draggable
    />
  );
}

export default Tile;
