---
date: 2026-04-16
topic: reading-mode
---

# Reading Mode

## Problem Frame

Grade Nerd currently serves high school math students. The team wants to expand into early reading education (ages 4-6) using a curated set of 100 progressive reading lessons. The lessons live in `artifacts/ReadingLessonsto100.csv` and follow a carefully designed pedagogy: each lesson introduces exactly one new word, and all sentences use only previously introduced vocabulary. The goal is a simple, distraction-free tool where a young child can practice reading with a parent or independently, building fluency through repetition.

## Requirements

**Lesson Display & Interaction**

- R1. The reading mode lives at `/reading` as a full-screen, distraction-free experience — no nav bar, no sidebar.
- R2. Show the entire lesson text for the current lesson at once in large, readable text. (Later lessons contain multiple sentences per version, e.g., "the cat was mad. the rat was sad. fat mom!")
- R3. A blue underline highlights the current word. The first word is highlighted on lesson load. Space, Enter, or any printable keypress advances the highlight to the next word; screen tap anywhere also advances. Modifier-only keys, Escape, Tab, and arrow keys do not advance. Key-repeat (holding a key) fires only once.
- R4. When the highlight reaches the last word and the user presses again, the lesson is marked as completed and a "Next Lesson" button appears centered below the lesson text. The last word's highlight remains visible. Only Space, Enter, or tapping the button advances to the next lesson — other keys are ignored in this state. Completion persists even if the user closes the browser before pressing Next Lesson.

**Lesson Progression & Selection**

- R5. Lessons progress linearly from 1 to 100. The app persists the current lesson (single-user, no accounts).
- R6. For lessons 1-10 (single sentence version), display the one available sentence.
- R7. For lessons 11-100 (three sentence versions), select the version whose words have the lowest total read count (sum all word read counts in each version, pick the version with the lowest sum). If two or more versions tie, select uniformly at random among the tied versions.
- R8. The user can replay any previously completed lesson. Navigation uses back/forward arrows on the main screen (lesson-level only, not visible during active word traversal) plus a hamburger menu with the full lesson list (lessons 1 through highest ever reached — this value only increases, never decreases). The hamburger menu is primarily parent-operated.

**Word Read Tracking & Progress Display**

- R9. Track how many times each word has been "read" (incremented each time the blue underline passes over it during a lesson, including replays). Words are normalized for tracking: split on whitespace, strip leading/trailing punctuation, lowercase. The "New word" column in the CSV provides the canonical vocabulary list.
- R10. Display a progress counter in the bottom-left corner showing the minimum read count across all words from lessons the user has fully completed at least once (see R4 for when a lesson is marked completed). Newly introduced words do not enter the progress counter denominator until their lesson is completed, so the counter is not dragged down by forward progress. Note: R7's version selection algorithm uses word read counts independently of the progress counter denominator — all word counts are tracked globally (R9) regardless of whether they appear in R10's calculation.
- R11. Progress milestones follow the triangular number sequence (1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...). When the minimum read count reaches the next triangular number, the counter grows slightly in size and shifts to the next color in a curated palette that fits Grade Nerd's visual style.

**Branding**

- R12. Use Grade Nerd branding (logo, fonts, color palette, graph-paper background pattern) adapted for a young-child context — same identity, age-appropriate presentation.
- R13. Persistent chrome elements are limited to: Grade Nerd logo (top-left corner), progress counter (bottom-left), back/forward lesson arrows (bottom-right, hidden during active word traversal), and hamburger menu button (top-right). These are the only elements besides lesson text.
- R14. The `/reading` route is accessed via a direct URL shared to parents (e.g., bookmarked on a child's tablet). No link from the main Grade Nerd pages is required.

## Success Criteria

- A child can start at lesson 1 and progress through all 100 lessons with no friction — tap/press to advance words, tap to go to next lesson.
- The progress counter accurately reflects the minimum word read count across completed lessons and visually levels up at each triangular number milestone.
- Version selection for lessons 11+ demonstrably favors sentences containing under-practiced words.
- All state (current lesson, word read counts) persists across browser sessions via localStorage.

## Scope Boundaries

- No accounts, authentication, or multi-user support — single user via localStorage.
- No audio/text-to-speech — the child reads aloud with or without a parent.
- No gamification beyond the progress counter (no badges, streaks, or rewards).
- No integration with the math demo, game, or survey pages.
- No custom content — lessons come exclusively from the CSV data.

## Key Decisions

- **Full-screen focus mode**: Young children need zero distractions. The standard Grade Nerd nav bar is omitted.
- **Triangular number milestones**: Provides infinitely scaling, non-linear goals that feel rewarding without a fixed ceiling. The growing/recoloring counter gives visual feedback without added UI complexity.
- **Smart version selection (R7)**: Rather than fixed ordering, picking the version with the lowest total word read count maximizes the pedagogical value of each lesson replay. On first encounter (all counts tied at zero), a random tiebreak provides variety.
- **Replay allowed**: Since the core goal is repetition (read every word many times), replaying earlier lessons is essential and explicitly supported.

## Dependencies / Assumptions

- Content source: `artifacts/ReadingLessonsto100.csv` is the single source of truth. The CSV structure (Lesson, New word, Collection size, Version 1, Version 2, Version 3) is stable. The CSV has a UTF-8 BOM and contains quoted fields with embedded commas — the parser must handle both.
- Lessons 1-10 have only Version 1 populated (each is a single word with punctuation, e.g., "am.", "see!"). Lessons 11-100 have all three versions.
- Lessons 1-10 will produce a degenerate highlight interaction (one word, one tap) — this is accepted as a brief warm-up before multi-word sentences begin at lesson 11.

## Outstanding Questions

### Deferred to Planning

- [Affects R2][Technical] What font size and line height work best for early readers on various screen sizes? Primary target device is tablet (portrait). Needs design iteration.
- [Affects R11][Technical] Curated color palette for milestone levels — needs to be visually distinct, accessible (WCAG AA), on-brand, and handle the infinite triangular number sequence (cycle through the palette).
- [Affects R8][Technical] Hamburger menu design for lesson picker — parent-operated, so adult-appropriate patterns are acceptable. Simple scrollable list of lesson numbers.
- [Affects R9][Technical] What happens when a user is mid-lesson and closes the browser? Save partial progress or restart the lesson?
- [Affects Dependencies][Technical] CSV parsing strategy — convert to TypeScript data module at build time (consistent with existing `src/data/` patterns) or add a runtime CSV parser. The CSV lives in `artifacts/` which Vite won't bundle automatically.

## Next Steps

-> `/ce:plan` for structured implementation planning
