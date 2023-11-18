import { WINNER_COMBOS } from "../Components/Constans.js"

export const checkWinnerFrom = (boardToCheck) =>{
    // revisamos todos los combos ganadores
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] ===  boardToCheck[b] &&
        boardToCheck[a] ===  boardToCheck[c]
      ) {
        return  boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }