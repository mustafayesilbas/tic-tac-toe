import { useEffect, useState } from "react";
import "./App.css";
import { winningConditions } from "./utils/index";

function App() {
  const [tile, setTile] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [isGameOver, setIsGameOver] = useState(null);

  const handleBoxSelected = (index) => {
    if (!tile[index] && !isGameOver) {
      const copiedTiles = [...tile];
      copiedTiles[index] = isX ? "X" : "O";
      setTile(copiedTiles);
      setIsX((prev) => !prev);

      const selectedTiles = copiedTiles.reduce(
        (acc, curr, index) => {
          if (curr === "X") acc.X.push(index);
          if (curr === "O") acc.O.push(index);
          return acc;
        },
        { X: [], O: [] }
      );

      copiedTiles.filter((item) => item === null).length <= 4 &&
        checkWinner(selectedTiles);
    }
  };

  const checkWinner = (selectedTiles) => {
    const winner = winningConditions.reduce(
      (acc, curr) => {
        if (curr.every((item) => selectedTiles.X.includes(item))) {
          acc.X = true;
          acc.movesX = selectedTiles.X;
        }
        if (curr.every((item) => selectedTiles.O.includes(item))) {
          acc.O = true;
          acc.movesO = selectedTiles.O;
        }
        return acc;
      },
      { X: false, movesX: [], O: false, movesO: [] }
    );

    if (winner.X || winner.O) {
      setIsGameOver(winner.X ? "Winner X" : "Winner O");
    }
    if (selectedTiles.X.length + selectedTiles.O.length === 9) {
      setIsGameOver("Draw");
    }
  };

  useEffect(() => {
    clearTable();
  }, []);

  const clearTable = () => {
    setTile(Array(9).fill(null));
    setIsGameOver(null);
    setIsX(true);
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <button onClick={clearTable}>New Game</button>
      {isGameOver ? <h5>{isGameOver}</h5> : null}
      <div className="container">
        <div className="box-grid">
          {tile.map((item, index) => (
            <div
              key={index}
              className="box"
              onClick={() => handleBoxSelected(index)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
