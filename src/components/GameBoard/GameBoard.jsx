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
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto p-4">
      <p className="text-lg font-semibold dark:text-gray-300 text-center">
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

      <div className="grid grid-cols-3 gap-2 w-full max-w-sm mx-auto" style={{ aspectRatio: "1 / 1" }}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={`flex items-center justify-center rounded text-4xl sm:text-5xl min-h-[64px] aspect-square transition duration-200 ease-in-out ${
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
          <p className="text-green-600 dark:text-green-400 font-bold text-xl">
            {winner === 1 || winner === 2
              ? `🎉 Player ${winner} Wins!`
              : "It's a Draw!"}
          </p>
        </motion.div>
      )}

      <div className="flex gap-4 mt-2">
        <button
          onClick={restartGameBoard}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Restart
        </button>
        <button
          onClick={exitToHome}
          className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
