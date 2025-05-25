import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ModeSelection from "../Modeselection/Modeselection";
import CategorySelection from "../CategorySelection/CategorySelection";
import GameBoard from "../GameBoard/GameBoard";
import BlinkTacToeAI from "../AImode/BlinkTacToeAI";
import Confetti from "react-confetti";
import ScoreCard from "../ScoreCard/ScoreCard";

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

const BlinkTacToe = () => {
  const [playerCategories, setPlayerCategories] = useState([null, null]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerEmojis, setPlayerEmojis] = useState([[], []]);
  const [winner, setWinner] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [startGame, setStartGame] = useState(false);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const moveSound = useRef(null);
  const winSoundP1 = useRef(null);
  const winSoundP2 = useRef(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerEmojis([[], []]);
    setWinner(null);
    setCurrentPlayer(0);
    setPlayerCategories([null, null]);
    setGameMode(null);
    setStartGame(false);
    setScores({ player1: 0, player2: 0 });
  };

  const restartGameBoard = () => {
    setBoard(Array(9).fill(null));
    setPlayerEmojis([[], []]);
    setWinner(null);
    setCurrentPlayer(0);
  };

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

  const handleClick = (index) => {
    if (board[index] || winner || playerCategories.some((c) => !c)) return;

    moveSound.current?.play();

    const used = playerEmojis[currentPlayer].map((e) => e.emoji);
    const emoji = generateRandomEmoji(playerCategories[currentPlayer], used);

    const updatedBoard = [...board];
    const updatedEmojis = [...playerEmojis];
    const current = updatedEmojis[currentPlayer];

    if (current.length >= 3) {
      const removed = current.shift();
      if (removed.index === index) return;
      updatedBoard[removed.index] = null;
    }

    current.push({ index, emoji });
    updatedBoard[index] = { player: currentPlayer, emoji };
    setBoard(updatedBoard);
    setPlayerEmojis(updatedEmojis);

    if (checkWin(currentPlayer)) {
      if (currentPlayer === 0) {
        winSoundP1.current?.play();
        setScores((prev) => ({ ...prev, player1: prev.player1 + 1 }));
      } else {
        winSoundP2.current?.play();
        setScores((prev) => ({ ...prev, player2: prev.player2 + 1 }));
      }
      setWinner(currentPlayer + 1);
    } else {
      setCurrentPlayer(1 - currentPlayer);
    }
  };

  const exitToHome = () => {
    resetGame();
    setStartGame(false);
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <audio ref={moveSound} src="/move.mp3" preload="auto" />
      <audio ref={winSoundP1} src="/player1wins.mp3" preload="auto" />
      <audio ref={winSoundP2} src="/player2wins.mp3" preload="auto" />

      {winner !== null && (
        <Confetti
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
          colors={["#8b5cf6", "#a78bfa", "#7c3aed", "#c4b5fd"]}
        />
      )}

      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        showHelp={showHelp}
        toggleHelp={() => setShowHelp(!showHelp)}
        resetGame={resetGame}
      />

      <div className="flex flex-col items-center gap-8 p-6">
        {!gameMode && <ModeSelection setGameMode={setGameMode} />}

        {gameMode && !startGame && (
          <div className="flex flex-col items-center gap-6">
            <CategorySelection
              categories={categories}
              playerCategories={playerCategories}
              setPlayerCategories={setPlayerCategories}
              gameMode={gameMode}
            />
            {playerCategories[0] && playerCategories[1] && (
              <button
                onClick={() => setStartGame(true)}
                className="px-6 py-3 rounded text-white bg-gradient-to-r from-indigo-400 via-purple-500 to-violet-600 hover:from-violet-700 hover:via-purple-600 hover:to-indigo-500 transition-all duration-300 shadow-md mt-15"
              >
                Start Game
              </button>
            )}
          </div>
        )}

        {startGame && gameMode === "ai" && (
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex-1">
              <BlinkTacToeAI
                playerCategories={playerCategories}
                darkMode={darkMode}
                exitToHome={exitToHome}
              />
            </div>
            {/* No ScoreCard rendered in AI mode */}
          </div>
        )}

        {startGame && gameMode === "pvp" && (
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex-1">
              <GameBoard
                board={board}
                onCellClick={handleClick}
                playerCategories={playerCategories}
                currentPlayer={currentPlayer}
                winner={winner}
                restartGameBoard={restartGameBoard}
                exitToHome={exitToHome}
              />
            </div>
            <ScoreCard scores={scores} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlinkTacToe;
