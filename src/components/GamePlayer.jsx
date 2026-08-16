import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  ExternalLink, 
  Heart, 
  Share2, 
  Info, 
  Gamepad, 
  Star, 
  Sparkles,
  Tv,
  Check
} from 'lucide-react';

export const GamePlayer = ({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  relatedGames = [],
  onSelectGame,
}) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcut for Escape or F
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) {
          toggleFullscreen();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error("Fullscreen request failed", err);
      });
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const getResolvedUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    try {
      const base = window.location.origin + window.location.pathname;
      const dirBase = base.endsWith('/') ? base : base.substring(0, base.lastIndexOf('/') + 1);
      return new URL(url.replace(/^\.\//, ''), dirBase).href;
    } catch {
      return url;
    }
  };

  const handleOpenBlankTab = () => {
    // Open in about:blank for unblocked stealth play
    try {
      const targetUrl = getResolvedUrl(game.iframeUrl);
      const win = window.open('about:blank', '_blank');
      if (win) {
        win.document.title = game.title;
        const iframe = win.document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.inset = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.src = targetUrl;
        iframe.allow = "autoplay; fullscreen; gamepad";
        win.document.body.style.margin = '0';
        win.document.body.style.overflow = 'hidden';
        win.document.body.appendChild(iframe);
      }
    } catch (err) {
      console.error('Failed to open stealth tab', err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full pb-16 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700/80 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onToggleFavorite(e, game.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`} />
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            title="Copy Page Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Game Stage Container */}
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isTheater ? 'max-w-full' : 'max-w-6xl'}`}>
        <div
          ref={containerRef}
          className={`relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl ${
            isFullscreen ? 'w-screen h-screen rounded-none border-0' : 'w-full'
          }`}
        >
          {/* Iframe Viewport */}
          <div className={`relative w-full bg-slate-950 ${isFullscreen ? 'h-screen' : (isTheater ? 'h-[78vh]' : 'aspect-video min-h-[420px] max-h-[720px]')}`}>
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 text-cyan-400 gap-3 z-20">
                <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Loading Game...</span>
              </div>
            )}

            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={getResolvedUrl(game.iframeUrl)}
              title={game.title}
              onLoad={() => setIsLoading(false)}
              allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
              className="w-full h-full border-0 bg-transparent block"
              tabIndex={0}
            />
          </div>

          {/* Player Toolbar (Bottom overlay) */}
          <div className="bg-slate-900/95 border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-between gap-3 text-slate-300">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                {game.title}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                {game.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Reload Button */}
              <button
                onClick={handleReload}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Restart / Reload Game"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Theater Mode Button */}
              <button
                onClick={() => setIsTheater(!isTheater)}
                className={`p-2 rounded-lg transition-colors hidden sm:block ${
                  isTheater ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Theater Mode"
              >
                <Tv className="w-4 h-4" />
              </button>

              {/* Open in Blank Tab */}
              <button
                onClick={handleOpenBlankTab}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Open in Stealth Blank Tab (about:blank)"
              >
                <ExternalLink className="w-4 h-4" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-colors shadow-sm"
                title="Fullscreen (or press F)"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Game Details & Controls Box */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls & Description */}
          <div className="lg:col-span-2 space-y-5">
            {/* Description Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                About {game.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {game.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                {(game.tags || []).map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Controls Guide */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Gamepad className="w-4 h-4 text-cyan-400" />
                Game Controls
              </h2>
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                  <Gamepad className="w-5 h-5" />
                </div>
                <div className="text-sm font-medium text-slate-200">
                  {game.controls}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info & More Games */}
          <div className="space-y-5">
            {/* Quick Game Stats */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">Game Information</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Category</span>
                  <span className="font-semibold text-white">{game.category}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Rating</span>
                  <span className="font-semibold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {game.rating ? Number(game.rating).toFixed(1) : '4.8'} / 5.0
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Total Plays</span>
                  <span className="font-semibold text-white">
                    {game.plays ? game.plays.toLocaleString() : '10,000+'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Status</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Unblocked & Online
                  </span>
                </div>
              </div>
            </div>

            {/* Recommended Games */}
            {relatedGames.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  You May Also Like
                </h3>
                <div className="space-y-2.5">
                  {relatedGames.slice(0, 4).map(rg => (
                    <div
                      key={rg.id}
                      onClick={() => onSelectGame(rg)}
                      className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-colors group"
                    >
                      <img
                        src={rg.thumbnail}
                        alt={rg.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                          {rg.title}
                        </h4>
                        <span className="text-[11px] text-slate-400">{rg.category}</span>
                      </div>
                      <span className="text-xs text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
