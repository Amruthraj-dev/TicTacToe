import React from "react";

const CategorySelection = ({
  categories,
  playerCategories,
  setPlayerCategories,
  gameMode,
}) => {
  const handleCategorySelect = (category, playerIndex) => {
    if (gameMode === "ai" && playerIndex === 0) {
      const remaining = Object.keys(categories).filter((cat) => cat !== category);
      const aiCategory = remaining[Math.floor(Math.random() * remaining.length)];
      setPlayerCategories([category, aiCategory]);
    } else {
      const updated = [...playerCategories];
      updated[playerIndex] = category;
      setPlayerCategories(updated);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-purple-700 dark:text-purple-300">
        {gameMode === "ai"
          ? "Choose Your Emoji Category"
          : "Choose Emoji Categories for Both Players"}
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 w-full justify-center">
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <p className="text-lg sm:text-xl font-semibold text-red-500 dark:text-red-400">
            Player 1
          </p>
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category, 0)}
                className={`px-5 py-2.5 rounded-lg text-white text-base font-medium shadow-md transition-all duration-300
                  ${
                    playerCategories[0] === category
                      ? "bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-600"
                      : "bg-purple-400 hover:bg-purple-500"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {gameMode !== "ai" && (
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <p className="text-lg sm:text-xl font-semibold text-red-500 dark:text-red-400">
              Player 2
            </p>
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {Object.keys(categories)
                .filter((category) => category !== playerCategories[0])
                .map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category, 1)}
                    className={`px-5 py-2.5 rounded-lg text-white text-base font-medium shadow-md transition-all duration-300
                      ${
                        playerCategories[1] === category
                          ? "bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-500"
                          : "bg-blue-400 hover:bg-blue-500"
                      }`}
                  >
                    {category}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {gameMode === "ai" && playerCategories[1] && (
        <div className="mt-4 text-center text-base text-gray-600 dark:text-gray-300">
          🤖 AI picked:{" "}
          <span className="text-green-600 dark:text-green-400 font-semibold">
            {playerCategories[1]}
          </span>
        </div>
      )}
    </div>
  );
};

export default CategorySelection;
