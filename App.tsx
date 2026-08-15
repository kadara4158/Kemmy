import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { MoodProvider } from './context/MoodContext';
import { LearningProvider } from './context/LearningContext';
import { AIProvider } from './context/AIContext';
import { AppShell } from './components/common/AppShell';
import { HomePage } from './pages/Home';
import { PlanPage } from './pages/Plan';
import { CompanionPage } from './pages/Companion';
import { LearnPage } from './pages/Learn';
import { GrowthPage } from './pages/Growth';
import { ProfilePage } from './pages/Profile';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <MoodProvider>
          <LearningProvider>
            <AIProvider>
              <AppShell>
                {(activeSection, onNavigate, onOpenAddTask) => {
                  switch (activeSection) {
                    case 'home':
                      return <HomePage onNavigate={onNavigate} onOpenAddTask={onOpenAddTask} />;
                    case 'plan':
                      return <PlanPage onOpenAddTask={onOpenAddTask} />;
                    case 'companion':
                      return <CompanionPage />;
                    case 'learn':
                      return <LearnPage />;
                    case 'growth':
                      return <GrowthPage />;
                    case 'profile':
                      return <ProfilePage />;
                    default:
                      return <HomePage onNavigate={onNavigate} onOpenAddTask={onOpenAddTask} />;
                  }
                }}
              </AppShell>
            </AIProvider>
          </LearningProvider>
        </MoodProvider>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
