import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const categories = {
  Animals: ["🐶", "🐱", "🐵", "🐰"],
  Food: ["🍕", "🍟", "🍔", "🍩"],
  Sports: ["⚽", "🏀", "🏈", "🎾"],
  Faces: ["😀", "😂", "😍", "😎"],
  Nature: ["🌞", "🌊", "🔥", "❄️"],
};

const generateRandomEmoji = (category, usedEmojis = []) => {
  const options = categories[category];
  const available = options.filter((emoji) => !usedEmojis.includes(emoji));
  return available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : options[Math.floor(Math.random() * options.length)];
};

const GameBoard = ({
  board,
  onCellClick,
  playerCategories,
  currentPlayer,
  winner,
  restartGameBoard,
  exitToHome,
  darkMode,
}) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto p-4">
      <div
        className="grid grid-cols-3 gap-2 w-full max-w-sm mx-auto"
        style={{ aspectRatio: "1 / 1" }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={`flex items-center justify-center rounded
              text-4xl sm:text-5xl min-h-[64px] aspect-square
              transition duration-200 ease-in-out
              ${
                cell
                  ? darkMode
                    ? "bg-purple-700 text-white"
                    : "bg-purple-300 text-black"
                  : darkMode
                  ? "bg-gray-800 hover:bg-purple-700 text-white"
                  : "bg-gray-200 hover:bg-purple-300 text-black"
              }
            `}
            onClick={() => onCellClick(idx)}
            disabled={!!cell || winner !== null}
            aria-label={`Cell ${idx + 1}`}
          >
            {cell?.emoji}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={restartGameBoard}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Play Again
        </button>
        <button
          onClick={exitToHome}
          className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          Exit
        </button>
      </div>
      <div className="text-center text-lg font-semibold mt-2">
        {winner === null && (
          <p>
            Current turn:{" "}
            <span className="font-bold">
              {currentPlayer === 0 ? "Player 1" : "AI"}
            </span>
          </p>
        )}
        {winner !== null && (
          <p className="text-green-500 font-bold text-xl">
            {winner === 0
              ? "Player 1 Wins!"
              : winner === 1
              ? "AI Wins!"
              : "It's a Draw!"}
          </p>
        )}
      </div>
    </div>
  );
};

const BlinkTacToeAI = ({ playerCategories, darkMode, exitToHome }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerEmojis, setPlayerEmojis] = useState([[], []]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(null);

  const checkWin = (playerIndex) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const positions = playerEmojis[playerIndex].map((e) => e.index);
    return winPatterns.some((pattern) =>
      pattern.every((pos) => positions.includes(pos))
    );
  };

  const handlePlayerClick = (index) => {
    if (board[index] || winner !== null || currentPlayer !== 0) return;
    const used = playerEmojis[0].map((e) => e.emoji);
    const emoji = generateRandomEmoji(playerCategories[0], used);
    const updatedBoard = [...board];
    const updatedEmojis = [...playerEmojis];
    const current = updatedEmojis[0];

    if (current.length >= 3) {
      const removed = current.shift();
      if (removed.index === index) return;
      updatedBoard[removed.index] = null;
    }

    current.push({ index, emoji });
    updatedBoard[index] = { player: 0, emoji };
    setBoard(updatedBoard);
    setPlayerEmojis(updatedEmojis);

    if (checkWin(0)) {
      setWinner(0);
    } else if (updatedBoard.every((cell) => cell !== null)) {
      setWinner(2);
    } else {
      setCurrentPlayer(1);
    }
  };

  useEffect(() => {
    if (currentPlayer === 1 && winner === null) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((v) => v !== null);

        if (emptyIndices.length === 0) {
          setWinner(2);
          return;
        }

        const aiMove =
          emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

        const used = playerEmojis[1].map((e) => e.emoji);
        const emoji = generateRandomEmoji(playerCategories[1], used);

        const updatedBoard = [...board];
        const updatedEmojis = [...playerEmojis];
        const current = updatedEmojis[1];

        if (current.length >= 3) {
          const removed = current.shift();
          updatedBoard[removed.index] = null;
        }

        current.push({ index: aiMove, emoji });
        updatedBoard[aiMove] = { player: 1, emoji };
        setBoard(updatedBoard);
        setPlayerEmojis(updatedEmojis);

        if (checkWin(1)) {
          setWinner(1);
        } else if (updatedBoard.every((cell) => cell !== null)) {
          setWinner(2);
        } else {
          setCurrentPlayer(0);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, board, playerEmojis, playerCategories, winner]);

  const restartGameBoard = () => {
    setBoard(Array(9).fill(null));
    setPlayerEmojis([[], []]);
    setWinner(null);
    setCurrentPlayer(0);
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen flex flex-col justify-center"
          : "bg-white text-black min-h-screen flex flex-col justify-center"
      }
    >
      {winner !== null && (
        <Confetti
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
          colors={["#8b5cf6", "#a78bfa", "#7c3aed", "#c4b5fd"]}
        />
      )}
      <GameBoard
        board={board}
        onCellClick={handlePlayerClick}
        playerCategories={playerCategories}
        currentPlayer={currentPlayer}
        winner={winner}
        restartGameBoard={restartGameBoard}
        exitToHome={exitToHome}
        darkMode={darkMode}
      />
    </div>
  );
};

export default BlinkTacToeAI;
