import { useState } from 'react';
import './App.css';
import Square from './components/Square';
import { TURNS } from './constants';
import { checkWinnerFrom, checkEndGame } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal';
import confetti from 'canvas-confetti';
import {
  saveGameToStorage,
  resetGameStorage,
  winnerStorage,
  resetWinnerStorage,
  scoreStorage,
} from './logic/storage';
import Score from './components/Score.jsx';
import ChooseTurn from './components/ChooseTurn.jsx';

function App() {
  // ================ ESTADO DE BOARD ====================

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  // ================ ESTADO DE TURNO ====================

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  // ================ ESTADO DE GANADOR ====================

  const [winner, setWinner] = useState(() => {
    const winnerStorage = window.localStorage.getItem('winner');

    if (winnerStorage) return winnerStorage;
    return null;
  });

  // ================ ESTADO DE SCORE ====================

  const [score, setScore] = useState(() => {
    const scoreFromStorage = JSON.parse(localStorage.getItem('score'));

    if (scoreFromStorage) {
      return scoreFromStorage;
    }

    return {
      X: 0,
      O: 0,
    };
  });

  // ================ ESTADO DE GAME STARTED ====================

  const [gameStarted, setGameStarted] = useState(true);

  // ================ RESETEAR JUEGO ====================

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
    resetWinnerStorage();
  };

  // ================ RESETEAR SCORE ====================

  const resetScore = () => {
    setScore({
      X: 0,
      O: 0,
    });
  };

  // ================ ACTUALIZAR TABLERO ====================

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    // actualizar el tablero

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // cambiar el turno

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Guardar partida

    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    // revisar si hay ganador

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      updateScore(newWinner);
      confetti();

      setWinner(newWinner);

      winnerStorage({ newWinner: newWinner });
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  // ============ Actualizar SCORE ===========

  const updateScore = (newWinner) => {
    if (newWinner === TURNS.X || newWinner === TURNS.O) {
      const winnerKey = Object.keys(TURNS).find(
        (turnKey) => TURNS[turnKey] === newWinner
      );

      if (winnerKey) {
        const newScore = { ...score, [winnerKey]: score[winnerKey] + 1 };

        setScore(newScore);
        scoreStorage({ newScore: newScore });
      }
    }
  };

  // ============ DECIDIR TURNO ===========

  const handleButtonClick = (event) => {
    const buttonValue = event.target.textContent;

    if (buttonValue === TURNS.X || buttonValue === TURNS.O) {
      setTurn(buttonValue);
      setGameStarted(!gameStarted);
    }
  };

  return (
    <div>
      {gameStarted ? (
        <ChooseTurn handleButtonClick={handleButtonClick} />
      ) : (
        <main className="board">
          <h1>Tic Tac Toe</h1>

          <button onClick={resetGame}>Reset to game</button>

          <button onClick={() => setGameStarted(!gameStarted)}>
            Choose turn
          </button>

          <section className="game">
            {board.map((square, index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {square}
                </Square>
              );
            })}
          </section>
          <section className="turn">
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
          </section>

          <WinnerModal resetGame={resetGame} winner={winner} />

          <Score score={score} resetScore={resetScore} />
        </main>
      )}
    </div>
  );
}

export default App;
