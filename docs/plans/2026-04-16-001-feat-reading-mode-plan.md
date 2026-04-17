---
title: "feat: Add Reading Mode for early readers"
type: feat
status: completed
date: 2026-04-16
origin: docs/brainstorms/reading-mode-requirements.md
---

# feat: Add Reading Mode for early readers

## Overview

Add a full-screen, distraction-free reading lesson interface at `/reading` that teaches children ages 4-6 to read through 100 progressive lessons. Each lesson introduces one new word, tracks reading progress per word, and uses smart version selection to prioritize under-practiced vocabulary. The interface uses Grade Nerd branding adapted for young children.

## Problem Frame

Grade Nerd's reading mode provides a simple, repeatable reading practice tool. A child sees lesson text, taps/presses through each word (highlighted with a blue underline), and advances to the next lesson. Word read counts accumulate across sessions, driving both a progress counter with triangular-number milestones and an algorithm that selects sentence versions favoring under-practiced words. All state lives in localStorage. (see origin: `docs/brainstorms/reading-mode-requirements.md`)

## Requirements Trace

- R1. Full-screen route at `/reading` — no nav bar, no sidebar
- R2. Show entire lesson text in large readable text (multi-sentence for later lessons)
- R3. Blue underline highlights current word; Space/Enter/printable key (excluding modifier-only, Escape, Tab, arrow keys)/tap advances; key-repeat ignored; first word highlighted on load
- R4. After last word + one more press: lesson marked completed, "Next Lesson" button appears; Space/Enter/tap-button only in this state
- R5. Linear progression 1-100, persisted current lesson
- R6. Lessons 1-10: single version displayed
- R7. Lessons 11-100: select version with lowest total word read count; random tiebreak
- R8. Replay via back/forward arrows (hidden during word traversal) + parent-operated hamburger menu (lessons 1 through highest ever reached)
- R9. Word read counts: incremented per highlight pass, normalized (strip punctuation, lowercase), canonical vocabulary from CSV "New word" column
- R10. Progress counter (bottom-left): minimum read count across words from completed lessons only
- R11. Triangular number milestones (1, 3, 6, 10, 15, ...): counter grows in size and shifts color
- R12. Grade Nerd branding adapted for young children
- R13. Chrome limited to: logo (top-left), counter (bottom-left), lesson arrows (bottom-right, hidden during traversal), hamburger (top-right)
- R14. Accessed via direct URL — no link from main pages needed

## Scope Boundaries

- No accounts, auth, or multi-user support
- No audio/text-to-speech
- No gamification beyond progress counter
- No integration with math demo, game, or survey pages
- No custom content — CSV data only

## Context & Research

### Relevant Code and Patterns

- **Route setup**: `src/App.tsx` lines 532-553 — flat routes and nested `<Route>` with layout wrappers
- **Layout wrapper**: `src/pages/game/GameLayout.tsx` — provides context via `<Outlet />`, pattern to follow for ReadingLayout
- **State persistence**: `src/contexts/GameProgressContext.tsx` — try/catch localStorage load, useEffect save, migration support. Key: `gradenerd-formula-forge`
- **Simpler persistence**: `src/hooks/useProgress.ts` — lightweight alternative with same load/save pattern
- **Data layer**: All content is TypeScript objects in `src/data/`. Largest file is `src/data/content.ts` at 84KB. Lookup helpers co-located with data.
- **Data types**: `src/data/types.ts`, `src/data/game/gameTypes.ts` — separate type files per feature
- **UI components**: `src/components/ui/Button.tsx` (variant/size props), `src/components/ui/EducationalPanel.tsx` (card with black border)
- **Animation**: Framer Motion `fadeIn` pattern used on all pages, lateral slide for transitions
- **Overlay pattern**: `src/pages/game/components/UnlockAnimation.tsx` — `fixed inset-0 z-50` with backdrop blur
- **Custom nav**: `src/pages/game/components/GameNav.tsx` — feature-specific nav component
- **CSS variables**: `src/index.css` — `--educational-blue: #0066FF`, `.bg-graph-paper`, Inter font
- **No CSV precedent**: Zero CSV parsing in the codebase. All data authored as TS.
- **No keyboard/touch interaction precedent**: No `onKeyDown` handlers for content navigation. Reading mode will pioneer this pattern.
- **File naming**: PascalCase components, camelCase hooks/data. Named exports only. No `React.FC`.
- **Barrel exports**: `src/pages/game/index.ts`, `src/pages/demo/index.ts`
- **Deploy**: GitHub Actions `npm ci && npm run build` → GitHub Pages. SPA routing via `public/404.html`.

