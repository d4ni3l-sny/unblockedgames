import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { RecentlyPlayed } from './components/RecentlyPlayed';
import { AddGameModal } from './components/AddGameModal';
import { TabCloakModal } from './components/TabCloakModal';
import { DEFAULT_GAMES } from './data/defaultGames';
import { Gamepad2, SearchX, Plus, Zap } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);
  const [currentCloak, setCurrentCloak] = useState(null);

  // Favorites & History (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_favorites');
      return saved ? JSON.parse(saved) : ['2048', 'flappy-bird', 'tetris', 'space-invaders'];
    } catch {
      return ['2048', 'flappy-bird', 'tetris'];
    }
  });

  const [recentlyPlayedIds, setRecentlyPlayedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_recent');
      return saved ? JSON.parse(saved) : ['2048', 'tetris', 'cookie-clicker', 'crossy-runner'];
    } catch {
      return [];
    }
  });

  // Load games from games.json and merge with locally added custom games
  useEffect(() => {
    const fetchGames = async () => {
      let loadedGames = [];
      const jsonUrls = [
        `${import.meta.env.BASE_URL || './'}games.json`,
        './games.json',
        '/games.json'
      ];

      for (const url of jsonUrls) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              loadedGames = data;
              break;
            }
          }
        } catch {
          // try next URL
        }
      }

      if (loadedGames.length === 0) {
        loadedGames = DEFAULT_GAMES;
      }

      // Check localStorage for custom games
      try {
        const custom = localStorage.getItem('unblocked_custom_games');
        if (custom) {
          const parsedCustom = JSON.parse(custom);
          loadedGames = [...parsedCustom, ...loadedGames];
        }
      } catch (e) {
        console.error('Error reading custom games from storage', e);
      }

      setGames(loadedGames);
    };

    fetchGames();
  }, []);

  // Save favorites to storage
  useEffect(() => {
    try {
      localStorage.setItem('unblocked_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Save recent games to storage
  useEffect(() => {
    try {
      localStorage.setItem('unblocked_recent', JSON.stringify(recentlyPlayedIds));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyPlayedIds]);

  // Handle game select
  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setRecentlyPlayedIds(prev => {
      const filtered = prev.filter(id => id !== game.id);
      return [game.id, ...filtered].slice(0, 8);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle favorite
  const handleToggleFavorite = (e, gameId) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  // Random Game
  const handleRandomGame = () => {
    if (games.length === 0) return;
    const randomIndex = Math.floor(Math.random() * games.length);
    handleSelectGame(games[randomIndex]);
  };

  // Add Custom Game
  const handleAddGame = (newGame) => {
    setGames(prev => [newGame, ...prev]);
    try {
      const custom = localStorage.getItem('unblocked_custom_games');
      const parsed = custom ? JSON.parse(custom) : [];
      localStorage.setItem('unblocked_custom_games', JSON.stringify([newGame, ...parsed]));
    } catch (e) {
      console.error('Failed to persist custom game', e);
    }
    handleSelectGame(newGame);
  };

  // Tab Cloaking
  const handleApplyCloak = (preset) => {
    if (preset) {
      document.title = preset.title;
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = preset.favicon;
      setCurrentCloak(preset.id);
    } else {
      document.title = 'Unblocked Games Portal';
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2306b6d4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='20' height='12' x='2' y='6' rx='6'/><line x1='6' x2='10' y1='12' y2='12'/><line x1='8' x2='8' y1='10' y2='14'/><line x1='15' x2='15.01' y1='13' y2='13'/><line x1='18' x2='18.01' y1='11' y2='11'/></svg>";
      }
      setCurrentCloak(null);
    }
  };

  // Filtered games list
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        game.title.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        (game.tags && game.tags.some(t => t.toLowerCase().includes(query)));

      if (!matchesSearch) return false;

      // Category match
      if (activeCategory === 'All') return true;
      if (activeCategory === 'Popular') return game.badge === 'Popular' || game.badge === 'Hot' || (game.plays && game.plays > 15000);
      if (activeCategory === 'Favorites') return favorites.includes(game.id);
      return game.category.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [games, searchQuery, activeCategory, favorites]);

  // Counts by category
  const gamesCountByCat = useMemo(() => {
    const counts = {
      All: games.length,
      Popular: games.filter(g => g.badge === 'Popular' || g.badge === 'Hot' || (g.plays && g.plays > 15000)).length,
      Favorites: games.filter(g => favorites.includes(g.id)).length,
    };
    games.forEach(g => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return counts;
  }, [games, favorites]);

  // Recently played game objects
  const recentGames = useMemo(() => {
    return recentlyPlayedIds
      .map(id => games.find(g => g.id === id))
      .filter(Boolean);
  }, [recentlyPlayedIds, games]);

  // Related games for game player view
  const relatedGames = useMemo(() => {
    if (!selectedGame) return [];
    return games
      .filter(g => g.id !== selectedGame.id && (g.category === selectedGame.category || g.badge === 'Popular'))
      .slice(0, 6);
  }, [selectedGame, games]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onRandomGame={handleRandomGame}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        favoritesCount={favorites.length}
        totalGamesCount={games.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {selectedGame ? (
          /* Active Game View */
          <GamePlayer
            game={selectedGame}
            onBack={() => setSelectedGame(null)}
            isFavorite={favorites.includes(selectedGame.id)}
            onToggleFavorite={handleToggleFavorite}
            relatedGames={relatedGames}
            onSelectGame={handleSelectGame}
          />
        ) : (
          /* Catalog / Lobby View */
          <>
            {/* Quick Hero Banner (Compact & Functional) */}
            <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div className="max-w-xl space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>100% Client-Side • Fast Loading • No Downloads</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Free Unblocked HTML5 & Iframe Games
                </h1>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Play retro classics, puzzles, arcade action, and casual hits. All games run directly in your browser without tracking or bloat.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleRandomGame}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Play Random Game
                </button>
              </div>
            </div>

            {/* Recently Played Shelf */}
            {!searchQuery && activeCategory === 'All' && recentGames.length > 0 && (
              <RecentlyPlayed
                games={recentGames}
                onSelectGame={handleSelectGame}
              />
            )}

            {/* Category Navigation Pills */}
            <div className="mb-6">
              <CategoryBar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                gamesCountByCat={gamesCountByCat}
              />
            </div>

            {/* Section Heading with Game Count */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {searchQuery ? `Search results for "${searchQuery}"` : activeCategory === 'All' ? 'All Games' : `${activeCategory} Games`}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                  {filteredGames.length}
                </span>
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onSelect={handleSelectGame}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
                  <SearchX className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">No Games Found</h3>
                <p className="text-xs text-slate-400 mb-5 text-center leading-relaxed">
                  {searchQuery
                    ? `We couldn't find any games matching "${searchQuery}". Try a different keyword or add your own custom game!`
                    : activeCategory === 'Favorites'
                    ? "You haven't saved any games to your favorites yet. Click the heart icon on any game card!"
                    : 'No games available in this category yet.'}
                </p>
                <div className="flex gap-2">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      Clear Search
                    </button>
                  )}
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Add Custom Game
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/50 py-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">Unblocked Games Hub</span>
            <span>• Powered by JSON & HTML5 Iframes</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => setIsCloakModalOpen(true)} 
              className="hover:text-cyan-300 transition-colors"
            >
              Tab Cloaker
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsAddModalOpen(true)} 
              className="hover:text-cyan-300 transition-colors"
            >
              Add Game
            </button>
            <span>•</span>
            <button 
              onClick={handleRandomGame} 
              className="hover:text-cyan-300 transition-colors"
            >
              Surprise Me
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      <TabCloakModal
        isOpen={isCloakModalOpen}
        onClose={() => setIsCloakModalOpen(false)}
        currentCloak={currentCloak}
        onApplyCloak={handleApplyCloak}
      />
    </div>
  );
}
