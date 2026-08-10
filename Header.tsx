import React from 'react';

interface HeaderProps {
  onOverwhelmedClick?: () => void;
  activeSectionTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOverwhelmedClick,
  activeSectionTitle
}) => {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
          K
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 leading-none">Kemmy</h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              XPRIZE Baseline MVP
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{activeSectionTitle} • Adaptive AI Workspace</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Baseline Constitutional Free Feature: "I'm Overwhelmed" Trigger */}
        <button
          onClick={onOverwhelmedClick}
          className="btn-calm-secondary text-xs flex items-center gap-1.5 py-2 px-3"
          title="Free Baseline Constitutional Replanning Safety Trigger"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
          I'm Overwhelmed
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
          <span className="text-gray-400">Energy:</span>
          <span className="font-semibold text-teal-700">Balanced (3/5)</span>
        </div>
      </div>
    </header>
  );
};
