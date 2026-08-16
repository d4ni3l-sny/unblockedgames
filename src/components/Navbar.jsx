import React from 'react';
import { Gamepad2, Search, Shuffle, PlusCircle, ShieldCheck, Heart } from 'lucide-react';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onRandomGame,
  onOpenAddModal,
  onOpenCloakModal,
  favoritesCount,
  totalGamesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div 
          onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight">UNBLOCKED</span>
              <span className="text-xs px-1.5 py-0.5 font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md">
                Hub
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium -mt-0.5 hidden sm:inline">
              {totalGamesCount} Free Iframe Games
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search games, tags, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs bg-slate-800 px-1.5 py-0.5 rounded"
            >
              ESC
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Favorites quick toggle */}
          <button
            onClick={() => setActiveCategory(activeCategory === 'Favorites' ? 'All' : 'Favorites')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeCategory === 'Favorites'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/20'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
            }`}
            title="Saved Favorite Games"
          >
            <Heart className={`w-3.5 h-3.5 ${activeCategory === 'Favorites' ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
            <span className="hidden md:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="bg-rose-500/30 text-rose-300 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Random Game */}
          <button
            onClick={onRandomGame}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 transition-all shadow-sm"
            title="Play a random game"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Random</span>
          </button>

          {/* Add Game */}
          <button
            onClick={onOpenAddModal}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-all shadow-sm"
            title="Add Custom Iframe Game"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          {/* Tab Cloaker */}
          <button
            onClick={onOpenCloakModal}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
            title="Tab Cloak / Disguise Tab Title & Favicon"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Cloak Tab</span>
          </button>
        </div>
      </div>
    </header>
  );
};
