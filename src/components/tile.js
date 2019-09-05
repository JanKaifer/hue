import React from 'react';
import { makeStyles } from '@material-ui/styles'
import { useDrag } from 'react-dnd'

import { ItemTypes } from '../Constants'

const useStyles = makeStyles({
  tile: {
    height: '100%',
    width: '100%',
    background: p => `rgb(${p.color.join(", ")})`,
    opacity: p => p.isDragging ? 0: 1,
  }
});

function Tile({color, item, fixed}) {
  const [ {isDragging}, drag ] = useDrag({
    item,
    canDrag: () => !fixed,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  const c = useStyles({isDragging, color});
  return (
    <div
      className={c.tile}
      ref={drag}
      draggable
    />
  );
}

export default Tile;
