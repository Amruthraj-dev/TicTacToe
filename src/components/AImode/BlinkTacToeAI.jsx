import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";

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
  currentPlayer,
  winner,
  restartGameBoard,
  exitToHome,
  darkMode,
  playerCategories,
  scores,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Game Area */}
      <div className="w-full md:w-[65%] flex flex-col items-center">
        <p className="text-base sm:text-lg font-medium mb-4 dark:text-gray-300 text-center">
          {winner === null ? (
            <>
              {currentPlayer === 0 ? "Player 1" : "AI"}'s Turn{' '}
              <span className="italic text-blue-500">
                ({playerCategories[currentPlayer]})
              </span>
            </>
          ) : null}
        </p>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {board.map((cell, i) => (
            <div
              key={i}
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl cursor-pointer border border-gray-300 rounded-xl transition-transform bg-white/80 dark:bg-gray-800/80 shadow-md ${
                !winner ? "hover:scale-105" : "cursor-not-allowed opacity-60"
              }`}
              onClick={() => !winner && !cell && onCellClick(i)}
            >
              <AnimatePresence>
                {cell && (
                  <motion.span
                    key={cell.emoji}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="drop-shadow-md"
                  >
                    {cell.emoji}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Winner Display */}
        {winner !== null && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-4 mt-6 text-center"
          >
            <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
              🎉 {winner === 1 ? "Player 1 Wins!" : winner === 2 ? "AI Wins!" : "It's a Draw!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="px-4 py-2 sm:px-5 sm:py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                onClick={restartGameBoard}
              >
                Play Again
              </button>
              <button
                className="px-4 py-2 sm:px-5 sm:py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                onClick={exitToHome}
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        )}

        {/* Scorecard for Mobile */}
        <div className="w-full md:hidden mt-8 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-xl text-center">
          <h2 className="text-lg font-bold mb-3">Score</h2>
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="text-green-700 dark:text-green-300 font-semibold">Player 1</span>
              <span className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                {scores[0]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-300 font-semibold">AI</span>
              <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                {scores[1]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">Draws</span>
              <span className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full">
                {scores[2]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scorecard for Desktop */}
      <div className="hidden md:block w-full md:w-[30%] bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-xl text-center">
        <h2 className="text-xl font-bold mb-4">Score</h2>
        <div className="space-y-2 text-lg">
          <div className="flex justify-between">
            <span className="text-green-700 dark:text-green-300 font-semibold">Player 1</span>
            <span className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
              {scores[0]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700 dark:text-blue-300 font-semibold">AI</span>
            <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
              {scores[1]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Draws</span>
            <span className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full">
              {scores[2]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


const BlinkTacToeAI = ({ playerCategories, darkMode, exitToHome }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerEmojis, setPlayerEmojis] = useState([[], []]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState([0, 0, 0]);

  const aiGameOverSound = useRef(null);
  const moveSound = useRef(null);
  const winSound = useRef(null);

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
    return winPatterns.some((pattern) => pattern.every((i) => emojiSet.includes(i)));
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
    moveSound.current?.play();

    if (checkWin(0)) {
      setWinner(1);
      setScores((prev) => [prev[0] + 1, prev[1], prev[2]]);
      winSound.current?.play();
    } else {
      setCurrentPlayer(1);
    }
  };

  useEffect(() => {
    if (currentPlayer === 1 && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter((v) => v !== null);
        if (emptyIndices.length === 0) {
          setWinner(0);
          setScores((prev) => [prev[0], prev[1], prev[2] + 1]);
          return;
        }

        const aiMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
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
        moveSound.current?.play();

        if (checkWin(1)) {
          setWinner(2);
          setScores((prev) => [prev[0], prev[1] + 1, prev[2]]);
          winSound.current?.play();
          aiGameOverSound.current?.play();
        } else {
          setCurrentPlayer(0);
        }
      }, 700);

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
    <div className={`min-h-screen py-6 px-2 sm:px-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <audio ref={moveSound} src="/move.mp3" preload="auto" />
      <audio ref={winSound} src="/player1wins.mp3" preload="auto" />
      <audio ref={aiGameOverSound} src="/ai-win.mp3" preload="auto" />

      {winner !== null && (
        <Confetti
          recycle={false}
          numberOfPieces={200}
          gravity={0.25}
          colors={["#8b5cf6", "#a78bfa", "#7c3aed", "#c4b5fd"]}
        />
      )}

      <GameBoard
        board={board}
        onCellClick={handlePlayerClick}
        currentPlayer={currentPlayer}
        winner={winner}
        restartGameBoard={restartGameBoard}
        exitToHome={exitToHome}
        darkMode={darkMode}
        playerCategories={playerCategories}
        scores={scores}
      />
    </div>
  );
};

export default BlinkTacToeAI;
