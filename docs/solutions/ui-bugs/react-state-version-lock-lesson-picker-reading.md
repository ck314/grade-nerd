---
title: "React state bugs: version text instability and lesson picker off-by-one"
date: 2026-04-16
category: ui-bugs
module: reading
problem_type: ui_bug
component: frontend_stimulus
symptoms:
  - "Lesson text visibly changes when Next Lesson button appears after completing a multi-word lesson"
  - "Hamburger menu lesson picker shows lessons 1 through N-1, omitting the current lesson N"
root_cause: async_timing
resolution_type: code_fix
severity: medium
tags:
  - react-state
  - usememo
  - reading-mode
  - lesson-picker
  - re-render
---

# React state bugs: version text instability and lesson picker off-by-one

## Problem

Two React state management bugs in the reading mode feature (`/reading`) caused incorrect UI behavior during lesson completion: sentence text visibly changed mid-lesson, and the lesson picker menu omitted the current lesson from its list. Both affected users ages 4-6.

## Symptoms

- When a student completed a multi-word lesson (lessons 11-100), the displayed sentence text visibly changed at the moment the "Next Lesson" button appeared.
- The hamburger menu lesson picker showed lessons 1 through N-1 when on lesson N, always excluding the current lesson from the pickable list.

## What Didn't Work

Both bugs were caught during browser testing before release. No failed fix attempts — root causes were identified directly from observing the UI behavior.

## Solution

**Bug 1 — Version text changes on lesson completion**

File: `src/pages/reading/ReadingPage.tsx`

Before:
```tsx
const lesson = getLesson(progress.currentLesson);
const versionIndex = lesson
  ? (lesson.versions.length > 1 ? selectVersion(lesson, progress.wordCounts) : 0)
  : 0;
const tokens = lesson ? getWordTokens(lesson, versionIndex) : [];
```

After:
```tsx
const lesson = getLesson(progress.currentLesson);

// eslint-disable-next-line react-hooks/exhaustive-deps
const versionIndex = useMemo(() => {
  if (!lesson) return 0;
  return lesson.versions.length > 1 ? selectVersion(lesson, progress.wordCounts) : 0;
}, [progress.currentLesson, lessonKey]);

const tokens = lesson ? getWordTokens(lesson, versionIndex) : [];
```

**Bug 2 — Lesson picker missing current lesson**

File: `src/contexts/ReadingProgressContext.tsx`

Before:
```tsx
const setCurrentLesson = useCallback((n: number) => {
  setProgress(prev => ({ ...prev, currentLesson: n }));
}, []);
```

After:
```tsx
const setCurrentLesson = useCallback((n: number) => {
  setProgress(prev => ({
    ...prev,
    currentLesson: n,
    highestLesson: Math.max(prev.highestLesson, n),
  }));
}, []);
```

## Why This Works

**Bug 1:** `selectVersion()` uses `wordCounts` to pick which lesson version to display. When `completeLesson()` updated `wordCounts` in state, React re-rendered and `selectVersion()` re-ran inline with new word counts, returning a different version index. Wrapping in `useMemo` with dependencies on `currentLesson` (not `wordCounts`) locks the version to whatever was selected when the lesson first loaded.

**Bug 2:** `highestLesson` was only incremented inside `completeLesson()`. `setCurrentLesson()` — used by navigation and the lesson picker — updated `currentLesson` but never `highestLesson`. Since the picker rendered options up to `highestLesson`, the current lesson was always invisible. The fix mirrors the `Math.max` update into `setCurrentLesson()`.

## Prevention

- **Derived state from render:** Any value computed inline during render that depends on React state will recompute on every re-render triggered by unrelated state changes. When a computed value should be stable for the lifetime of a session (e.g., a lesson attempt), use `useMemo` with a narrow dependency array. Avoid calling strategy/selector functions inline during render if their inputs can change mid-session.
- **State update completeness:** When multiple state fields have an invariant relationship (e.g., `highestLesson >= currentLesson`), every function that updates any field in that relationship must maintain the invariant. Audit all setters that touch related fields whenever adding a derived field.
- **Test strategies:** Write tests that simulate completing a lesson and assert displayed text is identical before and after the completion event. Test state transitions from multiple entry paths (organic completion vs. manual navigation).

## Related Issues

- Feature plan: `docs/plans/2026-04-16-001-feat-reading-mode-plan.md`
- Requirements: `docs/brainstorms/reading-mode-requirements.md`
