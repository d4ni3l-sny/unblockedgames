export const DEFAULT_GAMES = [
  {
    id: "2048",
    title: "2048",
    category: "Puzzle",
    iframeUrl: "/games/2048.html",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
    description: "Join the numbers and get to the 2048 tile! Swipe or use arrow keys to combine identical numbers.",
    controls: "Arrow keys or Swipe to move tiles",
    tags: ["Puzzle", "Math", "Classic", "Brain"],
    badge: "Popular",
    plays: 14200,
    rating: 4.8
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    category: "Arcade",
    iframeUrl: "/games/flappy.html",
    thumbnail: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&auto=format&fit=crop&q=80",
    description: "Navigate the bird through green pipes by flapping wings. Don't touch the ground or obstacles!",
    controls: "Spacebar, Click, or Tap to flap",
    tags: ["Arcade", "Retro", "Endless", "Skill"],
    badge: "Hot",
    plays: 28400,
    rating: 4.7
  },
  {
    id: "tetris",
    title: "Tetris Blocks",
    category: "Puzzle",
    iframeUrl: "/games/tetris.html",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
    description: "Stack falling tetromino pieces to clear rows and score high. Manage line clears and block queues.",
    controls: "Arrow keys: Left/Right to move, Up to rotate, Down for soft drop, Space for hard drop",
    tags: ["Puzzle", "Retro", "Blocks", "Classic"],
    badge: "Classic",
    plays: 39100,
    rating: 4.9
  },
  {
    id: "retro-snake",
    title: "Retro Snake",
    category: "Arcade",
    iframeUrl: "/games/snake.html",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80",
    description: "Control the hungry snake, eat fruit to grow longer, and avoid crashing into borders or your own tail.",
    controls: "Arrow keys or WASD to change direction",
    tags: ["Arcade", "Classic", "Retro", "Casual"],
    badge: "Classic",
    plays: 21300,
    rating: 4.6
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    category: "Action",
    iframeUrl: "/games/spaceinvaders.html",
    thumbnail: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop&q=80",
    description: "Defend the planet against descending alien armadas! Dodge enemy lasers and blast through defensive bunkers.",
    controls: "Arrow keys to move, Space to fire lasers",
    tags: ["Action", "Shooter", "Retro", "Arcade"],
    badge: "Popular",
    plays: 18700,
    rating: 4.8
  },
  {
    id: "breakout",
    title: "Brick Breakout",
    category: "Arcade",
    iframeUrl: "/games/breakout.html",
    thumbnail: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&auto=format&fit=crop&q=80",
    description: "Smash bricks using your paddle and bouncing balls. Catch power-ups for multi-ball, laser pads, and wide paddle.",
    controls: "Mouse or Left/Right Arrow keys to move paddle",
    tags: ["Arcade", "Physics", "Classic", "Casual"],
    badge: "Hot",
    plays: 16900,
    rating: 4.7
  },
  {
    id: "asteroids",
    title: "Asteroids Blast",
    category: "Action",
    iframeUrl: "/games/asteroids.html",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80",
    description: "Pilot your spaceship through deep space asteroid fields. Blast space rocks into fragments with high-energy cannons.",
    controls: "Up Arrow / W to Thrust, Left/Right or A/D to Rotate, Space to Shoot",
    tags: ["Action", "Sci-Fi", "Space", "Shooter"],
    badge: "Featured",
    plays: 15200,
    rating: 4.8
  },
  {
    id: "dino-runner",
    title: "T-Rex Dino Runner",
    category: "Arcade",
    iframeUrl: "/games/dino.html",
    thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80",
    description: "The offline dinosaur runner! Leap over desert cacti and duck under flying pterodactyls.",
    controls: "Space or Up Arrow to jump, Down Arrow to duck",
    tags: ["Arcade", "Runner", "Endless", "Casual"],
    badge: "Popular",
    plays: 31200,
    rating: 4.9
  },
  {
    id: "minesweeper",
    title: "Minesweeper Pro",
    category: "Puzzle",
    iframeUrl: "/games/minesweeper.html",
    thumbnail: "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=400&auto=format&fit=crop&q=80",
    description: "Clear the minefield without detonating any hidden bombs. Use numerical hints to deduce explosive locations.",
    controls: "Left click to reveal, Right click to place flag, Long press on mobile",
    tags: ["Puzzle", "Logic", "Strategy", "Classic"],
    badge: "Classic",
    plays: 12800,
    rating: 4.7
  },
  {
    id: "pacman",
    title: "Pac-Maze Classic",
    category: "Arcade",
    iframeUrl: "/games/pacman.html",
    thumbnail: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&auto=format&fit=crop&q=80",
    description: "Chomp through the maze, eat all power pellets, and avoid the colorful ghosts.",
    controls: "Arrow keys or WASD to navigate maze",
    tags: ["Arcade", "Retro", "Maze", "Classic"],
    badge: "Hot",
    plays: 26500,
    rating: 4.9
  },
  {
    id: "pong",
    title: "Retro Pong Arena",
    category: "Sports",
    iframeUrl: "/games/pong.html",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80",
    description: "The legendary original table tennis video game! Play against responsive AI or grab a friend for 2-Player duels.",
    controls: "Player 1: W/S or Up/Down arrows | Player 2: Up/Down arrows (in 2P mode)",
    tags: ["Sports", "Retro", "2-Player", "Arcade"],
    badge: "Classic",
    plays: 9400,
    rating: 4.5
  },
  {
    id: "hextris",
    title: "Hextris",
    category: "Puzzle",
    iframeUrl: "/games/hextris.html",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80",
    description: "Fast-paced hexagonal puzzle game inspired by Tetris! Rotate the hexagon to connect 3 or more blocks of the same color.",
    controls: "Left / Right arrow keys or A / D to rotate hexagon",
    tags: ["Puzzle", "Hexagonal", "Fast", "Brain"],
    badge: "Popular",
    plays: 17800,
    rating: 4.8
  },
  {
    id: "cookie-clicker",
    title: "Cookie Empire Clicker",
    category: "Casual",
    iframeUrl: "/games/cookieclicker.html",
    thumbnail: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&auto=format&fit=crop&q=80",
    description: "Bake billions of cookies! Hire grandmas, construct factories, and build quantum bakeries in this addictive idle clicker.",
    controls: "Left Click to bake and purchase upgrades",
    tags: ["Casual", "Idle", "Clicker", "Upgrades"],
    badge: "Hot",
    plays: 41200,
    rating: 4.9
  },
  {
    id: "connect4",
    title: "Connect 4 Master",
    category: "Strategy",
    iframeUrl: "/games/connect4.html",
    thumbnail: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&auto=format&fit=crop&q=80",
    description: "Drop discs into the 7x6 vertical grid. Be the first to connect 4 of your colored chips horizontally, vertically, or diagonally.",
    controls: "Click or Tap on column to drop token",
    tags: ["Strategy", "Board", "2-Player", "Logic"],
    badge: "Featured",
    plays: 11400,
    rating: 4.6
  },
  {
    id: "sudoku",
    title: "Daily Sudoku Master",
    category: "Puzzle",
    iframeUrl: "/games/sudoku.html",
    thumbnail: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&auto=format&fit=crop&q=80",
    description: "Fill the 9x9 grid with numbers 1 to 9 so that each column, row, and 3x3 section contains all digits.",
    controls: "Click cell and type 1-9 or click number buttons",
    tags: ["Puzzle", "Math", "Logic", "Brain"],
    badge: "Featured",
    plays: 13900,
    rating: 4.7
  },
  {
    id: "crossy-runner",
    title: "Crossy Highway",
    category: "Arcade",
    iframeUrl: "/games/crossyroad.html",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80",
    description: "Cross endless busy highways, raging rivers with floating logs, and train tracks without getting squished!",
    controls: "Arrow keys or WASD / Swipe to hop forward, back, left, right",
    tags: ["Arcade", "Runner", "Dodging", "Fun"],
    badge: "Hot",
    plays: 22100,
    rating: 4.8
  }
];

export const TAB_CLOAK_PRESETS = [
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes - Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  {
    id: 'desmos',
    name: 'Desmos Calculator',
    title: 'Desmos | Graphing Calculator',
    favicon: 'https://www.desmos.com/favicon.ico'
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  }
];
