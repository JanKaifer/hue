import React from 'react';
import { makeStyles } from '@material-ui/styles'

import Board from './components/board'
import { ItemTypes } from './Constants'

const useStyles = makeStyles({
  app: {
  }
});

function App() {
  const c = useStyles();
  const [ pos, setPos ] = React.useState({
    x: 2,
    y: 3,
  })

  return (
    <div className={c.app}>
      <Board pos={pos} setPos={setPos}/>
    </div>
  );
}

export default App;
