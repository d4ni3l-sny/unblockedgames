import React from 'react';
import { Play, Heart, Star } from 'lucide-react';

export const GameCard = ({
  game,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) => {
  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Hot':
        return 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-400/40';
      case 'Popular':
        return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/40';
      case 'Classic':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400/40';
      case 'Featured':
        return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div
      onClick={() => onSelect(game)}
      className="group relative bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer flex flex-col"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={game.thumbnail}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category & Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-slate-950/80 text-slate-300 backdrop-blur-md border border-slate-700/50">
            {game.category}
          </span>
          {game.badge && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg shadow-sm border ${getBadgeStyle(game.badge)}`}>
              {game.badge}
            </span>
          )}
          {game.isCustom && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg bg-purple-500/30 text-purple-200 border border-purple-400/40">
              Custom
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(e, game.id)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
            isFavorite
              ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/30'
              : 'bg-slate-950/70 hover:bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-700/40'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Play Icon Banner */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-[1px]">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-white text-sm tracking-tight line-clamp-1 group-hover:text-cyan-300 transition-colors">
              {game.title}
            </h3>
            {game.rating && (
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold shrink-0">
                <Star className="w-3 h-3 fill-current" />
                <span>{Number(game.rating).toFixed(1)}</span>
              </div>
            )}
          </div>

          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-2.5">
            {game.description}
          </p>
        </div>

        {/* Tags and Play Count Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {(game.tags || []).slice(0, 2).map((tag) => (
              <span key={tag} className="text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded text-[10px]">
                #{tag}
              </span>
            ))}
          </div>
          {game.plays ? (
            <span className="font-medium text-slate-400 shrink-0">
              {(game.plays > 1000 ? `${(game.plays / 1000).toFixed(1)}k` : game.plays)} plays
            </span>
          ) : (
            <span className="text-cyan-400 font-medium shrink-0">Play Now →</span>
          )}
        </div>
      </div>
    </div>
  );
};
