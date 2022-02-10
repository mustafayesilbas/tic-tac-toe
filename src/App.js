import { useEffect, useState } from "react";
import "./App.css";
import { winningConditions } from "./utils/index";

function App() {
  const [player, setPlayer] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [moveX, setMoveX] = useState([]);
  const [moveO, setMoveO] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleBoxSelected = (index) => {
    if (!boxes[index] && !isGameOver) {
      const copiedTable = [...boxes];
      copiedTable[index] = player;
      setBoxes(copiedTable);
      if (player === "X") {
        setMoveX((prevMoveX) => [...prevMoveX, index]);
      } else {
        setMoveO((prevMoveO) => [...prevMoveO, index]);
      }
      setPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const checkWinner = (item) => {
    let counter = 0;
    let checkList = item === "X" ? moveO : moveX;
    console.log("checkList", checkList);

    winningConditions.forEach((winItem) => {
      winItem.map((move) => {
        console.log(checkList.sort().includes(move));
        checkList.sort().includes(move) && counter++;
      });
      if (counter === 3) {
        setIsGameOver(true);
      }
      counter = 0;
    });
  };

  useEffect(() => {
    clearTable();
  }, []);

  useEffect(() => {
    if (moveX.length + moveO.length > 4) {
      checkWinner(player);
    } else if (moveX.length + moveO.length === 9) {
      setIsGameOver(true);
    }
  }, [moveX, moveO]);

  const clearTable = () => {
    setPlayer("X");
    setBoxes(Array(9).fill(null));
    setMoveX([]);
    setMoveO([]);
    setIsGameOver(false);
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <button onClick={clearTable}>New Game</button>
      {isGameOver ? <h5>Winner {player === "X" ? "O" : "X"}</h5> : null}
      <div className="container">
        <div className="box-grid">
          {boxes.map((item, index) => (
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
