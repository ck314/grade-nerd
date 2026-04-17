---
date: 2026-04-17
topic: reading-polish
---

# Reading Mode Polish: Punctuation Cleanup & Decorative Stick Figures

## Problem Frame

The reading mode's first 40 lessons currently display punctuation (periods, exclamation marks, commas) that adds visual noise for early readers. Since these lessons use short, simple text, the punctuation is unnecessary and potentially confusing — except for question marks, which change the meaning. Separately, the reading screens feel visually sparse. Adding a random decorative stick figure (using the existing avatar system from `/game`) would make the experience more engaging and playful for young children.

## Requirements

**Punctuation Cleanup (Lessons 1-40)**

- R1. For lessons 1 through 40, remove all punctuation from the displayed lesson text except question marks.
- R2. All punctuation except question marks (`?`) is removed. Currently this includes periods (`.`), exclamation marks (`!`), and commas (`,`).
- R3. The `normalized` field (used for word mastery tracking) is unaffected — it already strips punctuation.

**Decorative Stick Figure**

- R4. Every reading screen (both the lesson view during word traversal and the completed-lesson view with "Next Lesson" button) displays a single decorative stick figure.
- R5. The stick figure uses the existing `CustomizableAvatar` component at `lg` size (96px wide, 192px tall), with `level={1}` and no `onClick` or `showClickHint` props so no badge or click affordance is rendered.
- R6. The figure is equipped with a random number of accessories (0-4 items), randomly selected from the 25 available avatar items with at most one item per category (head, face, body, effects), and a random pose variant (standing, thinking, teaching, qed).
- R7. The figure's appearance (pose, items) and position re-randomize on every screen transition — each new lesson load, going back, or navigating via the lesson picker. The lesson-complete state (button appears) is not a screen transition; the figure stays in place.
- R8. The figure is placed in a randomly selected safe zone. Safe zones include the left and right margins (which may extend inward 1-3 inches depending on text width), the area above the text, and the area below the text. The figure must not overlap text content, UI controls (logo, hamburger, progress counter, lesson nav), or extend off-screen. On viewports narrower than ~480px, the figure scales down to `md` or `sm` size to fit available safe zones.
- R9. The stick figure is purely decorative — it does not respond to clicks or affect lesson interaction. The figure element uses `pointer-events: none` so all clicks pass through to the lesson container beneath it.

## Success Criteria

- Lessons 1-40 display clean text without periods, exclamation marks, or commas; question marks still appear
- Lessons 41-100 are unchanged
- A stick figure with random accessories appears on every reading screen in a non-overlapping position
- The figure changes on each screen transition
- Word mastery tracking is unaffected by the punctuation changes

## Scope Boundaries

- Punctuation changes apply only to the display layer for lessons 1-40; the underlying lesson data or normalized words are not changed
- The stick figure appears only on reading mode screens, not on the home page, survey, or game screens
- No new avatar items are being added — uses the existing 25 items
- The figure is non-interactive (no store, no customization, no unlocking in reading mode)

## Key Decisions

- **Full CustomizableAvatar over simple StickFigure**: Reuses the richer avatar system for maximum visual variety and delight
- **Re-randomize each screen**: Keeps the experience surprising and playful rather than static
- **0-4 random items, one per category**: Maximum variety while avoiding visual glitches from stacked items
- **Safe-zone positioning**: Predefined safe regions (margins, above/below text) rather than runtime collision detection — simple, reliable, still feels random
- **Large size with responsive fallback**: `lg` on large screens, scales to `md`/`sm` on narrow viewports
- **Display-layer punctuation stripping**: Preserves the original lesson data integrity while showing clean text

## Next Steps

-> `/ce:plan` for structured implementation planning
