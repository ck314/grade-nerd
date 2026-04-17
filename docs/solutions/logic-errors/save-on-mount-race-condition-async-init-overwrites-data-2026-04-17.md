---
title: Save-on-mount race condition — async init overwrites localStorage data
date: 2026-04-17
category: logic-errors
module: game-progress
problem_type: logic_error
component: frontend_stimulus
symptoms:
  - User switches profiles and Formula Forge progress resets to blank
  - Progress data in localStorage overwritten with default state on remount
  - Bug is intermittent and timing-dependent, only manifests on key-based remount
  - ReadingProgressContext unaffected, making bug appear profile-switch-specific
root_cause: async_timing
resolution_type: code_fix
severity: critical
tags:
  - react-state
  - usestate
  - useeffect
  - localstorage
  - race-condition
  - async-init
  - multi-user
  - key-remount
---

# Save-on-mount race condition — async init overwrites localStorage data

## Problem

GameProgressContext used an async two-phase initialization pattern: `useState(createInitialProgress)` starts with blank state, a mount `useEffect` loads real data from localStorage, and a separate save `useEffect` on `[progress]` persists changes. The save effect fires with blank initial state **before** the load effect completes, overwriting the user's real saved progress. This became destructive when key-based remount was introduced for multi-user profiles, firing the race on every user switch.

## Symptoms

- User switches profiles and their Formula Forge game progress resets to blank
- Progress data in localStorage is overwritten with default/empty state on remount
- The bug is intermittent and timing-dependent — it only manifests when the component tree remounts (not on initial app load where the race was previously benign)
- ReadingProgressContext (which already used sync init) was unaffected, making the bug appear profile-switch-specific rather than a general initialization problem

## What Didn't Work

- **Boolean guard flag on save effect**: Adding a `loaded` flag to skip the save effect until the load effect completes was considered but rejected — it adds ongoing complexity, works around the race rather than eliminating it, and ReadingProgressContext already proved the sync pattern works cleanly.

## Solution

Refactored from async two-phase init to sync `useState` lazy initializer, matching the pattern already used by ReadingProgressContext.

**Before:**

```tsx
// GameProgressContext.tsx — async two-phase init
const STORAGE_KEY = 'gradenerd-formula-forge';

export function GameProgressProvider({ children }) {
  const [progress, setProgress] = useState<GameProgress>(createInitialProgress);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const updated = migrateProgress(parsed);
        setProgress(updated);
      }
    } catch {
      setProgress(createInitialProgress());
    }
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);
}
```

**After:**

```tsx
// GameProgressContext.tsx — sync init via useState lazy initializer
import { useUser } from '../contexts/UserContext';
import { getUserKey } from '../lib/userStorage';

function loadFromLocalStorage(key: string): GameProgress {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      const updated = migrateProgress(parsed);
      gameTopics.forEach((topic, index) => {
        if (!updated.topics[topic.id]) {
          updated.topics[topic.id] = {
            status: index === 0 ? 'available' : 'locked',
            /* ... */
          };
        }
      });
      return updated;
    }
    return createInitialProgress();
  } catch {
    return createInitialProgress();
  }
}

export function GameProgressProvider({ children }) {
  const { activeUser } = useUser();
  const storageKey = getUserKey(activeUser!, 'formula-forge');
  const [progress, setProgress] = useState<GameProgress>(
    () => loadFromLocalStorage(storageKey)
  );

  // Save effect — now only fires after real data is loaded
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);
}
```

The load `useEffect` is removed entirely. `loadFromLocalStorage` runs synchronously as a `useState` lazy initializer, so the save effect never sees blank state.

## Why This Works

The `useState` lazy initializer runs **synchronously** during the component's first render. By the time React commits the render and the save `useEffect` first fires, `progress` already contains the real loaded data from localStorage. There is no window where blank/default state exists — the race condition is structurally impossible.

## Prevention

- **Prefer sync `useState(() => loadData())` over async `useEffect` load** when the data source is synchronous (localStorage, sessionStorage, URL params). Reserve `useEffect` loading for truly async sources (fetch, IndexedDB).
- **When two `useEffect` hooks interact** (one loads, one saves), verify the save cannot fire before the load completes. Both fire on mount in declaration order, but both see the initial state, not the loaded state.
- **When adding remount triggers** (React key changes for profile switching, route-based remounts), audit all `useEffect` mount hooks in the affected subtree for ordering assumptions that were previously benign under single-mount semantics.
- **Use existing patterns as reference.** ReadingProgressContext already demonstrated the sync init pattern. When adding similar functionality, check for prior art in the codebase.

## Related Issues

- [React state version lock and lesson picker bugs](../ui-bugs/react-state-version-lock-lesson-picker-reading.md) — same module family (progress contexts), shares prevention rules around state update completeness and derived state stabilization
- [Decorative avatar overlap and freeze](../ui-bugs/decorative-avatar-overlap-freeze-reading.md) — demonstrates React key-based remount pattern that this fix relies on
- [Multi-user profiles plan](../../plans/2026-04-17-002-feat-multi-user-profiles-plan.md) — discovery context; Unit 6 prescribed this fix
- [Reading mode plan](../../plans/2026-04-16-001-feat-reading-mode-plan.md) — established the sync init precedent in ReadingProgressContext
