---
title: "feat: Reading mode polish — punctuation cleanup and decorative stick figures"
type: feat
status: active
date: 2026-04-17
origin: docs/brainstorms/reading-polish-requirements.md
---

# feat: Reading mode polish — punctuation cleanup and decorative stick figures

## Overview

Two reading mode enhancements: (1) strip visual-noise punctuation from lessons 1-40, and (2) add a randomly configured decorative stick figure to every reading screen using the existing `CustomizableAvatar` system.

## Problem Frame

The reading mode's first 40 lessons display punctuation (periods, exclamation marks, commas) that adds visual noise for early readers learning single words and short phrases. Question marks are preserved since they change meaning. Separately, the reading screens feel visually sparse — adding a random stick figure with random accessories makes each screen more engaging and playful for young children. (see origin: `docs/brainstorms/reading-polish-requirements.md`)

## Requirements Trace

- R1. Remove all punctuation from displayed text in lessons 1-40, except question marks
- R2. Punctuation to strip: currently `.` `!` `,` — strip any non-letter, non-`?` character
- R3. The `normalized` field is unaffected (already strips punctuation)
- R4. Every reading screen displays a single decorative stick figure
- R5. Uses `CustomizableAvatar` at `lg` size, `level={1}`, no `onClick`/`showClickHint`
- R6. Random 0-4 items (one per category max), random pose variant
- R7. Re-randomizes on lesson transitions; lesson-complete state keeps the same figure
- R8. Safe-zone positioning with responsive size fallback on narrow viewports
- R9. `pointer-events: none` for click passthrough to lesson container

## Scope Boundaries

- Punctuation changes are display-layer only — lesson data and normalized words unchanged
- Stick figure appears only on reading mode screens
- Uses existing 25 avatar items — no new items
- Figure is non-interactive — no store, customization, or unlocking

## Context & Research

### Relevant Code and Patterns

**Reading mode data flow:**
- `src/data/reading/lessons.ts` — `getWordTokens(lesson, versionIndex)` creates `WordToken[]` with `{ display, normalized }`. The `display` field includes raw punctuation from the lesson version string. `normalizeWord()` already strips leading/trailing non-alpha for the `normalized` field.
- `src/pages/reading/ReadingPage.tsx` — calls `getWordTokens`, passes tokens to `LessonDisplay`. Version index is locked via `useMemo` keyed on `[progress.currentLesson, lessonKey]`.
- `src/pages/reading/components/LessonDisplay.tsx` — renders `token.display` in centered flex layout with dynamic font sizing.

**Reading page layout (critical for positioning):**
- Root container: `div.min-h-screen.bg-graph-paper.relative`
- All fixed chrome at `z-40`: logo (top-left, 40x40), hamburger (top-right, 40x40), progress counter (bottom-left), lesson nav (bottom-right, 48x48 buttons)
- Content padding: `paddingTop: 60px, paddingBottom: 80px, paddingLeft/Right: 16px`
- Text: `flex flex-wrap items-center justify-center` — centered both axes in the viewport
- AnimatePresence `mode="wait"` with `motion.div` opacity fade (0.15s), keyed on `${currentLesson}-${lessonKey}`

**Avatar system:**
- `src/components/avatar/CustomizableAvatar.tsx` — renders SVG stick figure with items. Props: `equippedItems`, `size`, `variant`, `level`, `onClick`, `showClickHint`. Size `lg` = `w-24 h-48` (96x192px), `md` = `w-16 h-32` (64x128px), `sm` = `w-12 h-24` (48x96px).
- `src/components/avatar/AvatarItemSVG.tsx` — 25 item SVGs with z-index layering
- `src/data/game/avatarItems.ts` — items with `{ id, name, category, price, zIndex }`. Categories: `head`, `face`, `body`, `effects`. Helper: `getItemsByCategory(category)`.
- Default glasses suppressed when `round-glasses`, `thick-glasses`, or `safety-goggles` equipped

### Institutional Learnings

- **Version text instability** (`docs/solutions/ui-bugs/react-state-version-lock-lesson-picker-reading.md`): The `versionIndex` is deliberately locked via `useMemo` with narrow deps. Punctuation changes must not break this memoization. Any new render-time computations must use `useMemo` with stable deps to avoid re-render instability.

## Key Technical Decisions

