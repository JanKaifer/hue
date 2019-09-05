import React from 'react';
import { makeStyles } from '@material-ui/styles'

import Board from './components/board'
import { ItemTypes, COLORS } from './Constants'

let [ W, H ] = [5, 5]
const SIM_CONST = 50

const randomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

const colorDist = (a, b) => {
  return Math.max(...a.map((item, i) => Math.abs(a[i] - b[i])))
}

const correctColors = colors => {
  let ok = true

  colors.forEach((c1, i)=> {
    colors.forEach((c2, j) => {
      if (i === j) return
      if (Math.max(...c1.map((c, k) => Math.abs(c - c2[k]))) < SIM_CONST) {
        ok = false
        return
      }
    })
  })
  return ok
}

const getColors = () => {
  let colors = []
  for (let i = 0, j = 4; i < j; ++i) {
    let color = randomColor()
    if (j < 100 && colors.length && Math.min(...colors.map(c => colorDist(c, color))) < SIM_CONST*(W-1)) {
      ++j;
    } else {
      colors.push(color);
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
  if (!correctColors([].concat(...board)) && iter < 100) correctBoard.current = genBoard({}, iter+1)
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
        //console.log('at', [i, j], board[i][j], 'is not same as', correctBoard.current[i][j])
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
  const [ board, setBoard ] = React.useState(() => genBoard(correctBoard))
  const [ counter, setCounter ] = React.useState(0)
  React.useEffect(() => {
    if (checkWin(board, correctBoard)) {
      const pid = setTimeout(() => {
        alert(`E> Yay you did it! <3 It took you ${counter} steps. World averadge is ${counter*2}.`)
        setBoard(genBoard(correctBoard))
      }, 500)
      return () => clearTimeout(pid)
    }
  }, [board])

  const swap = (a, b) => {
    setCounter(c => c+1)
    setBoard(board_old => {
      let board = JSON.parse(JSON.stringify(board_old))
      let helper = board[a.x][a.y]
      board[a.x][a.y] = board[b.x][b.y]
      board[b.x][b.y] = helper
      return board
    })
    console.log('swapped', a, 'and', b)
  }

  return (
    <div className={c.app}>
      <Board board={board} correctBoard={correctBoard.current} swap={swap}/>
    </div>
  );
}

export default App;
