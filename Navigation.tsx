import React from 'react';
import { NavSection } from '../../types';
import { NAV_ITEMS } from '../../constants/tokens';

interface NavigationProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection
}) => {
  return (
    <>
      {/* Desktop Navigation Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white min-h-[calc(100vh-65px)] p-4 space-y-2">
        <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-400 tracking-wider">
          Workspace Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-indigo-50 border border-indigo-200 text-indigo-900 font-semibold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="mt-0.5 text-base">
                {item.id === 'home' && '🏠'}
                {item.id === 'plan' && '📅'}
                {item.id === 'companion' && '🤖'}
                {item.id === 'learn' && '📚'}
                {item.id === 'growth' && '🌱'}
                {item.id === 'profile' && '👤'}
              </div>
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-gray-400 font-normal line-clamp-1">{item.description}</div>
              </div>
            </button>
          );
        })}

        <div className="mt-auto p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/60 text-xs text-gray-600">
          <div className="font-semibold text-indigo-900 mb-1">Kemmy Constitution</div>
          <p className="text-[11px] leading-relaxed text-gray-500">
            "Technology should adapt to people—not the other way around."
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Section 13 Bottom Navigation) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2 flex items-center justify-around">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs ${
                isActive ? 'text-indigo-600 font-semibold' : 'text-gray-500'
              }`}
            >
              <span className="text-lg">
                {item.id === 'home' && '🏠'}
                {item.id === 'plan' && '📅'}
                {item.id === 'companion' && '🤖'}
                {item.id === 'learn' && '📚'}
                {item.id === 'growth' && '🌱'}
              </span>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