- **Strip punctuation inside `getWordTokens`**: The function already creates the `display` field from raw text — adding a conditional strip there is the natural, single-responsibility location. The lesson number is available via `lesson.lesson`. No interface change needed since the function already receives the full `ReadingLesson` object.
- **Place DecorativeAvatar inside AnimatePresence motion.div**: This makes it re-mount on lesson transitions (re-randomizing naturally) and participate in the opacity fade (cohesive animation). It stays mounted during lesson completion (same key = no re-randomization).
- **Safe zones via viewport dimensions, not DOM measurement**: Use `window.innerWidth/Height` to define rectangular safe regions at mount time. No refs, no `useLayoutEffect`, no element measurement. Zones are defined relative to known layout constants (60px top padding, 80px bottom padding, 16px side padding, 40px corner chrome).
- **Position: absolute within the motion.div**: The figure is inside the `motion.div` (for lifecycle) and positions relative to it as the containing block. Framer Motion may set `will-change` or `transform` during opacity transitions, creating a new containing block — but since the `motion.div` is `min-h-screen`, viewport-based coordinates remain valid. This gives full-screen placement without affecting the flex layout.
- **z-index 10**: Below fixed chrome (z-40) but above the background. Ensures the figure never obscures controls.

## Open Questions

### Resolved During Planning

- **Where to strip punctuation?** Inside `getWordTokens()` — it already creates the display field and has access to the lesson number. No interface change required.
- **Where in the DOM tree?** Inside the AnimatePresence `motion.div`, as a sibling of `LessonDisplay`. Positioned absolutely, so it doesn't affect flex layout. Re-mounts on lesson transitions, fades with text.
- **How to handle the "below text" zone when Next Lesson button is visible?** The figure position is computed at mount time and stays fixed for the lesson (R7). The button only appears after traversal completes. Since the button is centered and the figure avoids the center, overlap is unlikely. Accept this minor risk rather than adding position-recalculation logic.

### Deferred to Implementation

- **Exact pixel boundaries for safe zones**: The plan defines the zone strategy; final pixel values will be tuned during implementation based on visual testing.
- **Responsive breakpoint tuning**: Starting with 480px width threshold; may adjust based on how the figure looks on real device sizes.

## Implementation Units

- [ ] **Unit 1: Punctuation stripping in token generation**

**Goal:** Strip display-layer punctuation from lessons 1-40 while preserving question marks and leaving normalized field untouched.

**Requirements:** R1, R2, R3

**Dependencies:** None

**Files:**
- Modify: `src/data/reading/lessons.ts`

**Approach:**
- Add a `stripDisplayPunctuation(display: string): string` helper that removes all characters that are not letters or `?` — equivalent to `display.replace(/[^a-zA-Z?]/g, '')`
- In `getWordTokens`, after computing `display` from the text split, conditionally call `stripDisplayPunctuation(display)` when `lesson.lesson <= 40`
- The `normalized` field continues to use the existing `normalizeWord()` — no change needed
- This keeps the raw lesson data untouched and the strip logic localized to the one function that constructs display tokens

**Patterns to follow:**
- The existing `normalizeWord()` function in the same file — similar strip-and-clean pattern

**Test scenarios:**
- Happy path: Lesson 1 `"am."` renders display as `"am"` (period stripped)
- Happy path: Lesson 12 `"sam, mad?"` renders displays as `["sam", "mad?"]` (comma stripped, question mark preserved)
- Happy path: Lesson 20 `"is it?"` renders displays as `["is", "it?"]` (question mark preserved)
- Happy path: Lesson 40 `"sam sat on it."` renders displays as `["sam", "sat", "on", "it"]` (period stripped)
- Edge case: Lesson 41 `"an ant is on it."` renders display with period intact — no stripping applied
- Edge case: Lesson 4 `"see!"` renders display as `"see"` (exclamation stripped)
- Edge case: Normalized field for lesson 1 `"am."` is still `"am"` — unchanged by this change
- Integration: Complete lesson 20 (which has `?`), verify word mastery tracking counts the correct normalized words

**Verification:**
- Lessons 1-40 display no periods, exclamation marks, or commas; question marks still appear
- Lessons 41-100 display unchanged (still have all original punctuation)
- Word mastery tracking works identically — `normalizedWords` passed to `completeLesson` are the same as before

