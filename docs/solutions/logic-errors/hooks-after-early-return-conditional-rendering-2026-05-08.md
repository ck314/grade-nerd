---
title: React hooks after early return — conditional rendering causes Rules of Hooks violation
date: 2026-05-08
category: logic-errors
module: reading-story
problem_type: logic_error
component: frontend_react
tags: [react-hooks, conditional-rendering, eslint, story-reader]
symptoms:
  - ESLint reports 17 "React Hook is called conditionally" errors
  - Component has early return before all useState/useEffect/useMemo/useCallback calls
---

## Problem

`StoryContent` had an early-return guard (`if (!isStoryUnlocked(...)) return <Navigate />`) at the top of the component, before 17 hook calls. React's Rules of Hooks require all hooks to run on every render in the same order — an early return before hooks violates this.

## Root Cause

The guard logic and the stateful rendering were in the same component. When the guard short-circuited, hooks below it were skipped, making hook call order conditional.

## Solution

Extract the guard into a separate wrapper component:

```tsx
function StoryGuard() {
  const { progress } = useReadingProgress();
  if (!isStoryUnlocked(progress.completedLessons)) {
    return <Navigate to="/reading" replace />;
  }
  return <StoryContent />;
}
```

`StoryContent` now always runs all its hooks. The guard component only uses one hook (`useReadingProgress`) and either redirects or renders the full component.

## Key Takeaway

When a component needs both a conditional guard and many hooks, split into a Guard + Content pair. The guard component handles the conditional logic; the content component holds all the hooks and always renders completely.
