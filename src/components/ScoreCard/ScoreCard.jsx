
const ScoreCard = ({ scores }) => (
  <div className="w-full sm:w-56 md:w-48 lg:w-40 bg-indigo-100 dark:bg-gray-800 rounded-lg p-4 shadow h-40 sm:h-48 md:h-44 lg:h-40">
    <h2 className="text-lg font-bold text-center mb-4 text-white">Score Card</h2>
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium text-indigo-700 dark:text-indigo-300">Player 1</span>
      <span className="text-xl font-bold text-white">{scores.player1}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="font-medium text-purple-700 dark:text-purple-300">Player 2</span>
      <span className="text-xl font-bold text-white">{scores.player2}</span>
    </div>
  </div>
);

export default ScoreCard;
