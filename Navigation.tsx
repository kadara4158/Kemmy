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
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)] min-h-[calc(100vh-65px)] p-4 space-y-2 transition-colors">
        <div className="px-3 py-2 text-[11px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider">
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
                  ? 'bg-indigo-50/70 border border-indigo-200 text-indigo-950 font-semibold shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]'
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
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-xs font-normal opacity-75 line-clamp-1">{item.description}</div>
              </div>
            </button>
          );
        })}

        <div className="mt-auto p-4 bg-indigo-50/40 rounded-xl border border-indigo-100/60 text-xs text-[var(--color-text-muted)]">
          <div className="font-bold text-indigo-950 mb-1">Kemmy Constitution</div>
          <p className="text-[11px] leading-relaxed opacity-85">
            "Technology should adapt to people—not the other way around."
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-header-bg)] backdrop-blur-md border-t border-[var(--color-border)] px-2 py-2 flex items-center justify-around">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs ${
                isActive ? 'text-[var(--color-primary)] font-semibold' : 'text-[var(--color-text-muted)]'
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