- [ ] **Unit 2: DecorativeAvatar component**

**Goal:** Create a self-contained component that renders a randomly configured `CustomizableAvatar` at a random safe-zone position, with responsive sizing.

**Requirements:** R4, R5, R6, R8, R9

**Dependencies:** None (can be built in parallel with Unit 1)

**Files:**
- Create: `src/pages/reading/components/DecorativeAvatar.tsx`

**Approach:**

*Random avatar configuration (R5, R6):*
- On mount, generate a random config using `useState` with lazy initializer (stable for component lifetime)
- Pick a random variant from `['standing', 'thinking', 'teaching', 'qed']`
- Pick a random item count (0-4), then shuffle the 4 categories, take the first N, and pick a random item from each using `getItemsByCategory()` (returns `AvatarItem` objects — map to `.id` strings for the `equippedItems` prop)
- Render `CustomizableAvatar` with `equippedItems={selectedItemIds}`, `variant`, `size` (responsive), `level={1}`, no `onClick`, no `showClickHint`

*Safe-zone positioning (R8):*
- On mount, read `window.innerWidth` and `window.innerHeight`
- Define 4 rectangular safe zones based on known layout constants:
  - **Left zone**: x from `16px` to `max(16px, 15% of viewport) - figureWidth`, y from `64px` to `viewportHeight - 88px - figureHeight`
  - **Right zone**: x from `min(85% of viewport, viewportWidth - 16px - figureWidth)` to `viewportWidth - 16px - figureWidth`, y from `64px` to `viewportHeight - 88px - figureHeight`
  - **Top zone**: x from `64px` to `viewportWidth - 64px - figureWidth`, y from `64px` to `max(64px, 20% of viewport) - figureHeight`
  - **Bottom zone**: x from `64px` to `viewportWidth - 64px - figureWidth`, y from `min(80% of viewport, viewportHeight - 88px - figureHeight)` to `viewportHeight - 88px - figureHeight`
- Exclude chrome overlap areas from zones: the ProgressCounter occupies ~120x65px at bottom-left (`fixed bottom-4 left-4`), so the left zone's y range should end at `viewportHeight - 96px - figureHeight` (extra clearance beyond the 88px base). The LessonNav occupies ~104x48px at bottom-right (`fixed bottom-4 right-4`), so the bottom zone's x range should end at `viewportWidth - 120px - figureWidth` on the right side. Top corners (logo 40x40, hamburger 40x40) are already covered by the 64px y-start.
- Filter zones: only keep zones where the figure fits (zone width >= figureWidth, zone height >= figureHeight)
- Pick a random valid zone, then pick a random (x, y) within it (ensuring figure fits fully)
- If no zone is valid (very small screen), fall back to top-left corner below the logo

*Responsive sizing (R8):*
- `viewportWidth >= 480px`: `lg` (96x192)
- `viewportWidth >= 380px`: `md` (64x128)
- `viewportWidth < 380px`: `sm` (48x96)

*Rendering (R9):*
- Wrapper div with `position: absolute`, computed `top`/`left`, `z-10`, `pointer-events-none`
- Wrap the `CustomizableAvatar` render in a try-catch or React error boundary — the feature is purely decorative, so a thrown error (missing item data, SVG issue) should fail silently rather than crash the reading page

**Patterns to follow:**
- `CustomizableAvatar` usage in `src/pages/game/Game.tsx` — prop shape reference
- `getItemsByCategory()` from `src/data/game/avatarItems.ts` — item selection
- Lazy `useState` initializer pattern used throughout the codebase for stable one-time computations

**Test scenarios:**
- Happy path: Component renders a `CustomizableAvatar` with random items (0-4) and random variant on a standard viewport (1024x768)
- Happy path: Figure is positioned within viewport bounds — not clipped off any edge
- Happy path: Figure does not overlap the center text area (positioned in a margin/edge zone)
- Edge case: Component renders with 0 items (bare stick figure) — still positions correctly
- Edge case: Component renders with 4 items (one per category) — no visual stacking glitches
- Edge case: On a 375px-wide viewport, figure scales down to `sm` size (48x96)
- Edge case: On a very small viewport (320x480), figure falls back to a valid position
- Integration: `pointer-events: none` on wrapper — clicking the figure area triggers the lesson container's advance handler, not the figure

