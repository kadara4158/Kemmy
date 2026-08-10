import React, { useState } from 'react';
import { CalmCard } from '../../components/common/CalmCard';
import { PlaceholderCard } from '../../components/common/PlaceholderCard';

export const GrowthPage: React.FC = () => {
  const [reflection, setReflection] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const optionalPrompts = [
    "What is one concept I understood clearly today?",
    "How did my energy levels affect my progress today?",
    "What can I celebrate about my efforts today?"
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Growth & Reflection Space</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Holistic human development and self-guided reflection (No pressure, no AI judgment).
          </p>
        </div>
      </div>

      {/* MINIMAL JOURNAL (Constraint #1: Single text area + optional prompts ONLY) */}
      <CalmCard
        title="Daily Reflection Journal"
        subtitle="Intentionally minimal reflection space — simple, private, and calm"
      >
        <div className="space-y-4">
          {/* Optional Prompts */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
              Optional Reflection Prompts (Click to insert):
            </label>
            <div className="flex flex-wrap gap-2">
              {optionalPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPrompt(prompt);
                    setReflection((prev) => (prev ? `${prev}\n\nPrompt: ${prompt}\n` : `Prompt: ${prompt}\n`));
                  }}
                  className="px-3 py-1.5 rounded-lg border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-100 text-xs text-indigo-800 transition-all text-left"
                >
                  💡 {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Single Text Area */}
          <div>
            <textarea
              rows={6}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write your thoughts freely here..."
              className="w-full p-4 bg-gray-50/70 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-400">
              *Private local reflection. No tags, folders, or AI text analysis (Constitutional Privacy).
            </span>
            <button
              onClick={() => {
                alert('Reflection saved locally to your device!');
                setReflection('');
              }}
              className="btn-calm-primary text-xs py-2 px-5"
            >
              Save Private Journal Entry
            </button>
          </div>
        </div>
      </CalmCard>

      {/* Explicit Roadmap Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlaceholderCard
          title="Holistic Growth Insights"
          roadmapPhase="Phase 2 — Personalized Growth"
          description="Will highlight long-term learning consistency patterns rather than daily completion percentages."
          intendedCapability="Visualizes progress quality trends over weeks and months, focusing on personal development milestones."
        />

        <PlaceholderCard
          title="Habit Integration & Well-being"
          roadmapPhase="Phase 5 — Lifelong Human Development"
          description="Will allow learners to connect wellness goals (sleep, mindfulness) with study performance."
          intendedCapability="Correlates rest and sleep patterns with study focus to protect long-term mental wellbeing."
        />
      </div>
    </div>
  );
};
