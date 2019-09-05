import React from 'react';
import { makeStyles } from '@material-ui/styles'

import Board from './components/board'
import { ItemTypes } from './Constants'

const [ W, H ] = [5, 5]
const SIM_CONST = 20

const randomColor = () => {
  let color = []
  for (let i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256))
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
    if (colors.length && Math.min(...colors.map(c => colorDist(c, color))) < SIM_CONST*(W-1)) {
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

const shuffleBoard = board => {
  let colors = []
  for (let i = 0; i < W; ++i) {
    for (let j = 0; j < H; ++j) {
      if ((i === 0 || i === W-1) && (j === 0 || j === H-1)) continue
      colors.push(board[i][j])
    }
  }
  
  for (let i = 0; i < W; ++i) {
    for (let j = 0; j < H; ++j) {
      if ((i === 0 || i === W-1) && (j === 0 || j === H-1)) continue
      board[i][j] = colors[Math.floor(Math.random()*colors.length)]
      colors = colors.filter(c => c !== board[i][j])
    }
  }
  return board
}

const genBoard = (correctBoard, iter=1) => {
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
  let ok = true;
  for (let i = 0; i < W && ok; ++i) {
    for (let j = 0; j < H && ok;  ++j) {

      [-1, 0, 1].forEach(x => [-1, 0, 1].forEach(y => {
        if (x === 0 && y == 0) return
        else if ((board[i+x] || [])[j+y] !== undefined && colorDist(board[i][j], board[i+x][j+y]) < SIM_CONST) {
          ok = false
        }
      }))
    }
  }
  if (!ok && iter < 100) correctBoard.current = genBoard({}, iter+1)
  else {
    correctBoard.current = board
    console.log("it took", iter, "iterations")
  }
  return shuffleBoard(JSON.parse(JSON.stringify(correctBoard.current)))
}

const checkWin = (board, correctBoard) => {
  for (let i = 0; i < W; ++i) {
    for (let j = 0; j < H; ++j) {
      if (JSON.stringify(board[i][j]) !== JSON.stringify(correctBoard.current[i][j])) {
        return false
      }
    }
  }
  return true
}

const useStyles = makeStyles({
  app: {
  }
});

function App() {
  const c = useStyles();
  const correctBoard = React.useRef()
  const [ board, setBoard ] = React.useState(genBoard(correctBoard))
  React.useEffect(() => {
    if (checkWin(board, correctBoard)) {
      alert("E> Yay you did it! <3")
    }
  }, [board])

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
