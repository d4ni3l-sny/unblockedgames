import React, { useState } from 'react';
import { X, ShieldCheck, Check, RefreshCw } from 'lucide-react';
import { TAB_CLOAK_PRESETS } from '../data/defaultGames';

export const TabCloakModal = ({
  isOpen,
  onClose,
  currentCloak,
  onApplyCloak,
}) => {
  const [customTitle, setCustomTitle] = useState('');
  const [customFavicon, setCustomFavicon] = useState('');

  if (!isOpen) return null;

  const handleCustomApply = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    onApplyCloak({
      id: 'custom',
      name: 'Custom',
      title: customTitle.trim(),
      favicon: customFavicon.trim() || 'https://www.google.com/favicon.ico'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white">Tab Cloaking / Disguise</h3>
              <p className="text-[11px] text-slate-400">Change your browser tab title and favicon to look like standard school/work tools.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Preset Buttons Grid */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2.5">Choose a Disguise Preset</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TAB_CLOAK_PRESETS.map((preset) => {
                const isActive = currentCloak === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onApplyCloak(preset);
                      onClose();
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-sm shadow-cyan-500/20'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <img
                      src={preset.favicon}
                      alt={preset.name}
                      className="w-5 h-5 rounded shrink-0 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate">{preset.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{preset.title.split('-')[0]}</div>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Cloak Form */}
          <form onSubmit={handleCustomApply} className="space-y-3 pt-3 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300">Or Set Custom Title & Icon</label>
            <input
              type="text"
              placeholder="Tab Title (e.g. My Document)"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
            <input
              type="url"
              placeholder="Favicon Image URL (optional)"
              value={customFavicon}
              onChange={(e) => setCustomFavicon(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
            >
              Apply Custom Cloak
            </button>
          </form>

          {/* Reset button */}
          <div className="pt-2 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                onApplyCloak(null);
                onClose();
              }}
              className="text-slate-400 hover:text-rose-400 flex items-center gap-1.5 font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Tab to Default
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-slate-300 bg-slate-800 hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
