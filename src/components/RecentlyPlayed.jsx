import React from 'react';
import { History, Play } from 'lucide-react';

export const RecentlyPlayed = ({
  games,
  onSelectGame,
}) => {
  if (!games || games.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3.5">
        <History className="w-4 h-4 text-cyan-400" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Recently Played
        </h2>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => onSelectGame(game)}
            className="flex items-center gap-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 p-2 pr-4 rounded-xl cursor-pointer transition-all duration-200 group shrink-0 w-56 shadow-sm"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-950 shrink-0">
              <img
                src={game.thumbnail}
                alt={game.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                {game.title}
              </h4>
              <span className="text-[11px] text-slate-400 block truncate">
                {game.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
