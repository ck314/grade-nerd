---
title: "Decorative avatar overlap and static freeze on lesson completion in reading mode"
date: 2026-04-17
category: ui-bugs
module: reading
problem_type: ui_bug
component: frontend_stimulus
symptoms:
  - "Decorative stick figure overlaps the centered Next Lesson button when positioned in the bottom safe zone"
  - "Decorative avatar remains frozen when lesson completes instead of re-randomizing"
root_cause: logic_error
resolution_type: code_fix
severity: low
tags:
  - decorative-avatar
  - framer-motion
  - reading-mode
  - absolute-positioning
  - react-key
  - safe-zone
---

# Decorative avatar overlap and static freeze on lesson completion in reading mode

## Problem

A decorative stick figure avatar on reading mode screens overlapped with the dynamically appearing "Next Lesson" button after lesson completion, and the avatar stayed frozen (did not re-randomize) when transitioning from active lesson to completed state.

## Symptoms

- Stick figure avatar visually overlapped with the centered "Next Lesson" button on lesson completion
- Avatar remained in its original random position and configuration after lesson completion, making the UI feel static
- Bottom safe zone allowed placement too close to viewport center where the completion button renders

## What Didn't Work

The initial implementation had two gaps:

1. `computePosition()` defined a bottom safe zone with `yMin = Math.min(vh * 0.8, vh - 88 - fh)` which did not account for the "Next Lesson" button appearing centered in the viewport. Figures placed at the top of the bottom zone could land directly behind the button.

2. `<DecorativeAvatar>` had no explicit `key` prop — it inherited identity from the parent `motion.div` keyed on `${currentLesson}-${lessonKey}`. Since lesson completion changes `isTraversing` but not the lesson ID, React never unmounted the avatar, so the `useState` lazy initializer never re-ran.

## Solution

Two coordinated changes across `DecorativeAvatar.tsx` and `ReadingPage.tsx`:

**1. Added `avoidCenter` parameter to push bottom zone away from the button area:**

```tsx
// DecorativeAvatar.tsx — computePosition()

// Before
const bottomYMin = Math.min(vh * 0.8, vh - 88 - fh);

// After
const bottomYMin = Math.min(vh * 0.8, vh - 88 - fh) + (avoidCenter ? 30 : 0);
```

**2. Added key tied to completion state for re-randomization on lesson complete:**

```tsx
// ReadingPage.tsx

// Before
<DecorativeAvatar />

// After
<DecorativeAvatar key={`avatar-${isTraversing}`} avoidCenter={!isTraversing} />
```

When `isTraversing` flips to `false` on completion, the key changes, forcing React to destroy and recreate the component. The `useState` lazy initializer runs on mount, generating a new random config. The `avoidCenter={true}` ensures the new position clears the button.

## Why This Works

1. **Safe-zone logic error:** The bottom zone's y-minimum was calculated from viewport edges and fixed chrome only, with no awareness of dynamically appearing centered content. Adding the 30px offset when the button is visible pushes figures below the button's hit area.

2. **React key identity gap:** React's reconciliation uses keys to determine component identity. Without an explicit key encoding completion state, React saw no reason to unmount the avatar on completion. Adding `key={`avatar-${isTraversing}`}` makes the key change when completion triggers, forcing a remount and fresh randomization via the lazy initializer.

## Prevention

- **Account for all UI states in layout calculations.** When defining safe zones for absolutely positioned elements, enumerate every element that can appear across all states (active, completed, loading), not just the initial render.
- **Key components on the full state they depend on.** If a component uses `useState` lazy initializers for one-time setup, its React key must include every state dimension that should trigger re-initialization.
- **Visual QA across state transitions.** Test positioned/decorative elements through every state transition, not just initial render. Overlap bugs are state-dependent.

## Related Issues

- [react-state-version-lock-lesson-picker-reading.md](react-state-version-lock-lesson-picker-reading.md) — companion reading mode bug from the same development cycle; both manifest at the lesson-completion trigger point but address different bug classes (React state management vs CSS layout + key identity)
