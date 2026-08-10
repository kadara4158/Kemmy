export type NavSection = 'home' | 'plan' | 'companion' | 'learn' | 'growth' | 'profile';

export type EnergyLevel = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  category: 'study' | 'project' | 'life' | 'wellness';
  estimatedMinutes: number;
  energyRequired: EnergyLevel;
  dueDate?: string;
  completed: boolean;
  isNextBestStep?: boolean;
}

export interface MoodEntry {
  id: string;
  timestamp: string;
  energyScore: number; // 1 to 5
  valenceScore: number; // 1 to 5
  note?: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  subject: string;
  progressPercent: number;
  nextConcept: string;
  estimatedMinutes: number;
}

export interface AIRecommendation {
  id: string;
  title: string;
  type: 'replan' | 'study_tip' | 'wellbeing';
  rationale: string; // 10 AI Principles: Explain recommendations
  suggestedAction: string;
  dismissed: boolean;
}
