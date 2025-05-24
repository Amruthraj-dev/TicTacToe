import { useState, useEffect } from "react";
import Confetti from "react-confetti";

import GameBoard from "../GameBoard/GameBoard";

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

const BlinkTacToeAI = ({ playerCategories, darkMode, exitToHome }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerEmojis, setPlayerEmojis] = useState([[], []]);
  const [currentPlayer, setCurrentPlayer] = useState(0); 
  const [winner, setWinner] = useState(null);

  // Check win
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
    const emojiSet = playerEmojis[playerIndex].map((e) => e.index);
    return winPatterns.some((pattern) =>
      pattern.every((i) => emojiSet.includes(i))
    );
  };

 
  const handlePlayerClick = (index) => {
    if (board[index] || winner || currentPlayer !== 0) return;

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
  setWinner(2); 
} else {
  setCurrentPlayer(1);
}

  };

 
  useEffect(() => {
    if (currentPlayer === 1 && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((v) => v !== null);

        if (emptyIndices.length === 0) {
          setCurrentPlayer(0);
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
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
 

      <div className="flex flex-col items-center gap-8 p-6">
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
        />
      </div>
    </div>
  );
};

export default BlinkTacToeAI;
