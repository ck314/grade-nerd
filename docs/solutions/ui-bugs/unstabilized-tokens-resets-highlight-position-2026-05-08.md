---
title: Unstabilized tokens array causes WordHighlightDisplay to reset on parent re-render
date: 2026-05-08
category: ui-bugs
module: reading
problem_type: performance
component: frontend_react
tags: [useMemo, referential-stability, word-highlight, re-render]
symptoms:
  - Word highlight position resets to beginning mid-lesson
  - Tap-to-advance progress lost when unrelated parent state changes
---

## Problem

`tokens` was computed inline without `useMemo`, creating a new array reference on every render. `WordHighlightDisplay` received a new `tokens` prop each time the parent re-rendered (e.g., from progress counter updates), causing it to reset its internal highlight index to 0.

## Root Cause

JavaScript array equality is referential. `getWordTokens(lesson, versionIndex)` returns a new array each call. Without memoization, React sees a "new" prop every render and the child component re-initializes.

## Solution

Wrap the token computation in `useMemo`:

```tsx
const tokens = useMemo(
  () => lesson ? getWordTokens(lesson, versionIndex) : [],
  [lesson, versionIndex]
);
```

The tokens array now has a stable reference as long as the lesson and version don't change.

## Key Takeaway

Any derived array or object passed as a prop to a child component with internal state should be memoized. Without `useMemo`, parent re-renders create new references that reset child state.
