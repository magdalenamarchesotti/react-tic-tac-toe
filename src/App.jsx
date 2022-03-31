import { useState } from "react";
import Board from "./components/Board/Board";
import "./app.css";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const App = () => {

  const [turn, setTurn] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0
  });
  const reset = () => {
    setTurn("X");
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
}

  const checkForWinner = (newSquares) => {
    for (let i = 0; i < winningPositions.length; i++ ) {
      // guardo las posiciones de winningpositions en 3 variables distintas [a, b, c]
      const [a, b, c] = winningPositions[i];
       if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
         // hay un ganador
         endGame(newSquares[a], winningPositions[i]);
         return 
       }
    }
    if (!newSquares.includes(null)) {
      // empate
      endGame(null, Array.from(Array(10).keys()));
      return
    }

    setTurn(turn === "X" ? "O" : "X");
  }

  const handleClick = (square) => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn)
    setSquares(newSquares);
    checkForWinner(newSquares);
  }
 
  const endGame = (result, winningPositions) => {
    setTurn(null);
    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      })
    }
    setWinningSquares(winningPositions);
    setTimeout(() => {
      reset();
    }, 2000); 
  }

  return (
    <div className="container">
      <h1>TIC-TAC-TOE</h1>
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
