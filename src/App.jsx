import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './Components/Square.jsx'
import { TURNS } from './Components/Constans.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './Components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage) 
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  //null=no hay ganador, false=empate
  const [winner, setWinner] = useState(null) 
  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) =>{
    //no actualizar posicion si ya tiene algo
    if(board[index] || winner) return
    // actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aquí la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }

  }

  return (
    <>
    <h1 className='logo-1'>3enRaya</h1>

  <main className='board'>
    <section className='game'>
      {
        board.map((square, index) => {
          return (
           <Square 
           key={index}
           index={index}
           updateBoard={updateBoard}
           >
            {square}
            </Square>
          )
        })
      }
    </section>
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}        
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}        
      </Square>
    </section>
    <button onClick={resetGame}>Empezar de nuevo</button>
    <WinnerModal resetGame={resetGame} winner={winner}/>
   
  </main>
  </>
  )

}

export default App
