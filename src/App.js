import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [startMatch, setStartMatch] = useState(false);
  const [pauseMatch, setPauseMatch] = useState(false);

  const winningChances = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (startMatch === false) {
      alert("Start the match");
      return;
    }

    if (board[index] || winner) return;

    let newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    calculateWin(newBoard);
    setCurrentPlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));
  };

  const calculateWin = (newBoard) => {
    for (let combo of winningChances) {
      const [a, b, c] = combo;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }

    if (!newBoard.includes(null)) setWinner("Draw");
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setStartMatch(false);
  };

  const handleStart = () => {
    setStartMatch(true);
  };

  const handlePause = () => {
    setStartMatch(false);
  };

  return (
    <div className="tic-tac-toe">
      <h1 className="title">Tic Tac Toe</h1>

      <div className={startMatch ? "board" : "board-disabled"}>
        {board?.map((cell, index) => (
          <div
            className="board-cell"
            key={index}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <p>
          {winner === "Draw" ? "It's a Draw !!" : `${winner} Win the Match`}
        </p>
      )}

      <div className="buttons">
        {!startMatch ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        {startMatch && <button onClick={handleReset}>Reset</button>}
      </div>
    </div>
  );
}

export default App;
