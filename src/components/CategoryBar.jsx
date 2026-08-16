import React from 'react';
import { Flame, Sparkles, Swords, Trophy, Blocks, Target, Brain, Coffee, Heart } from 'lucide-react';

const CATEGORIES = [
  { label: 'All', icon: Sparkles },
  { label: 'Popular', icon: Flame },
  { label: 'Action', icon: Swords },
  { label: 'Arcade', icon: Trophy },
  { label: 'Puzzle', icon: Blocks },
  { label: 'Sports', icon: Target },
  { label: 'Strategy', icon: Brain },
  { label: 'Casual', icon: Coffee },
  { label: 'Favorites', icon: Heart },
];

export const CategoryBar = ({
  activeCategory,
  setActiveCategory,
  gamesCountByCat = {},
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2.5 px-1 scrollbar-none no-scrollbar">
      {CATEGORIES.map(({ label, icon: Icon }) => {
        const isActive = activeCategory === label;
        const count = gamesCountByCat[label] || 0;

        return (
          <button
            key={label}
            onClick={() => setActiveCategory(label)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 border ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20 scale-[1.02]'
                : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span>{label}</span>
            {count > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
