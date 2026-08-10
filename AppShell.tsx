import React, { useState } from 'react';
import { NavSection } from '../../types';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { NAV_ITEMS } from '../../constants/tokens';

interface AppShellProps {
  children: (activeSection: NavSection, onSelectSection: (s: NavSection) => void) => React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [showOverwhelmedModal, setShowOverwhelmedModal] = useState(false);

  const activeDef = NAV_ITEMS.find((n) => n.id === activeSection) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col font-sans">
      <Header
        activeSectionTitle={activeDef.label}
        onOverwhelmedClick={() => setShowOverwhelmedModal(true)}
      />

      <div className="flex flex-1">
        <Navigation
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto pb-24 md:pb-8 w-full">
          {children(activeSection, setActiveSection)}
        </main>
      </div>

      {/* Free Baseline "I'm Overwhelmed" Dynamic Replanning Modal */}
      {showOverwhelmedModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-teal-100">
            <div className="flex items-center gap-3 text-teal-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-xl">
                🌿
              </div>
              <h3 className="text-lg font-bold text-gray-900">Dynamic Replanning</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Take a breath. Kemmy’s free baseline safety tool will rebalance your schedule, move non-urgent items to tomorrow, and lower your daily target—with zero guilt or lost streaks.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowOverwhelmedModal(false)}
                className="px-4 py-2 text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowOverwhelmedModal(false);
                  setActiveSection('plan');
                }}
                className="btn-calm-secondary text-xs py-2 px-4"
              >
                Rebalance My Day
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
