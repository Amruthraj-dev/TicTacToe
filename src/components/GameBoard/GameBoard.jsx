import { AnimatePresence, motion } from "framer-motion";

const GameBoard = ({
  board,
  playerCategories,
  currentPlayer,
  winner,
  restartGameBoard,
  exitToHome,
  gameMode,
  onCellClick, 
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 sm:p-6">
      <p className="text-lg font-medium dark:text-white">
        Player {currentPlayer + 1}'s Turn{" "}
        <span className="italic text-blue-500">
          ({playerCategories[currentPlayer]})
        </span>
      </p>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {board.map((cell, i) => (
          <div
            key={i}
            className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-3xl cursor-pointer border border-gray-300 rounded-lg transition-transform bg-white/80 dark:bg-gray-800/80 shadow-md
              ${!winner ? "hover:scale-105" : "cursor-not-allowed opacity-60"}`}
            onClick={() => !winner && !cell && onCellClick(i)}
          >
            <AnimatePresence>
              {cell && (
                <motion.span
                  key={cell.emoji}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="drop-shadow-lg"
                >
                  {cell.emoji}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {winner !== null && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-4 mt-4 text-center"
        >
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            🎉 Player {winner } Wins!
          </p>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              onClick={restartGameBoard}
            >
              Play Again
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={exitToHome}
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GameBoard;
