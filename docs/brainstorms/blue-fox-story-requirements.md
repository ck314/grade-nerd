---
date: 2026-05-07
topic: blue-fox-red-whale-story
---

# Blue Fox Red Whale: Big Content Words & Story Mode

## Problem Frame

The reading app currently teaches phonics through 175 progressive lessons, but there's no narrative reward layer. Kids complete lessons without a sense of building toward something bigger. This feature adds a two-part reward system: (1) Big Content Words earned after select lessons that build vocabulary for a story, and (2) an illustrated story experience that unlocks after lesson 100 — giving kids a powerful reason to keep reading.

## Requirements

**Part 1: Big Content Words**

- R1. After completing each of the 61 designated lessons (per the "Big Content Words" sheet in `artifacts/Blue Fox Story Data.xlsx`), the user earns a Big Content Word.
- R2. First-time completion triggers a full-screen celebratory reveal showing the word and its generated image. Tap anywhere to dismiss; dismissal advances directly to the next lesson. "First-time" means the lesson was not in `completedLessons` when completion fires.
- R3. Revisiting a completed lesson shows an inline badge on the lesson completion screen reinforcing the earned word and its image, without the full celebration. The badge is a small card with the word image and word text, visible after the last word is read alongside the "Next Lesson" button.
- R4. Each of the 61 Big Content Words has a unique image generated via Nano Banana 2, styled to match `artifacts/Blue Fox Red Whale Base Image.jpg` — simple, minimal, watercolor-style illustrations representing the word using the Blue Fox Red Whale characters.
- R5. A persistent word collection gallery lives at a separate route (e.g. `/reading/collection`) where users can browse all earned words and their images. Unearned words appear locked/grayed.

**Part 2: Story Mode**

- R6. The Blue Fox Red Whale story unlocks when the user has earned all 61 Big Content Words. The 61st word ("gold") is earned after lesson 100. All 61 designated lessons fall within lessons 1–100 (verified against data sheet). If a user reaches lesson 100 without completing all designated lessons, the story remains locked until all 61 words are collected.
- R7. An invitation/unlock screen appears after earning "gold," introducing the story with the base image and a "Start Reading" button. Tapping elsewhere dismisses the invitation. After dismissal (or after starting and exiting), the story is accessible via a persistent icon in the reading page header.
- R8. The story consists of 25 pages, each containing 4 chapters (100 chapters total, verified against the "Story Chapters" sheet in `artifacts/Blue Fox Story Data.xlsx`).
- R9. Each page has a 4-panel illustration generated via Nano Banana 2, with each panel depicting its corresponding chapter's content, styled consistently with the base image.
- R10. Layout is side-by-side on wider screens (image panels on one side, chapter text on the other), stacking vertically on mobile.
- R11. All 4 panels start blurred/grayed. Each panel sharpens into full color when its corresponding chapter text first appears (the reveal sets the scene before reading, not after).
- R12. Default reading mode is tap/click to advance through chapter text. A toggle switches to the word-tap mechanic (same as lesson mode where you tap each word).
- R13. Story progress persists per-user (per-chapter granularity), so users can leave and resume at the last unread chapter. Story pages are strictly sequential — prev/next navigation only, no page picker.

**Navigation**

- R18. The reading page header gains two icons: a collection gallery icon (visible once the first Big Content Word is earned) and a story icon (visible once the story is unlocked). These provide persistent access to the respective screens.

**Image Generation**

- R14. Generate 61 individual word images for Part 1 Big Content Words using Nano Banana 2.
- R15. Generate 25 four-panel story images for Part 2 using Nano Banana 2, each panel illustrating one chapter's narrative.
- R16. All images use the visual style of `artifacts/Blue Fox Red Whale Base Image.jpg`: watercolor illustration, featuring the four characters (Blue Fox, Red Whale, Pink Frog, Green Shark), bright and friendly.
- R17. Establish a base prompt string for Nano Banana 2 that produces consistent style across all 86 images (61 word images + 25 story panels), documented in a single reference artifact.

## Success Criteria

- A child completing lessons 1–100 encounters Big Content Word rewards at the correct 61 lesson checkpoints, with celebratory reveals on first completion and inline reinforcement on revisit.
- The word collection gallery shows earned words with images and locked placeholders for unearned words.
- After completing lesson 100, the story mode unlocks and is navigable across 25 pages with panel-reveal mechanics.
- All generated images are stylistically consistent with the base image.
- Story progress persists across sessions per user profile.

## Scope Boundaries

- Lessons 101–175 do not have Big Content Words — the word/story system only covers lessons 1–100. This is intentional: the story is a reward for mastering the foundational vocabulary. A second story arc for lessons 101–175 may be added later.
- The story is read-only — no interactive quizzes or comprehension checks within story mode.
- No audio or text-to-speech for the story (could be added later).
- Image generation is a one-time batch process, not runtime generation. Images are stored as static assets in `public/` and lazy-loaded. Format and resolution optimization deferred to planning.

## Key Decisions

- **Full-screen vs. inline reward**: Full-screen reveal for first-time only; inline badge on revisit. Balances celebration with not blocking repeat practice.
- **Story unlock trigger**: All 61 words collected (not just lesson 100 completion). Users who skip designated lessons must go back. The "gold" word is the narrative climax.
- **Panel reveal timing**: Panels sharpen when chapter text first appears (sets the scene), not after finishing the chapter. Blur-to-sharp rather than hidden-to-visible.
- **Dual reading modes in story**: Tap-to-advance default with word-tap toggle. Kept despite complexity because it serves parents who want practice even in the story.
- **Side-by-side layout**: Image and text paired horizontally on desktop, stacked on mobile. Keeps the visual reward visible while reading.
- **Celebration dismissal**: Tap anywhere to dismiss the full-screen reveal; advances directly to next lesson. Simple and consistent with the app's tap-to-advance pattern.
- **Story navigation**: Strictly sequential (prev/next), no page picker. The story is meant to be read linearly.
- **Navigation access**: Persistent header icons for collection gallery and story mode, appearing once unlocked. No navigation buried in drawers.

## Dependencies / Assumptions

- Nano Banana 2 API access with a user-provided key for image generation.
- The existing multi-user profile system (per `src/contexts/ReadingProgressContext.tsx`) will be extended to track Big Content Word collection and story progress.
- The base image style is reproducible via prompt engineering with Nano Banana 2.

## Outstanding Questions

### Deferred to Planning
- [Affects R4, R9][Needs research] What is the optimal Nano Banana 2 prompt structure for consistent watercolor-style output matching the base image? Requires experimentation with the API.
- [Affects R5, R18][Resolved] Navigation uses persistent header icons on the reading page (collection icon visible after first word earned, story icon visible after story unlocked). Routes: `/reading/collection` and `/reading/story`.
- [Affects R13][Technical] Story progress should track per-chapter (100 boolean flags + current position). This satisfies both R11 (panel reveal per chapter read) and R13 (resume to last unread chapter). Confirm this fits within the existing progress context structure.
- [Affects R11][Technical] What CSS/canvas technique gives the best blur-to-sharp panel reveal effect with the generated images?

## Next Steps

-> `/ce:plan` for structured implementation planning