### Institutional Learnings

No `docs/solutions/` directory exists. No prior learnings to reference.

## Key Technical Decisions

- **CSV → TypeScript at build time**: Convert `artifacts/ReadingLessonsto100.csv` to a static TypeScript data module in `src/data/reading/`. This is consistent with the existing pattern where all content is authored as typed TS objects. A one-time conversion script handles BOM stripping, quoted-field parsing, and word normalization. No runtime CSV parser needed; no build pipeline changes.
- **ReadingProgressContext pattern**: Follow `GameProgressContext.tsx` — React context with localStorage persistence, try/catch fallback, and migration support. Single key `gradenerd-reading`. State shape: `{ currentLesson, highestLesson, completedLessons, wordCounts }`.
- **No layout route needed**: Since reading mode is a single full-screen page (no sub-routes), a flat route with an inline context provider is simpler than the GameLayout wrapper pattern. The page manages its own state transitions (word traversal → lesson complete → next lesson).
- **Keydown event strategy**: Listen on `keydown` with `event.repeat` guard to prevent held-key advances. Ignore modifier-only, Escape, Tab, and arrow keys. Combine with `onClick` on the page container for tap support.
- **Mid-lesson close**: Lesson restarts from word 1 on revisit. Only completed lessons (R4 trigger) persist their word counts. This avoids partial-state complexity.
- **Font sizing**: Use `clamp()` CSS function for responsive text — minimum 28px on phones, 48px+ on tablets. Later lessons with more words get slightly smaller text via a dynamic scale based on word count.
- **Milestone color palette**: 10 curated colors that cycle. Chosen from the existing Grade Nerd palette and extended with accessible (WCAG AA) vibrant tones suitable for children.

## Open Questions

### Resolved During Planning

- **CSV parsing strategy**: Convert to TS data module (one-time script). Rationale: consistent with all existing data in `src/data/`, no runtime dependency, type-safe.
- **Mid-lesson close behavior**: Restart the lesson. Rationale: simplest approach, avoids storing partial word-highlight position, keeps state shape clean.
- **Font sizing approach**: Use `clamp()` with word-count-based scaling. Rationale: handles the range from 1-word lessons to 15-word sentences without breakpoint complexity.
- **Version tiebreak**: Random among tied versions. Rationale: provides variety on first encounter, no need for deterministic ordering.

### Deferred to Implementation

