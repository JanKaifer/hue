import React from 'react';
import { makeStyles } from '@material-ui/styles'

import Board from './components/board'
import { ItemTypes } from './Constants'

const [ W, H ] = [5, 5]

const randomColor = () => {
  let color = []
  for (let i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256 - 0.001))
  }
  return color
}

const colorDist = (a, b) => {
  return Math.max(...a.map((item, i) => Math.abs(a[i] - b[i])))
}

const getColors = () => {
  let colors = []
  for (let i = 0; i < 4;) {
    let color = randomColor()
    if (colors.length && Math.min(...colors.map(c => colorDist(c, color))) < 100) {
      continue;
    } else {
      colors.push(color);
      ++i;
    }
  }
  return colors;
}

const combineColors = (colorA, coefA, colorB, coefB) => {
  return colorA.map((item, i) => Math.floor((colorA[i]*coefA + colorB[i]*coefB)/(coefA+coefB) + .5))
}

const genBoard = () => {
  const colors = getColors();
  const board = []
  for (let i = 0; i < W; ++i) {
    board.push([])
    let colorAbove = combineColors(colors[0], W-1-i, colors[1], i)
    let colorBelow = combineColors(colors[2], W-1-i, colors[3], i)
    for (let j = 0; j < H; ++j) {
      board[i].push(
        combineColors(colorAbove, H-1-j, colorBelow, j)
      )
    }
  }
  return board
}

const useStyles = makeStyles({
  app: {
  }
});

function App() {
  const c = useStyles();
  const [ board, setBoard ] = React.useState(genBoard())

  const swap = (a, b) => {
    setBoard(board_old => {
      let board = JSON.parse(JSON.stringify(board_old))
      let helper = board[a.x][a.y]
      board[a.x][a.y] = board[b.x][b.y]
      board[b.x][b.y] = helper
      return board
    })
  }

  return (
    <div className={c.app}>
      <Board board={board} swap={swap}/>
    </div>
  );
}

export default App;
