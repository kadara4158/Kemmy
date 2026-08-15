import React, { useState } from 'react';
import { NavSection, Task } from '../../types';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { NAV_ITEMS } from '../../constants/tokens';
import { ChangeOfPlansModal } from './ChangeOfPlansModal';
import { AuthModal } from './AuthModal';
import { AddTaskModal } from './AddTaskModal';

interface AppShellProps {
  children: (
    activeSection: NavSection,
    onNavigate: (s: NavSection) => void,
    onOpenAddTask: (taskToEdit?: Task, defaultDate?: string) => void
  ) => React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [showChangeOfPlansModal, setShowChangeOfPlansModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Add/Edit Task Modal state
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskDefaultDate, setTaskDefaultDate] = useState<string | undefined>(undefined);

  const handleOpenAddTask = (taskToEdit?: Task, defaultDate?: string) => {
    setEditingTask(taskToEdit || null);
    setTaskDefaultDate(defaultDate);
    setShowAddTaskModal(true);
  };

  const activeDef = NAV_ITEMS.find((n) => n.id === activeSection) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col font-sans transition-colors duration-300">
      <Header
        activeSectionTitle={activeDef.label}
        onChangeOfPlansClick={() => setShowChangeOfPlansModal(true)}
        onOpenAuthModal={() => setShowAuthModal(true)}
      />

      <div className="flex flex-1">
        <Navigation
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto pb-24 md:pb-8 w-full">
          {children(activeSection, setActiveSection, handleOpenAddTask)}
        </main>
      </div>

      {/* Change of Plans Replanning Wizard Modal */}
      <ChangeOfPlansModal
        isOpen={showChangeOfPlansModal}
        onClose={() => setShowChangeOfPlansModal(false)}
      />

      {/* Auth / Account Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Add / Edit Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        editingTask={editingTask}
        defaultDate={taskDefaultDate}
      />
    </div>
  );
};