- Exact `clamp()` values and breakpoints — need visual iteration on real devices.
- Precise milestone color hex values — pick during implementation with on-screen testing.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```
┌─────────────────────────────────────────────────────┐
│  ReadingPage                                        │
│  ┌──────────────────────────────────────────────┐   │
│  │  ReadingProgressProvider (context)            │   │
│  │  State: currentLesson, highestLesson,        │   │
│  │         completedLessons[], wordCounts{}      │   │
│  │  ↕ localStorage sync                         │   │
│  │                                               │   │
│  │  ┌────────────────────────────────────────┐  │   │
│  │  │  LessonDisplay                         │  │   │
│  │  │  - Renders lesson text as Word spans   │  │   │
│  │  │  - Manages highlight index state       │  │   │
│  │  │  - Listens for keydown + click         │  │   │
│  │  │  - Calls context.incrementWord()       │  │   │
│  │  │  - On completion: context.complete()   │  │   │
│  │  └────────────────────────────────────────┘  │   │
│  │                                               │   │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐  │   │
│  │  │ Logo     │  │ Counter  │  │ Nav       │  │   │
│  │  │ (TL)     │  │ (BL)     │  │ arrows/   │  │   │
│  │  │          │  │ milestone│  │ hamburger │  │   │
│  │  └──────────┘  └──────────┘  └───────────┘  │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘

Data flow:
  CSV → (one-time script) → src/data/reading/lessons.ts
  lessons.ts exports: Lesson[], getLesson(n), getWords(lesson)
  
Version selection (R7):
  For lesson N (11-100):
    For each version V in [v1, v2, v3]:
      score(V) = sum(wordCounts[normalize(w)] for w in words(V))
    Pick V with min score; random tiebreak among ties

Progress counter (R10):
  completedNewWords = [getLesson(n).newWord for n in completedLessons]
  minCount = min(wordCounts[w] for w in completedNewWords)
  Each lesson contributes exactly its newWord to the denominator
  Incomplete lessons do not contribute
  Display minCount; check against triangular milestones
```

## Implementation Units

- [ ] **Unit 1: CSV conversion script and data layer**

**Goal:** Convert the CSV to a typed TypeScript data module and establish all reading data types and helpers.

**Requirements:** R6, R7, R9 (data foundation for all)

**Dependencies:** None

**Files:**
- Create: `scripts/convert-reading-csv.ts` (one-time conversion script)
- Create: `src/data/reading/readingTypes.ts`
- Create: `src/data/reading/lessons.ts` (generated output, but hand-tuned)
- Create: `src/data/reading/index.ts`

**Approach:**
- Write a Node script that reads `artifacts/ReadingLessonsto100.csv`, strips the BOM, parses quoted CSV fields properly, and outputs a TypeScript file.
- Define `ReadingLesson` type: `{ lesson: number; newWord: string; collectionSize: number; versions: string[] }` where `versions` is 1 element for lessons 1-10 and 3 elements for 11-100.
- Define `WordInfo` type and normalization function: split on whitespace, strip leading/trailing punctuation chars, lowercase.
- Export helpers: `getLesson(n)`, `getWordTokens(lesson, versionIndex)` (returns `Array<{display: string, normalized: string}>` — display tokens preserve punctuation for rendering, normalized tokens for tracking; single function eliminates parallel-array alignment risk), `selectVersion(lesson, wordCounts)` (R7 algorithm).
- The `selectVersion` function implements: sum word counts per version, pick min, random tiebreak.
- Run via `npx tsx scripts/convert-reading-csv.ts` (script is not covered by tsconfig.json and not compiled by Vite). After running once, the generated `lessons.ts` can be committed and the script kept for reference but not part of the build pipeline.

**Patterns to follow:**
- `src/data/game/gameTypes.ts` for type definitions
- `src/data/game/gameTopics.ts` for data + helper function co-location
- `src/data/game/index.ts` for barrel exports

**Test scenarios:**
- Happy path: `selectVersion` returns the version with lowest total word count when counts differ
- Happy path: `selectVersion` returns a random version when all counts are tied (run multiple times, verify not always the same)
- Happy path: `getWordTokens` returns `[{display: "sam,", normalized: "sam"}]` for "sam," — preserves punctuation for display, strips for tracking
- Edge case: `getWordTokens` on lesson 1 returns `[{display: "am.", normalized: "am"}]` (single-word)
- Edge case: Lesson 14 version 2 text `"ram, read!"` splits into `[{display: "ram,", normalized: "ram"}, {display: "read!", normalized: "read"}]`
- Edge case: `getLesson(0)` and `getLesson(101)` return undefined
- Integration: Generated data matches CSV — spot-check lessons 1, 11, 50, 100 against raw CSV content

**Verification:**
- `lessons.ts` compiles without errors and exports 100 lessons
- `selectVersion` returns valid version indices for all lessons 11-100
- Word normalization produces consistent keys matching the "New word" column values

