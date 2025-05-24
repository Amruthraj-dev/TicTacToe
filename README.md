🧠 Blink Tac Toe
A twist on the classic Tic Tac Toe — now with emojis, vanishing moves, AI mode, and a fun, responsive interface built using React.js.



🚀 Live Demo
👉 Play Blink Tac Toe
📦 GitHub Repo

🛠️ Tech Stack
React.js

Tailwind CSS

Framer Motion (animations)

Confetti (celebration)

Custom game logic and state management using React hooks

🎮 Features
✅ Core Game Logic
3x3 board grid

2 modes:

Play with Friend (PvP)

Play vs AI (AI chooses randomly)

Turn-based play with alternating turns

Emoji categories selected by players (or AI auto-selects)

Vanishing Rule: Only 3 emojis allowed per player on board; oldest emoji disappears FIFO-style

Winning Logic: Line up 3 of your emojis to win

Winning message and Confetti Animation

Play Again and Back to Home options

🌈 Emoji Categories
Animals 🐶 🐱 🐵 🐰

Food 🍕 🍟 🍔 🍩

Sports ⚽ 🏀 🏈 🎾

Faces 😀 😂 😍 😎

Nature 🌞 🌊 🔥 ❄️

🎨 More can be added easily in the code.

💡 Vanishing Feature Implementation
Each player has a state-tracked array of emojis. On placing a 4th emoji:

The first one placed (based on index tracking) is removed

That cell becomes available again

This ensures only 3 emojis exist per player on the board.

⚙️ How AI Mode Works
Player 1 selects a category

AI auto-assigns a different one

After every Player 1 move, AI responds with a random valid move within 1 second

📱 Responsive Design
Fully responsive for both desktop and mobile using Tailwind’s responsive utilities.

📘 Help / Instructions (also shown in-app)
Select game mode

Choose emoji categories

Click a cell to place your emoji

Only 3 emojis stay on board per player

Line up 3 to win!

Have fun!

✨ Bonus Features Added
Dark mode toggle

Confetti celebration on win

Smooth emoji placement animation

AI category auto-selection

Responsive layout for all devices

Prevent same emoji category selection between players

Emoji pick UI with visual gradient feedback

⏳ What I'd Improve with More Time
Add a score tracker

Highlight the winning combination

Add sound effects for feedback

Online multiplayer mode with Firebase or WebSockets

Emoji animations (bounce, scale) on winning