import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodEntry } from '../types';

interface MoodContextType {
  currentEnergy: number; // 1 to 5
  currentValence: number; // 1 to 5
  moodHistory: MoodEntry[];
  recordCheckin: (energy: number, valence: number, note?: string) => void;
  getEnergyLabel: () => string;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEnergy, setCurrentEnergy] = useState<number>(3);
  const [currentValence, setCurrentValence] = useState<number>(4);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('kemmy_mood_history');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'm-1',
            timestamp: new Date().toISOString(),
            energyScore: 3,
            valenceScore: 4,
            note: 'Calm morning focus'
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem('kemmy_mood_history', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const recordCheckin = (energy: number, valence: number, note?: string) => {
    setCurrentEnergy(energy);
    setCurrentValence(valence);
    const entry: MoodEntry = {
      id: `m-${Date.now()}`,
      timestamp: new Date().toISOString(),
      energyScore: energy,
      valenceScore: valence,
      note
    };
    setMoodHistory((prev) => [entry, ...prev]);
  };

  const getEnergyLabel = () => {
    if (currentEnergy <= 2) return 'Low Energy (Rest Recommended)';
    if (currentEnergy === 3) return 'Balanced Focus (Optimal for Moderate Learning)';
    return 'Peak Energy (Optimal for Deep Work)';
  };

  return (
    <MoodContext.Provider
      value={{
        currentEnergy,
        currentValence,
        moodHistory,
        recordCheckin,
        getEnergyLabel
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) throw new Error('useMood must be used within a MoodProvider');
  return context;
};
