import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Navbar = ({ darkMode, toggleDarkMode, resetGame }) => {
  return (
    <div className="w-full relative flex items-center justify-center px-4 py-4 shadow-md backdrop-blur-md bg-white/30 dark:bg-black/20 transition-all duration-500">
     
      <div
  className="absolute left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl font-bold cursor-pointer 
             bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 
             text-transparent bg-clip-text
             hover:from-purple-600 hover:via-pink-500 hover:to-amber-400
             transition-all"
  onClick={resetGame}
  title="Back to Home"
>
  Blink Tac Toe
</div>

    
      <div className="ml-auto flex items-center">
        <div className="border-2 border-gray-300 dark:border-gray-500 rounded-full px-3 py-1">
          <DarkModeSwitch
            checked={darkMode}
            onChange={toggleDarkMode}
            size={28}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