**Verification:**
- A stick figure with accessories appears on screen in a non-overlapping position
- The figure is the correct size for the viewport
- Clicking through the figure advances the word highlight normally

- [ ] **Unit 3: Integration into ReadingPage**

**Goal:** Wire `DecorativeAvatar` into `ReadingPage` so it appears on every lesson screen and re-randomizes on transitions.

**Requirements:** R4, R7

**Dependencies:** Unit 2

**Files:**
- Modify: `src/pages/reading/ReadingPage.tsx`

**Approach:**
- Import `DecorativeAvatar`
- Place it inside the `AnimatePresence` `motion.div`, as a sibling of `LessonDisplay` (before or after)
- Since the `motion.div` remounts on every `goToLesson` call (key changes), `DecorativeAvatar` will automatically remount and re-randomize
- Since lesson completion does NOT change the key, the figure stays in place when the "Next Lesson" button appears
- No new state or context needed — the existing key mechanism handles re-randomization

**Patterns to follow:**
- Existing structure in `ReadingPage.tsx` — sibling elements within the `motion.div`

**Test scenarios:**
- Happy path: Navigate to `/reading` — a stick figure appears alongside the lesson text
- Happy path: Complete a lesson and click "Next Lesson" — figure changes (new position, items, pose)
- Happy path: Use lesson picker to jump to lesson 15 — figure changes
- Happy path: Press back arrow to return to a previous lesson — figure changes
- Edge case: Complete a lesson — figure stays in place while "Next Lesson" button appears (no re-randomization)
- Edge case: On lesson 100, complete the lesson — figure stays while "You finished all 100 lessons!" appears
- Integration: The figure fades in/out with the lesson text during AnimatePresence transitions

**Verification:**
- Every reading screen shows a decorative stick figure
- The figure changes on every lesson transition
- The figure persists through lesson completion without changing
- The figure fades with the lesson text during transitions
- All existing reading mode functionality works unchanged (word advancement, progress tracking, lesson navigation)

## System-Wide Impact

- **Interaction graph:** The `DecorativeAvatar` is fully isolated — no callbacks, no state mutations, no context consumption. It reads `window.innerWidth/Height` once on mount and renders a static positioned element.
- **Error propagation:** If the avatar component throws (missing item data, SVG error), it would be caught by React error boundaries if present, or crash the reading page. Consider wrapping in a try-catch or error boundary since the feature is purely decorative.
- **State lifecycle risks:** None — the punctuation strip is a pure function applied during token generation. The avatar state is local to the component and reset on unmount.
- **API surface parity:** No other interfaces are affected. The `getWordTokens` function is only called from `ReadingPage.tsx`.
- **Unchanged invariants:** All reading progress tracking (wordCounts, completedLessons, highestLesson) is unaffected. The `normalizeWord()` function and `selectVersion()` function are unchanged. Game mode avatar store and customization are completely separate.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Safe-zone positioning looks awkward on some viewport sizes | Tune zone boundaries during implementation; the responsive size fallback provides a safety valve |
| Avatar items designed for specific poses may look odd with random pose | Accept as part of the playful randomness; the existing items were designed with SVG coordinates in the 100x200 viewBox shared by all variants |
| `genius-aura` item has a hardcoded SVG gradient ID (`auraGradient`) | Only one avatar renders per screen in reading mode, so no ID collision. Note for future if multiple avatars are ever needed. |
| Punctuation strip could affect edge-case word display | The strip regex `[^a-zA-Z?]` is conservative — only keeps ASCII letters and `?`. Verified that lessons 1-40 contain no hyphens, apostrophes, accented characters, or other meaningful punctuation. If future lessons add non-ASCII characters, the regex would need updating to `[^\p{L}?]` with the `u` flag. |
| No test framework in project | Verification relies on manual testing in the browser. Test scenarios above serve as a manual test checklist. |

## Sources & References

- **Origin document:** [docs/brainstorms/reading-polish-requirements.md](docs/brainstorms/reading-polish-requirements.md)
- Related code: `src/data/reading/lessons.ts`, `src/components/avatar/CustomizableAvatar.tsx`
- Related learning: `docs/solutions/ui-bugs/react-state-version-lock-lesson-picker-reading.md`
- Related plan: `docs/plans/2026-04-16-001-feat-reading-mode-plan.md` (completed — original reading mode)
