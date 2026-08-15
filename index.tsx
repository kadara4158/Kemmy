import React, { useState } from 'react';
import { CalmCard } from '../../components/common/CalmCard';
import { PlaceholderCard } from '../../components/common/PlaceholderCard';
import { NavSection, Task } from '../../types';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { useAI } from '../../context/AIContext';

interface HomePageProps {
  onNavigate: (section: NavSection) => void;
  onOpenAddTask: (taskToEdit?: Task, defaultDate?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAddTask }) => {
  const { user } = useAuth();
  const { tasks, toggleTask, nextBestStep, inferredState, expressNaturalState, clearInferredState, triggerChangeOfPlans } = useTasks();
  const { sendMessage } = useAI();

  const [stateInput, setStateInput] = useState('');
  const [isEditingState, setIsEditingState] = useState(false);

  const handleStateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stateInput.trim()) return;
    expressNaturalState(stateInput);
    setIsEditingState(false);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Sanctuary Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-emerald-900 text-white rounded-2xl p-6 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-300">
            Learner Sanctuary • Flexible Progress
          </span>
          <h2 className="text-2xl font-bold">Welcome back, {user.name}</h2>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed opacity-90">
            “Progress is measured by understanding, not exhaustion. Focus on one meaningful step at a time.”
          </p>
        </div>
      </div>

      {/* NATURAL STATE EXPRESSION INPUT (Section 2 of Brief) */}
      <CalmCard
        title="How are your circumstances feeling today?"
        subtitle="Express your current situation naturally — Kemmy adapts without forcing rigid mood labels."
      >
        {inferredState && !isEditingState ? (
          <div className="space-y-3">
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-950">
              <div>
                <span className="font-bold text-indigo-900 block text-[11px] uppercase tracking-wide">
                  Expressed Context:
                </span>
                <p className="text-sm font-medium text-indigo-900 mt-0.5">"{inferredState.rawText}"</p>
                <div className="text-[11px] text-indigo-700 mt-1">
                  Kemmy Inferred Working Context: <span className="font-semibold">{inferredState.perceivedFocus}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingState(true)}
                  className="text-xs font-semibold text-indigo-700 hover:underline px-2.5 py-1 rounded bg-white/70 border border-indigo-200"
                >
                  Clarify / Update
                </button>
                <button
                  onClick={clearInferredState}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleStateSubmit} className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={stateInput}
                onChange={(e) => setStateInput(e.target.value)}
                placeholder='e.g. "I have no energy today but I still need to finish two assignments"'
                className="flex-1 px-4 py-2.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-500 text-[var(--color-text-primary)]"
              />
              <button type="submit" className="btn-calm-primary text-xs py-2.5 px-4">
                Share Context
              </button>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)]">
              *Kemmy uses this signal to tailor recommendations without turning your internal state into a permanent label.
            </p>
          </form>
        )}
      </CalmCard>

      {/* SINGLE NEXT BEST STEP CARD (Section 15: The Next Step Is Always Visible) */}
      {nextBestStep ? (
        <CalmCard isHighlight title="Today's Single Next Best Step" subtitle="Selected to minimize choice paralysis based on your current context">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-900 uppercase">
                  {nextBestStep.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">• {nextBestStep.estimatedMinutes} mins</span>
                <span className="text-xs font-medium text-emerald-700 capitalize">• {nextBestStep.energyRequired} Energy</span>
              </div>
              <h4 className="text-lg font-bold text-[var(--color-text-primary)]">{nextBestStep.title}</h4>
              {nextBestStep.notes && (
                <p className="text-xs text-[var(--color-text-muted)]">{nextBestStep.notes}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('learn')}
                className="btn-calm-primary text-xs py-2.5 px-5 shadow-sm"
              >
                Start {nextBestStep.estimatedMinutes}m Focus Block
              </button>
            </div>
          </div>
        </CalmCard>
      ) : (
        <CalmCard isHighlight title="All Tasks Completed!">
          <p className="text-xs text-[var(--color-text-muted)]">Great effort today! Rest and reflect freely.</p>
        </CalmCard>
      )}

      {/* Today's Priorities Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CalmCard
          title="Today's Manageable Priorities"
          subtitle={`${tasks.filter((t) => !t.completed).length} of ${tasks.length} focus blocks remaining`}
          headerAction={
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAddTask()}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                + Add Plan
              </button>
              <button
                onClick={() => onNavigate('plan')}
                className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                Calendar View →
              </button>
            </div>
          }
        >
          <div className="space-y-3 mt-1">
            {tasks.map((t) => (
              <div
                key={t.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  t.isNextBestStep
                    ? 'bg-indigo-50/50 border-indigo-200'
                    : 'bg-[var(--color-bg)] border-[var(--color-border)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                  <div>
                    <div className={`text-sm font-medium ${t.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>
                      {t.title}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">{t.estimatedMinutes} mins • {t.energyRequired} Energy</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAddTask(t)}
                    className="text-[11px] text-[var(--color-text-muted)] hover:text-indigo-600"
                  >
                    Edit
                  </button>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${
                      t.completed
                        ? 'bg-emerald-50 text-emerald-700'
                        : t.isNextBestStep
                        ? 'bg-indigo-100 text-indigo-900 font-semibold'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                    }`}
                  >
                    {t.completed ? 'Completed' : t.isNextBestStep ? 'Next Best Step' : 'Scheduled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CalmCard>

        {/* Change of Plans Quick Action & Adaptive AI Widget */}
        <CalmCard title="Adaptive Schedule Guidance">
          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                🌿 Change of Plans Assistant
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold">Explainable AI</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              "If your circumstances change or energy shifts, Kemmy adapts your workload without penalties or judgment."
            </p>
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => triggerChangeOfPlans()}
                className="btn-calm-secondary text-xs py-1.5 px-3"
              >
                Trigger Replanner
              </button>
              <button
                onClick={() => {
                  sendMessage("How can I adjust my schedule for today?");
                  onNavigate('companion');
                }}
                className="text-xs font-medium text-emerald-800 hover:underline"
              >
                Ask Kemmy Companion →
              </button>
            </div>
          </div>
        </CalmCard>
      </div>

      {/* Explicit Roadmap Placeholder */}
      <PlaceholderCard
        title="Predictive Energy-Pattern Forecaster"
        roadmapPhase="Phase 4 — Intelligent Guidance"
        description="Will analyze historical energy trends to proactively suggest schedule adjustments before fatigue occurs."
        intendedCapability="Connects biometric or self-reported energy patterns over time to dynamically shift deadlines prior to burnout."
      />
    </div>
  );
};
