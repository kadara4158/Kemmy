# Kemmy System Architecture & Module Boundaries

**Version:** 1.0 (Phase 1)  
**Author:** Technical Lead & AI Architect  
**Constitution Ref:** Kemmy Constitution v1.1  

---

## 1. System Layers & Data Flow

Kemmy follows a strict unidirectional data flow:

```
┌──────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                     │
│  - AppShell (Top Header + Navigation + Mobile Bottom Bar)│
│  - Pages: Home, Plan, Companion, Learn, Growth, Profile  │
│  - Reusable UI Components: CalmCard, PlaceholderCard     │
└────────────────────────────┬─────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────┐
│                     BUSINESS LOGIC                        │
│  - React Context (TaskContext, MoodContext, AIContext)   │
│  - Custom Hooks (useTasks, useMood, usePlanner, useAI)   │
│  - Energy Math & Next Best Step Selector                 │
└────────────────────────────┬─────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────┐
│                    DATA & SERVICE LAYER                  │
│  - LocalStorage Persistence (Offline-First Baseline)     │
│  - Gemini API Client (Explainable AI Engine)             │
│  - Firebase Firestore & Auth Service                     │
│  - Mock Google Calendar Sync Manager                     │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Navigation Hierarchy (Constitution Section 13)

1. **🏠 Home (Dashboard)**: Central landing page. Focuses on the single **Next Best Step** to eliminate choice paralysis and reduce cognitive burden.
2. **📅 Plan**: Time-blocking schedule, energy heatmap, task manager, and the free baseline **"I'm Overwhelmed" Dynamic Replanning** trigger.
3. **🤖 Companion**: Empathetic AI chat workspace powered by the **10 AI Principles** with transparent explainability reasoning.
4. **📚 Learn**: Personalized study workspace, concept breakdown tutor, and revision support.
5. **🌱 Growth**: Human development space with minimal reflection journal (single text field + optional prompts) and progress insights.
6. **👤 Profile**: Personal preferences, Google Calendar integration settings, data privacy controls, and freemium tier overview.

---

## 3. Placeholders & Roadmap Boundaries

In compliance with project guidelines:
- Every unavailable capability is labeled explicitly with **"Planned Future Integration"** or **"Coming Soon"**.
- No unavailable feature will mock fake interactivity that misleads users or judges.

---

## 4. Maintenance & Scalability Rules

- **Zero Monolithic Files**: Logic is strictly split into subfolders inside `src/components/`, `src/services/`, `src/context/`, and `src/hooks/`.
- **Local-First Design**: Users never lose data during network disconnections. LocalStorage acts as the immediate write-ahead cache before syncing to Firebase.
