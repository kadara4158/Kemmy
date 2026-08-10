import React, { createContext, useContext, useState } from 'react';
import { AIRecommendation } from '../types';

interface Message {
  sender: 'user' | 'kemmy';
  text: string;
  explanation?: string;
}

interface AIContextType {
  messages: Message[];
  recommendations: AIRecommendation[];
  sendMessage: (text: string) => void;
  dismissRecommendation: (id: string) => void;
  isThinking: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'kemmy',
      text: "Hello Alex. I'm Kemmy, your adaptive learning companion. How are your study sessions feeling today?",
      explanation: "Understand Before Advising: Kemmy opens by inquiring about context before offering advice."
    }
  ]);

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([
    {
      id: 'rec-1',
      title: 'Energy Balance Adjustment',
      type: 'replan',
      rationale: 'Energy peak detected between 10 AM - 12 PM. Heavy study placed in high-focus window.',
      suggestedAction: 'Start 25m Focus Block',
      dismissed: false
    }
  ]);

  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    setTimeout(() => {
      let responseText = "I understand how balancing studies with other responsibilities can feel demanding. Let's break your task into a tiny 15-minute concept review so you can make progress without feeling rushed.";
      let explanationStr = "Reduce Cognitive Load & Encourage Sustainable Progress: Kemmy breaks down complexity into a single next step and respects learner agency.";

      if (text.toLowerCase().includes('overwhelmed') || text.toLowerCase().includes('burnout')) {
        responseText = "Take a breath. I've rebalanced your schedule to postpone high-energy items to tomorrow. Your baseline focus block is now just 15 minutes. Zero guilt, zero lost streaks.";
        explanationStr = "Be Calm by Default & Respect Context: Kemmy protects wellness and eliminates artificial pressure.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'kemmy',
          text: responseText,
          explanation: explanationStr
        }
      ]);
      setIsThinking(false);
    }, 700);
  };

  const dismissRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, dismissed: true } : r))
    );
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        recommendations,
        sendMessage,
        dismissRecommendation,
        isThinking
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within an AIProvider');
  return context;
};
