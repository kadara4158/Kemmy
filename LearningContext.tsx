import React, { createContext, useContext, useState } from 'react';
import { LearningTopic } from '../types';

interface LearningContextType {
  topics: LearningTopic[];
  activeTopicId: string | null;
  setActiveTopicId: (id: string) => void;
  markConceptCompleted: (topicId: string) => void;
}

const INITIAL_TOPICS: LearningTopic[] = [
  {
    id: 'react-hooks',
    title: 'React Hooks & State Architecture',
    subject: 'Frontend Dev',
    progressPercent: 65,
    nextConcept: 'Custom Hook abstraction and Context providers',
    estimatedMinutes: 15
  },
  {
    id: 'ts-types',
    title: 'TypeScript Generics & Interfaces',
    subject: 'Software Eng',
    progressPercent: 40,
    nextConcept: 'Generic constraint bounds & discriminated unions',
    estimatedMinutes: 20
  },
  {
    id: 'calm-ux',
    title: 'Calm UX & Inclusive Product Design',
    subject: 'Product Design',
    progressPercent: 90,
    nextConcept: 'Reducing cognitive burden & zero-pressure UI',
    estimatedMinutes: 10
  }
];

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<LearningTopic[]>(INITIAL_TOPICS);
  const [activeTopicId, setActiveTopicId] = useState<string | null>('react-hooks');

  const markConceptCompleted = (topicId: string) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? { ...t, progressPercent: Math.min(100, t.progressPercent + 20) }
          : t
      )
    );
  };

  return (
    <LearningContext.Provider
      value={{
        topics,
        activeTopicId,
        setActiveTopicId,
        markConceptCompleted
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) throw new Error('useLearning must be used within a LearningProvider');
  return context;
};
