import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, EnergyLevel } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  replanTasksForBurnout: () => void;
  nextBestStep: Task | null;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Read Kemmy Architecture Docs',
    category: 'study',
    estimatedMinutes: 15,
    energyRequired: 'low',
    completed: true
  },
  {
    id: 'task-2',
    title: 'Review React Hooks & Custom State Contexts',
    category: 'study',
    estimatedMinutes: 25,
    energyRequired: 'medium',
    completed: false,
    isNextBestStep: true
  },
  {
    id: 'task-3',
    title: 'Practice TypeScript Interface Design',
    category: 'project',
    estimatedMinutes: 45,
    energyRequired: 'high',
    completed: false
  }
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kemmy_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('kemmy_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      completed: false
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Free Baseline Constitutional Trigger: Dynamic Replanning ("I'm Overwhelmed")
  const replanTasksForBurnout = () => {
    setTasks((prev) =>
      prev
        .filter((t) => t.energyRequired !== 'high' || t.completed)
        .map((t) => ({ ...t, isNextBestStep: !t.completed }))
    );
  };

  const nextBestStep = tasks.find((t) => !t.completed && t.isNextBestStep) ||
    tasks.find((t) => !t.completed) || null;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        replanTasksForBurnout,
        nextBestStep
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