---

- [ ] **Unit 2: Reading progress state management**

**Goal:** Create the React context and localStorage persistence for all reading state.

**Requirements:** R5, R9, R10 (state foundation)

**Dependencies:** Unit 1 (readingTypes)

**Files:**
- Create: `src/contexts/ReadingProgressContext.tsx` (exports both the context provider and a `useReadingProgress()` convenience hook)

**Approach:**
- State shape: `{ currentLesson: number; highestLesson: number; completedLessons: number[]; wordCounts: Record<string, number> }`
- `STORAGE_KEY = 'gradenerd-reading'`. Use lazy initialization: `useState(() => loadFromLocalStorage())` reads localStorage synchronously on first render, avoiding a flash of initial state for returning users. This replaces the load useEffect entirely — only the save-on-change useEffect is needed. Save via `useEffect` on state change. `createInitialProgress()` factory for when no stored state exists. On corrupt localStorage (invalid JSON or missing keys), fall back to `createInitialProgress()` silently.
- Context exposes: `progress`, `setCurrentLesson(n)`, `completeLesson(lessonNumber, wordsRead: string[])` (marks lesson complete, increments word counts, updates highestLesson), `getMinReadCount()` (R10 calculation over completed lesson words), `getCurrentMilestone()` (triangular number check).
- `completeLesson` increments `wordCounts[word]` for each word in `wordsRead`, adds `lessonNumber` to `completedLessons` if not present, and updates `highestLesson = max(highestLesson, lessonNumber)`.
- `getMinReadCount` looks up the `newWord` for each lesson number in `completedLessons` (via the data layer's `getLesson(n).newWord`), then finds the minimum `wordCounts[newWord]` across that set. Returns 0 if no lessons completed. Using `newWord` per lesson (not all words from the played version) gives a version-independent denominator — each lesson contributes exactly one word to the progress calculation.
- `getCurrentMilestone` returns the highest triangular number T(n) ≤ minReadCount, plus the milestone level n.
- On corrupt localStorage: fall back to `createInitialProgress()` silently.

**Patterns to follow:**
- `src/contexts/GameProgressContext.tsx` — same save-on-change pattern, but use lazy `useState` initializer instead of useEffect-based load (avoids flash of initial state for returning users). Co-locate the `useReadingProgress()` convenience hook in the same context file

**Test scenarios:**
- Happy path: `completeLesson(1, ["am"])` adds lesson 1 to completedLessons, sets wordCounts.am = 1, sets highestLesson = 1
- Happy path: Completing lesson 1 twice increments wordCounts.am to 2
- Happy path: `getMinReadCount()` returns 0 when no lessons completed
- Happy path: `getMinReadCount()` returns 2 when all completed-lesson words have count ≥ 2
- Edge case: `getMinReadCount()` returns 1 when one word among many has count 1
- Edge case: Corrupt localStorage (invalid JSON) falls back to initial state
- Edge case: Stored object with missing keys falls back to initial state
- Integration: `getCurrentMilestone()` returns level 1 at minCount=1, level 2 at minCount=3, level 3 at minCount=6

**Verification:**
- State round-trips through localStorage correctly (save, reload page, state restored)
- `completeLesson` correctly accumulates word counts across multiple completions
- Progress counter calculation matches expected values for known word-count distributions

---

- [ ] **Unit 3: Reading page shell and chrome elements**

**Goal:** Create the full-screen reading page layout with all persistent chrome elements and route integration.

**Requirements:** R1, R12, R13, R14

**Dependencies:** Unit 2 (ReadingProgressContext)

**Files:**
- Create: `src/pages/reading/ReadingPage.tsx`
- Create: `src/pages/reading/components/ProgressCounter.tsx`
- Create: `src/pages/reading/components/LessonNav.tsx`
- Create: `src/pages/reading/components/LessonPicker.tsx` (hamburger menu)
- Create: `src/pages/reading/index.ts`
- Modify: `src/App.tsx` (add route)
- Modify: `src/index.css` (add reading-specific styles if needed)

**Approach:**
- `ReadingPage` is the top-level component. It wraps children in `ReadingProgressProvider` and renders the full-screen layout: `min-h-screen bg-graph-paper` with no nav bar.
- Chrome elements as fixed-position overlays:
  - Top-left: Grade Nerd "gn" logo (small, same as footer logo pattern from `App.tsx` line 505-508)
  - Top-right: Hamburger menu button (three lines icon from lucide)
  - Bottom-left: `ProgressCounter` component
  - Bottom-right: `LessonNav` with back/forward arrows
- `ProgressCounter` displays the current minimum read count number. Styling: bold number in a rounded badge. Size and color controlled by milestone level (passed as prop). Use Framer Motion `animate` for smooth size/color transitions when milestone changes.
- `LessonNav` shows left/right chevron buttons. Visible only in the lesson completion state (after the "Next Lesson" button appears). Hidden during word traversal, which begins on lesson load (R3: first word highlighted immediately). Disabled states: left disabled on lesson 1, right disabled at highest reached lesson.
- `LessonPicker` is a slide-out drawer from the right (Framer Motion `x` animation), ~280px wide on tablet/phone. A semi-transparent scrim covers the remaining viewport; tapping the scrim or pressing Escape dismisses the drawer without navigation. On open, move focus into the drawer and scroll the current lesson into view. On close, return focus to the hamburger button. Shows a flat scrollable list of lesson numbers 1 through `highestLesson` (initial `highestLesson` is 1). Each item shows lesson number and the new word for that lesson. Current lesson highlighted. Tap to navigate (which also closes the drawer).
- Route in `App.tsx`: `<Route path="/reading" element={<ReadingPage />} />`

**Patterns to follow:**
- `src/pages/game/index.ts` for barrel exports
- `src/App.tsx` lines 532-553 for route registration
- `src/pages/game/components/GameNav.tsx` for custom nav component
- `src/components/ui/Button.tsx` for button styling

**Test scenarios:**
- Happy path: `/reading` route renders the full-screen layout with graph-paper background
- Happy path: Logo, progress counter, and hamburger button are visible on load
- Happy path: LessonPicker opens on hamburger click and shows lessons 1 through highestLesson
- Happy path: Tapping a lesson in LessonPicker navigates to that lesson and closes the drawer
- Edge case: LessonNav arrows hidden during active word traversal (isTraversing=true)
- Edge case: Left arrow disabled on lesson 1, right arrow disabled at highest reached
- Edge case: ProgressCounter animates size/color change on milestone level change

**Verification:**
- Page renders at `/reading` with no nav bar, no sidebar
- All 4 chrome elements are positioned correctly (logo TL, counter BL, arrows BR, hamburger TR)
- LessonPicker correctly lists only unlocked lessons
- Responsive: layout works on tablet portrait (768px width) and phone (375px width)

---

- [ ] **Unit 4: Word highlight and lesson interaction**

**Goal:** Implement the core reading mechanic — display lesson text with word-by-word blue underline highlighting, advancing on keypress/tap.

**Requirements:** R2, R3, R4, R6, R9

**Dependencies:** Unit 1 (lesson data, word helpers), Unit 2 (progress context), Unit 3 (page shell)

**Files:**
- Create: `src/pages/reading/components/LessonDisplay.tsx`

**Approach:**
- `LessonDisplay` receives the resolved version text string from `ReadingPage` (which handles version selection). It calls `getWordTokens` to get paired `{display, normalized}` tokens for rendering and tracking.
- Each word is rendered inline as a `<span>` (via `.map()` over `getWordTokens` results inside `LessonDisplay`) with the `display` field (preserving punctuation) and a conditional blue underline on the currently highlighted word.
- The blue underline is a thick `border-bottom` or `text-decoration` in `#0066FF`, only shown on the currently highlighted word.
- Component manages `highlightIndex` local state (starts at 0 on mount/lesson change).
- **Keydown handler** attached to the page container (`useEffect` with `document.addEventListener`):
  - Guard: `if (event.repeat) return` — prevents held-key advances
  - Guard: ignore if key is Escape, Tab, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, or modifier-only (Shift, Control, Alt, Meta alone)
  - Guard: if `event.target` is an interactive element (`button`, `a`, `[role="button"]`), skip word advancement — prevents double-action when pressing Enter/Space on focused chrome buttons
  - If Space, Enter, or printable character: advance `highlightIndex`
  - When `highlightIndex` exceeds last word index: trigger lesson completion
- **Click/tap handler** on page container: same advance logic (no key filtering needed). Chrome element click handlers (hamburger, logo, nav arrows, counter) must call `event.stopPropagation()` to prevent taps from also registering as word advances on the underlying container
- **Lesson completion state**: When the highlight passes the last word, immediately call `context.completeLesson(lessonNumber, normalizedWords)` and set a `lessonComplete` flag. This ensures R4 persistence survives browser close before pressing Next Lesson. In this state, keydown handler only responds to Space/Enter. Renders "Next Lesson" button (minimum 72px height, 200px wide touch target) positioned directly below the lesson text block within the safe-zone content area, ensuring it is always visible without scrolling regardless of lesson length.
- **Font sizing**: Use `clamp()` based on word count. Single-word lessons: ~64px. 5-word sentences: ~48px. 10+ word sentences: ~36px. All values are starting points for design iteration. The text + Next Lesson button must fit within the safe-zone content area without scrolling — if the combination exceeds the available space, reduce font size further. At 36px, even the longest lesson (15 words, ~3 lines) fits comfortably with the 72px button in a typical tablet viewport.
- **Text layout**: Center the lesson text both vertically and horizontally in the viewport. Use `flex items-center justify-center` on the main content area with safe-zone insets: minimum 80px from bottom edge (clearing counter and nav arrows) and 60px from top edge (clearing logo and hamburger).

**Patterns to follow:**
- `src/pages/game/components/QuestionCard.tsx` for interactive card with state transitions
- `src/components/ui/Button.tsx` for the "Next Lesson" button styling

**Test scenarios:**
- Happy path: Lesson 1 ("am.") displays one word with blue underline on "am.", single press triggers completion
- Happy path: Lesson 44 ("mom and sam can sit.") displays 5 words, pressing 5 times highlights each in sequence
- Happy path: After highlighting last word + one more press, "Next Lesson" button appears
- Happy path: Space, Enter, and letter keys all advance the highlight
- Happy path: Tap/click anywhere advances the highlight
- Edge case: Holding a key down does not advance multiple words (event.repeat guard)
- Edge case: Escape, Tab, arrow keys, Shift-alone do not advance
- Edge case: In completion state, Space/Enter/any tap (page container or button) advances to next lesson — letter keys are ignored. The "Next Lesson" button is a visual affordance, not an exclusive gate
- Edge case: Lesson text with commas in CSV (e.g., lesson 14 `"read, sam."`) renders correctly as two words
- Integration: Completing a lesson calls `context.completeLesson` with correct normalized word array
- Integration: After "Next Lesson", the next lesson loads with highlight reset to word 0

**Verification:**
- Word-by-word highlight advances correctly for all lesson lengths (1 word through 15 words)
- Completion flow triggers correctly and persists via context
- Key/tap input behaves exactly as specified — no double-advances, no unwanted key responses
- Text is large and readable on a tablet screen

---

- [ ] **Unit 5: Lesson navigation and version selection**

**Goal:** Wire up lesson-to-lesson navigation (next/prev, hamburger picker) and smart version selection for lessons 11-100.

**Requirements:** R5, R7, R8

**Dependencies:** Unit 1 (selectVersion), Unit 2 (context), Unit 3 (LessonNav, LessonPicker), Unit 4 (LessonDisplay)

**Files:**
- Modify: `src/pages/reading/ReadingPage.tsx` (orchestrate lesson loading, version selection, navigation)
- Modify: `src/pages/reading/components/LessonNav.tsx` (wire click handlers)
- Modify: `src/pages/reading/components/LessonPicker.tsx` (wire navigation)

**Approach:**
- `ReadingPage` owns the "which lesson and version to show" logic:
  - On mount: load `currentLesson` from context
  - Call `selectVersion(lesson, wordCounts)` to determine version index for lessons 11-100
  - Pass lesson data + version text to `LessonDisplay`
- **Next Lesson flow** (from LessonDisplay completion callback):
  - If currentLesson < 100: set currentLesson to currentLesson + 1, update context
  - If currentLesson = 100: the normal completion sequence plays (last word → press → `completeLesson` fires). Instead of a "Next Lesson" button, show an inline celebration message ("You finished all 100 lessons!") in the same position. The completion state rules still apply (Space/Enter/tap to dismiss, though there is no next lesson to advance to). The progress counter, back arrow, and hamburger menu remain available so the child can replay any lesson
- **Back/forward arrows**:
  - Back: navigate to `max(1, currentLesson - 1)`
  - Forward: navigate to `min(highestLesson, currentLesson + 1)`
  - Both update context's currentLesson
- **LessonPicker navigation**: set currentLesson directly to the selected lesson number
- Version selection runs fresh each time a lesson is loaded (not cached), ensuring replayed lessons always pick based on current word counts
- Lesson transitions (next, back, picker navigation) use a brief crossfade (Framer Motion `AnimatePresence` with `mode="wait"`, ~150ms) to provide visual continuity when lesson text changes

**Patterns to follow:**
- State management flow in `src/pages/game/Game.tsx` for multi-screen navigation

**Test scenarios:**
- Happy path: Completing lesson 5 auto-advances to lesson 6
- Happy path: Pressing back arrow on lesson 10 navigates to lesson 9
- Happy path: Forward arrow on lesson 10 navigates to lesson 11 (if highestLesson ≥ 11)
- Happy path: LessonPicker tap on lesson 3 navigates directly to lesson 3
- Happy path: Lesson 11 version selection picks the version with lowest word count sum
- Happy path: Replaying lesson 11 after reading more picks a different version if counts have shifted
- Edge case: Back arrow on lesson 1 is disabled / does nothing
- Edge case: Forward arrow at highestLesson is disabled / does nothing
- Edge case: Lesson 100 completion shows celebration state instead of advancing
- Edge case: Version selection on first encounter of lesson 11 (all counts 0) picks randomly
- Integration: Navigation updates context.currentLesson which persists to localStorage

**Verification:**
- Linear progression works from lesson 1 to 100
- Replay via arrows and picker works for any previously reached lesson
- Version selection demonstrably favors under-practiced words on replay
- Current lesson persists across browser refresh

---

- [ ] **Unit 6: Progress counter milestones and visual feedback**

**Goal:** Implement the triangular-number milestone system with animated size growth and color cycling on the progress counter.

**Requirements:** R10, R11

**Dependencies:** Unit 2 (getMinReadCount, getCurrentMilestone), Unit 3 (ProgressCounter component shell)

**Files:**
- Modify: `src/pages/reading/components/ProgressCounter.tsx` (add milestone animation logic)

**Approach:**
- `ProgressCounter` reads `getMinReadCount()` and `getCurrentMilestone()` from context.
- Displays the current min read count as a bold number.
- **Size scaling**: Base size 24px. Each milestone level adds ~2px, up to a cap of ~48px. Use Framer Motion `animate={{ fontSize }}` for smooth transitions (not `scale`, which transforms visually without affecting layout).
- **Color cycling**: 10-color palette: `#0066FF` (blue), `#10B981` (emerald), `#F59E0B` (amber), `#EF4444` (red), `#8B5CF6` (violet), `#EC4899` (pink), `#14B8A6` (teal), `#F97316` (orange), `#6366F1` (indigo), `#84CC16` (lime). WCAG AA compliant at the sizes used. Milestone level modulo 10 determines color index. Use Framer Motion `animate={{ color }}` for smooth transitions.
- **Milestone celebration**: Track the previous milestone level in a `useRef`. When `getCurrentMilestone().level` exceeds the ref value, trigger a pulse (scale up 1.3x then back) with Framer Motion and update the ref. This prevents false pulses on unrelated re-renders or page navigation.
- Triangular number helper: `T(n) = n * (n + 1) / 2`. To find current level from minCount: solve `n` where `T(n) ≤ minCount < T(n+1)`, which is `n = floor((-1 + sqrt(1 + 8 * minCount)) / 2)`.

**Patterns to follow:**
- `src/pages/game/components/PointsDisplay.tsx` for compact badge display
- `src/pages/game/components/PointsToast.tsx` for animated notification
- `src/pages/game/components/UnlockAnimation.tsx` for celebration animation pattern

**Test scenarios:**
- Happy path: Counter shows 0 when no lessons completed
- Happy path: Counter shows 1 after completing lesson 1 once (min of {am: 1} = 1)
- Happy path: Counter shows 2 after completing lessons 1 and 2 twice each
- Happy path: Counter changes color when minCount crosses from 2 to 3 (milestone level 1 → 2)
- Happy path: Counter grows in size at each milestone (visible difference between level 1 and level 5)
- Edge case: Color cycles back to first color at milestone level 11 (modulo 10)
- Edge case: Triangular number detection: levels are correct at counts 1, 3, 6, 10, 15, 21, 28, 36, 45, 55
- Integration: Completing a replayed lesson updates the counter in real-time if minCount changes

**Verification:**
- Counter accurately reflects minimum word read count across completed lessons
- Milestone transitions are visually apparent (color change + size growth + pulse)
- Counter does not flicker or jump during normal lesson progression

## System-Wide Impact

- **Interaction graph:** ReadingPage → ReadingProgressContext → localStorage. No callbacks to other features. No middleware or observers affected.
- **Error propagation:** Corrupt localStorage → silent fallback to initial state (lesson 1, zero counts). No error UI needed — the worst case is lost progress.
- **State lifecycle risks:** Mid-lesson browser close is handled (lesson restarts, no partial state). The only write to localStorage happens on lesson completion, minimizing write frequency.
- **API surface parity:** No APIs involved. No external surfaces affected.
- **Integration coverage:** The reading feature is fully isolated. The only integration point is the route registration in `App.tsx`, which follows the established pattern.
- **Unchanged invariants:** All existing routes, pages, and features are unaffected. The reading mode shares no state with the math demo, game, or survey features.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| CSV data has encoding issues (BOM, quoted fields) | Conversion script handles BOM stripping and proper CSV parsing. Generated output is verified against source. |
| Font sizing doesn't work for all lesson lengths | Use `clamp()` with word-count-based scaling. Defer exact values to visual iteration during implementation. |
| Touch targets too small for ages 4-6 | Full-screen tap area for word advance. Chrome buttons use minimum 44x44px touch targets. |
| localStorage cleared by browser/parent | Accepted limitation per scope boundaries. State starts fresh — no data corruption risk. |
| 100-lesson hamburger menu is unwieldy | Start with flat list; can add grouping (1-10, 11-20, ...) during implementation if needed. |

## Sources & References

- **Origin document:** [docs/brainstorms/reading-mode-requirements.md](docs/brainstorms/reading-mode-requirements.md)
- State persistence pattern: `src/contexts/GameProgressContext.tsx`
- Data layer pattern: `src/data/game/gameTopics.ts`
- Route pattern: `src/App.tsx`
- UI components: `src/components/ui/Button.tsx`, `src/components/ui/EducationalPanel.tsx`
- Animation patterns: `src/pages/game/components/UnlockAnimation.tsx`, `src/pages/game/components/PointsToast.tsx`
