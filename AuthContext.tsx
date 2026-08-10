import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
  name: string;
  role: string;
  tier: 'Kemmy Baseline (Free)' | 'Kemmy Adaptive (Pro)';
  isJudgeDemoMode: boolean;
}

interface AuthContextType {
  user: UserProfile;
  toggleJudgeDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex',
    role: 'Adaptive Learner (Student & Professional)',
    tier: 'Kemmy Baseline (Free)',
    isJudgeDemoMode: true
  });

  const toggleJudgeDemoMode = () => {
    setUser((prev) => ({
      ...prev,
      isJudgeDemoMode: !prev.isJudgeDemoMode
    }));
  };

  return (
    <AuthContext.Provider value={{ user, toggleJudgeDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
