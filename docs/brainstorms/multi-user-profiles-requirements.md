---
date: 2026-04-17
topic: multi-user-profiles
---

# Multi-User Profiles for Reading and Game Modes

## Problem Frame

Grade Nerd currently stores all progress in localStorage as a single anonymous user per browser. In classroom and family settings, multiple learners share the same device. Without user profiles, one child's progress overwrites another's, and there's no way to track individual progress or start fresh for a new learner.

## Requirements

**User Selection Gate**

- R1. The app displays a user selection screen before any content is accessible. No reading, game, or other pages are reachable until a user is selected.
- R2. The selection screen shows all existing usernames and an option to create a new user.
- R3. Tapping an existing username enters the app as that user immediately (no password).

**User Creation**

- R4. New users are created by entering a simple alphanumeric username (letters and numbers only, maximum 20 characters).
- R5. Usernames are case-insensitive and unique (e.g., "Sam" and "sam" are the same user).
- R6. The system supports up to 100 users. Attempts to create beyond 100 show a clear message.

**User-Scoped Progress**

- R7. Each user has independent reading progress (currentLesson, highestLesson, completedLessons, wordCounts).
- R8. Each user has independent game progress (topic progress, quiz scores, points, avatar customization, equipped items).
- R9. Switching users loads that user's progress; the previous user's state is preserved.

**Progress Reset**

- R10. A logged-in user can reset their own progress from within the app (not from the user selection screen).
- R11. Reset clears all progress (reading + game) back to fresh initial state. The username is preserved.
- R12. Reset requires a confirmation step to prevent accidental data loss. The confirmation is sufficient protection; no identity re-verification is needed.

**Data Migration**

- R15. On first launch after upgrade, if legacy single-user localStorage data exists (keys without user scoping), the app prompts the user to enter a name for their existing profile before proceeding. The legacy data is migrated to that named user. If no legacy data exists, the app goes directly to user creation.

**User Deletion**

- R16. A user can be deleted from the user selection screen. Deletion removes the username and all associated progress data (reading, game, passion, demo state).
- R17. Deletion requires a confirmation step to prevent accidental data loss.

**Session Persistence**

- R13. The currently selected user persists across page reloads (the user doesn't have to re-select on refresh).
- R14. A "switch user" or "log out" action returns to the user selection screen.

## Success Criteria

- Multiple users on the same device each see only their own reading and game progress
- Creating a new user starts with completely fresh progress in both modes
- Resetting a user returns them to day-one state without affecting other users
- Existing single-user progress is not lost on upgrade (user is prompted to name their profile, then data is migrated)

## Scope Boundaries

- No passwords, authentication, or server-side storage — stays pure localStorage
- No cross-device sync — progress is tied to the browser
- No admin role or teacher dashboard — all users are equal; any user can delete any other user from the selection screen
- No per-mode reset (reading vs game independently) — reset is all-or-nothing
- User passion/interest (`gradenerd-user-passion`), demo viewed-topics (`gradenerd-viewed-topics`), and demo intro flag (`gradenerd-seen-intro`) should also be user-scoped
- The user selection screen does not show progress details — it's just a name list

## Key Decisions

- **App-level gate over per-mode entry**: A single selection point is simpler and ensures all state is user-scoped from the start. Per-mode entry would require handling the "no user selected" state in every feature area.
- **Full wipe over per-mode reset**: Reduces UI complexity (one reset button vs two) and matches the "start fresh" mental model. Per-mode reset can be added later if needed.
- **Reset from within session only**: Prevents one user from accidentally or intentionally resetting another user's progress when browsing the user list.
- **Case-insensitive usernames**: Avoids confusion in a classroom where a child might type "Sam" one day and "sam" the next.
- **Name prompt on migration over silent default**: When legacy data exists, prompting for a name gives the existing user ownership of their data rather than assigning an impersonal "Player 1" default.
- **User deletion from selection screen**: Prevents permanent accumulation toward the 100-user cap. Deletion lives on the selection screen (not within a session) since it's an administrative action affecting the user list.
- **Gate all routes**: Non-stateful routes like `/helpwithdata` and `/survey` are low-traffic; gating them keeps the implementation simple and the UX consistent.
- **R12 confirmation is sufficient for reset**: In family/classroom settings, trust is assumed. Adding identity re-verification would add friction without meaningful safety gain.

## Dependencies / Assumptions

- localStorage has a ~5MB limit per origin. With 100 users, each storing reading progress (wordCounts can grow to ~200 words) and game progress (topic scores, avatar items), storage should stay well under this limit.
- The existing `ReadingProgressContext` and `GameProgressContext` will need their localStorage key strategy updated to be user-scoped.
- The existing `useUserPassion` hook (`src/hooks/useUserPassion.ts`, key `gradenerd-user-passion`), `useProgress` hook (`src/hooks/useProgress.ts`, key `gradenerd-viewed-topics`), and the demo intro flag (`gradenerd-seen-intro` in `src/pages/demo/Demo.tsx`) will also need user-scoped key strategies.
- A new user registry (e.g., key `gradenerd-users`) will store the list of usernames. This is a net-new localStorage key, not a migration of an existing one.

## Outstanding Questions

### Deferred to Planning

- [Affects R14][Technical] Where should the "switch user" / "log out" action live in the UI? Candidates: hamburger menu on reading page, game layout header, or a persistent element.
- [Affects R10][Technical] Where should the "reset progress" action live? Candidates: same location as switch user, a settings/profile area, or a long-press on the user selection screen.

## Next Steps

-> `/ce:plan` for structured implementation planning
