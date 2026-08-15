import React, { useState } from 'react';
import { CalmCard } from '../../components/common/CalmCard';
import { PlaceholderCard } from '../../components/common/PlaceholderCard';
import { useLearning } from '../../context/LearningContext';

export const LearnPage: React.FC = () => {
  const { topics, activeTopicId, setActiveTopicId, addMaterialToTopic, addNoteToTopic, markConceptCompleted, activeTopic } = useLearning();

  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialContent, setNewMaterialContent] = useState('');
  const [showAddMaterialForm, setShowAddMaterialForm] = useState(false);

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  const [aiBreakdownOutput, setAiBreakdownOutput] = useState<string | null>(null);

  if (!activeTopic) return null;

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterialTitle.trim() || !newMaterialContent.trim()) return;

    addMaterialToTopic(activeTopic.id, {
      title: newMaterialTitle,
      subject: activeTopic.subject,
      sourceType: 'article',
      content: newMaterialContent,
      summary: newMaterialContent.slice(0, 100) + '...',
      keyTakeaways: ['Imported learning resource.', 'Ready for AI concept breakdown.']
    });

    setNewMaterialTitle('');
    setNewMaterialContent('');
    setShowAddMaterialForm(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    addNoteToTopic(activeTopic.id, newNoteTitle, newNoteContent);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddNoteForm(false);
  };

  const handleExplainMaterial = (contentStr: string) => {
    setAiBreakdownOutput(
      `Concept Breakdown (${activeTopic.title}):\n1. Key Idea: ${contentStr.slice(0, 120)}\n2. Application: Custom architecture logic decouples UI rendering from complex state mutations.\n3. Summary: Focus on understanding underlying data flow patterns rather than memorizing syntax.`
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Adaptive Learning Workspace</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Import materials, take study notes, and work interactively with Kemmy AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddNoteForm(true)}
            className="btn-calm-secondary text-xs py-2 px-3.5"
          >
            + Add Note
          </button>
          <button
            onClick={() => setShowAddMaterialForm(true)}
            className="btn-calm-primary text-xs py-2 px-4 shadow-sm"
          >
            + Import Material
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Topic Navigator */}
        <CalmCard title="Active Learning Topics" className="md:col-span-1">
          <div className="space-y-2 mt-1">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTopicId(t.id);
                  setAiBreakdownOutput(null);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  activeTopicId === t.id
                    ? 'border-indigo-300 bg-indigo-50/70 shadow-sm'
                    : 'border-[var(--color-border)] hover:bg-[var(--color-bg)]'
                }`}
              >
                <div className="text-xs text-indigo-700 font-semibold">{t.subject}</div>
                <div className="text-sm font-bold text-[var(--color-text-primary)] mt-0.5">{t.title}</div>
                <div className="text-[11px] text-[var(--color-text-muted)] mt-1 font-medium">
                  {t.materials.length} material{t.materials.length === 1 ? '' : 's'} • {t.notes.length} note{t.notes.length === 1 ? '' : 's'}
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${t.progressPercent}%` }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </CalmCard>

        {/* Interactive Workspace & Materials */}
        <div className="md:col-span-2 space-y-4">
          {/* Active Concept Breakdown */}
          <CalmCard
            title={activeTopic.title}
            subtitle={`Progress: ${activeTopic.progressPercent}% • ${activeTopic.estimatedMinutes}m Focus Block`}
            headerAction={
              <button
                onClick={() => markConceptCompleted(activeTopic.id)}
                className="btn-calm-secondary text-xs py-1.5 px-3"
              >
                Mark Concept Understood (+20%)
              </button>
            }
          >
            <div className="space-y-4 text-xs text-[var(--color-text-primary)] leading-relaxed">
              <div className="p-4 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] space-y-2">
                <h4 className="font-bold text-[var(--color-text-primary)] text-sm">Next Focus Concept: {activeTopic.nextConcept}</h4>
                <p>
                  Kemmy adapts learning material into small digestible focus steps so you can make meaningful progress without cognitive fatigue.
                </p>
              </div>

              {aiBreakdownOutput && (
                <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2 text-teal-950">
                  <strong className="font-bold text-teal-900 block text-xs">🤖 Kemmy AI Concept Analysis:</strong>
                  <pre className="whitespace-pre-wrap font-sans text-xs">{aiBreakdownOutput}</pre>
                </div>
              )}
            </div>
          </CalmCard>

          {/* Imported Learning Materials List (Section 5 of Brief) */}
          <CalmCard title={`Imported Learning Materials (${activeTopic.materials.length})`}>
            <div className="space-y-3 mt-1">
              {activeTopic.materials.length > 0 ? (
                activeTopic.materials.map((mat) => (
                  <div key={mat.id} className="p-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[var(--color-text-primary)]">{mat.title}</h4>
                      <button
                        onClick={() => handleExplainMaterial(mat.content)}
                        className="btn-calm-primary text-xs py-1 px-3"
                      >
                        Explain with Kemmy AI
                      </button>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-3">{mat.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--color-text-muted)] italic">No imported materials for this topic yet. Click "+ Import Material" above to add articles or readings.</p>
              )}
            </div>
          </CalmCard>

          {/* Study Notes List (Section 5 of Brief) */}
          <CalmCard title={`Study Notes (${activeTopic.notes.length})`}>
            <div className="space-y-3 mt-1">
              {activeTopic.notes.length > 0 ? (
                activeTopic.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl space-y-1 text-xs">
                    <h5 className="font-semibold text-[var(--color-text-primary)]">{note.title}</h5>
                    <p className="text-[var(--color-text-muted)]">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--color-text-muted)] italic">No notes created yet. Click "+ Add Note" to record key takeaways.</p>
              )}
            </div>
          </CalmCard>

          <PlaceholderCard
            title="AI Interactive Concept Visualizer"
            roadmapPhase="Phase 4 — Intelligent Guidance"
            description="Will generate dynamic interactive diagrams illustrating code architecture concepts visually."
            intendedCapability="Renders real-time Mermaid diagrams and memory flow visualizers directly inside study modules."
          />
        </div>
      </div>

      {/* Add Material Modal */}
      {showAddMaterialForm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[var(--color-border)] space-y-4">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Import Learning Material</h3>
            <form onSubmit={handleAddMaterial} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[var(--color-text-muted)] block mb-1">Material Title</label>
                <input
                  type="text"
                  required
                  value={newMaterialTitle}
                  onChange={(e) => setNewMaterialTitle(e.target.value)}
                  placeholder="e.g. React Custom Hooks Deep Dive"
                  className="w-full px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[var(--color-text-muted)] block mb-1">Content / Reading Material</label>
                <textarea
                  rows={5}
                  required
                  value={newMaterialContent}
                  onChange={(e) => setNewMaterialContent(e.target.value)}
                  placeholder="Paste article, documentation, or study text here..."
                  className="w-full p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddMaterialForm(false)} className="px-3 py-1.5 text-xs text-[var(--color-text-muted)]">
                  Cancel
                </button>
                <button type="submit" className="btn-calm-primary text-xs py-1.5 px-4">
                  Import Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddNoteForm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[var(--color-border)] space-y-4">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Add Study Note</h3>
            <form onSubmit={handleAddNote} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[var(--color-text-muted)] block mb-1">Note Title</label>
                <input
                  type="text"
                  required
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g. Key rule: Hooks must start with 'use'"
                  className="w-full px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-[var(--color-text-muted)] block mb-1">Note Content</label>
                <textarea
                  rows={4}
                  required
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Write your study note or insight..."
                  className="w-full p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddNoteForm(false)} className="px-3 py-1.5 text-xs text-[var(--color-text-muted)]">
                  Cancel
                </button>
                <button type="submit" className="btn-calm-primary text-xs py-1.5 px-4">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
