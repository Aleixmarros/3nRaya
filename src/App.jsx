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
  <footer>
  <div className="footer-container">
      <div className="footer-logo">
        <picture><img src="./public/favicon.ico" alt="Logo"></img></picture>
        
      </div>
      <span>Aleix Martín</span>
      <div className="footer-social">
      <a href="https://github.com/Aleixmarros"><svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
      </svg></a>

      </div>
    </div>
  </footer>
  </>
  )

}

export default App
