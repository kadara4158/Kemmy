import React from 'react';
import { useTasks } from '../../context/TaskContext';

interface ChangeOfPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeOfPlansModal: React.FC<ChangeOfPlansModalProps> = ({ isOpen, onClose }) => {
  const {
    activePlanAdaptation,
    triggerChangeOfPlans,
    acceptPlanAdaptation,
    declinePlanAdaptation,
    inferredState
  } = useTasks();

  if (!isOpen) return null;

  const adaptation = activePlanAdaptation || triggerChangeOfPlans();

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[var(--color-surface)] rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[var(--color-border)] space-y-4">
        <div className="flex items-center gap-3 text-indigo-900">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl">
            🌿
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Change of Plans</h3>
            <p className="text-xs text-[var(--color-text-muted)]">Adaptive Schedule Rebalancer</p>
          </div>
        </div>

        {inferredState && (
          <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-950">
            <span className="font-semibold block text-[11px] uppercase text-indigo-800">Your Expressed State:</span>
            "{inferredState.rawText}"
          </div>
        )}

        <div className="space-y-3 text-xs text-[var(--color-text-primary)] leading-relaxed">
          <p className="p-3 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)]">
            {adaptation.reasoning}
          </p>

          <div className="space-y-1.5 p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl text-emerald-950">
            <div className="font-semibold text-emerald-900">Proposed Adjustments:</div>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li>Single focus block: <strong>{adaptation.recommendedFocusTitle}</strong></li>
              {adaptation.postponedTaskTitles.length > 0 && (
                <li>Rescheduling to tomorrow: {adaptation.postponedTaskTitles.join(', ')}</li>
              )}
              <li>Zero lost streaks, no guilt penalties.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              declinePlanAdaptation();
              onClose();
            }}
            className="px-4 py-2 text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            Keep Current Plan
          </button>
          <button
            onClick={() => {
              acceptPlanAdaptation();
              onClose();
            }}
            className="btn-calm-primary text-xs py-2 px-4"
          >
            Accept Adapted Plan
          </button>
        </div>
      </div>
    </div>
  );
};
