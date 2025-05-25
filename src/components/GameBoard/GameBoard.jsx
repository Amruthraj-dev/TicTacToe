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
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      <p className="text-base sm:text-lg font-semibold dark:text-gray-300 text-center">
        {winner === null ? (
          <>
            Current Turn:{" "}
            <span className="font-bold text-blue-500">
              Player {currentPlayer + 1}
            </span>{" "}
            ({playerCategories[currentPlayer]})
          </>
        ) : null}
      </p>

 {/* Emoji grid (3x3 game board) */}
      <div
        className="grid grid-cols-3 gap-2 w-full max-w-sm"
        style={{ aspectRatio: "1 / 1" }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={`flex items-center justify-center rounded text-3xl sm:text-4xl min-h-[64px] aspect-square transition duration-200 ease-in-out ${
              cell
                ? "bg-purple-300 text-black dark:bg-purple-700 dark:text-white"
                : "bg-gray-200 hover:bg-purple-300 text-black dark:bg-gray-800 dark:hover:bg-purple-700 dark:text-white"
            }`}
            onClick={() => !winner && !cell && onCellClick(idx)}
            disabled={!!cell || winner !== null}
            aria-label={`Cell ${idx + 1}`}
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
          </button>
        ))}
      </div>

      {winner !== null && (
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mt-2"
        >
          <p className="text-lg sm:text-xl text-green-600 dark:text-green-400 font-bold">
            {winner === 1 || winner === 2
              ? `🎉 Player ${winner} Wins!`
              : "It's a Draw!"}
          </p>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4 w-full justify-center">
        <button
          onClick={restartGameBoard}
          className="w-full sm:w-auto px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition text-sm sm:text-base"
        >
          Play Again
        </button>
        <button
          onClick={exitToHome}
          className="w-full sm:w-auto px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-sm sm:text-base"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
