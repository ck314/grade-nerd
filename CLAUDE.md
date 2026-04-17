# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build to dist/
npm run lint     # ESLint check
npm run preview  # Preview production build locally
```

## Architecture

**Grade Nerd** is a React educational app that personalizes math learning by connecting concepts to student interests.

### Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + Framer Motion
- React Router DOM for routing
- Deploys to GitHub Pages at `/grade-nerd/` base path

### Project Structure
```
src/
├── App.tsx              # Main router and home page
├── components/
│   ├── ui/              # Reusable components (Button, ComicPanel, SpeechBubble)
│   └── graphics/        # Visual components (Mascot, PowBurst, StickFigures)
├── pages/               # Route components (HelpUsBuild, Survey)
└── lib/utils.ts         # cn() utility for Tailwind class merging
docs/solutions/          # Documented solutions to past bugs, organized by category with YAML frontmatter (module, tags, problem_type)
```

### Key Patterns

**Styling:** Uses `cn()` utility from `lib/utils.ts` (clsx + tailwind-merge) for conditional class merging.

**Forms:** Survey page submits directly to Google Forms via POST - no backend required. Form fields map to Google Form entry IDs.

**Animation:** Framer Motion for page entrance animations with consistent fade-in patterns.

**Deployment:** Push to `main` triggers GitHub Actions workflow that builds and deploys to GitHub Pages.

### Routes
- `/` - Landing page (in App.tsx)
- `/helpwithdata` - Contribution/help page
- `/survey` - Google Form questionnaire
