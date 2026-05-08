---
title: Hard navigation drops pending localStorage write — use React Router navigate instead
date: 2026-05-08
category: logic-errors
module: reading
problem_type: logic_error
component: frontend_react
tags: [localstorage, navigation, react-router, useEffect-flush]
symptoms:
  - State update via setState followed by window.location.href change
  - localStorage write in useEffect never fires because component unmounts before effect runs
  - Story invitation seen flag not persisted across navigation
---

## Problem

`handleStartReading` called `updateStoryProgress({ storyInvitationSeen: true })` then immediately `window.location.href = '/grade-nerd/reading/story'`. The hard navigation unmounts the component tree before React's useEffect can flush the state change to localStorage, so the `storyInvitationSeen` flag is lost.

## Root Cause

`window.location.href` triggers a full page reload, which tears down the React tree synchronously. State updates scheduled via `setState` are batched and their side effects (useEffect) run asynchronously — the page is already gone.

## Solution

Replace `window.location.href` with React Router's `navigate('/reading/story')`. Client-side navigation does not tear down the React tree, so the useEffect that persists state to localStorage fires normally.

```tsx
const navigate = useNavigate();
const handleStartReading = useCallback(() => {
  setShowStoryInvitation(false);
  updateStoryProgress({ storyInvitationSeen: true });
  navigate('/reading/story');
}, [updateStoryProgress, navigate]);
```

## Key Takeaway

Never use `window.location.href` for in-app navigation when state persistence depends on React effects. Always use the router's `navigate()` to keep the React lifecycle intact.
