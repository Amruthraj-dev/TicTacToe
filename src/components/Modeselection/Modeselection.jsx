const ModeSelection = ({ setGameMode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 px-4 sm:px-6 md:px-12 bg-white/30 dark:bg-black/20 shadow-lg rounded-2xl backdrop-blur-md transition-all duration-500">
      <h1 className="text-3xl sm:text-4xl font-bold text-center   dark:text-white transition-colors duration-300">
        Choose Game Mode
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
    <button
  className="w-full sm:w-auto px-6 py-3 rounded-xl shadow-md
    bg-gradient-to-br from-purple-300 via-indigo-500 to-blue-600
    text-white
    hover:bg-gradient-to-br hover:from-blue-600 hover:via-indigo-500 hover:to-purple-300
    transition-all duration-300 ease-in-out"
  onClick={() => setGameMode("pvp")}
>
  Play with Friend
</button>

<button
  className="w-full sm:w-auto px-6 py-3 rounded-xl shadow-md
    bg-gradient-to-br from-green-200 via-green-500 to-green-600
    text-white
    hover:bg-gradient-to-br hover:from-green-700 hover:via-green-500 hover:to-green-200
    transition-all duration-300 ease-in-out"
  onClick={() => setGameMode("ai")}
>
  Play vs AI
</button>

      </div>
      <div className="p-4 bg-cyan-300/70 dark:bg-yellow-200 rounded-md text-black dark:text-white">

        <h2 className="text-lg text-center font-semibold mb-4 text-black dark:text-white">
          How to Play
        </h2>
        <ol className="list-decimal pl-6 leading-8 text-black dark:text-white">
          <li>Select unique emoji categories for each player.</li>
          <li>Players take turns placing emojis on a 3x3 grid.</li>
          <li>Only 3 emojis per player can exist on the board at a time.</li>
          <li>The oldest emoji vanishes if a fourth is placed.</li>
          <li>Win by aligning 3 emojis in a row.</li>
        </ol>
      </div>
    </div>
  );
};

export default ModeSelection;
