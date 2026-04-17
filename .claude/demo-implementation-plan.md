# Grade Nerd Demo Implementation Plan

## Overview
Create a demo version of Grade Nerd that showcases the core value proposition: learning math through personalized interests. The demo features 17 math topics and 3 interest areas (Economics, Physics, Neural Networks) with an option for users to input their own passion.

## Target Audience
- High school math teachers (for feedback on educational value)
- High school students (for feedback on engagement and usability)

## Primary Goal
Students try the demo, understand the vision (any interest, not just these 3), and fill out a questionnaire with feedback.

---

## Content Source
All content comes from the `Notion Data/` folder:
- **17 Math Topics** (GN 01-17)
- **3 Interest Areas**: Economics, Physics, Neural Networks
- **ELI5 Content**: nn-5-year-old files (for Neural Networks only)
- **Images**: PNG files for each topic/interest combination

### Content Structure per Topic
Each topic has:
- `XX-topic-main.html` - Core topic explanation
- `XX-topic-economics.html` + `.png` - Economics application
- `XX-topic-physics.html` + `.png` - Physics application
- `XX-topic-neural-networks.html` + `.png` - Neural Networks application
- `XX-topic-nn-5-year-old.html` + `.png` - Simplified Neural Networks explanation

---

## User Flow

### 1. Entry Point (Modified Homepage)
- Keep current homepage design
- Replace "Take the Questionnaire" CTA with **"Try The Demo"** button
- Keep "Help Us Build" button in nav (that page gets CTA to try demo)
- Demo accessible at `/demo` route

### 2. Demo Landing/Intro Page (`/demo`)
Brief intro explaining:
- What Grade Nerd does (connects math to YOUR interests)
- What they'll experience (17 topics × 3 interest areas as a preview)
- The vision: in the full app, this would be YOUR passion, not just Economics/Physics/Neural Networks

### 3. Interest/Topic Selection
**Dual navigation approach:**
- Can browse by **Math Topic** → then pick an interest lens
- Can browse by **Interest Area** → then see all topics through that lens
- **"My #1 Passion" option**: User enters their passion, we collect it, then randomly show them one of the 3 available interests with a message: "In the full app, this would be [Your Passion] content"

### 4. Content View Page
For each topic + interest combination:
- **Featured image** (the PNG from Notion Data)
- **Extracted content** from HTML (rendered in custom React components matching app style)
- **For Neural Networks only**: "Simplify" toggle to show the nn-5-year-old content
- **Progress indicator**: Checkmark for viewed topics (persisted in localStorage)
- **Navigation**: Easy way to see other interests for same topic, or other topics

### 5. Persistent Feedback CTA
- Always-visible "Give Feedback" button in nav/corner
- Links to modified `/survey` page

### 6. Modified Survey Page (`/survey`)
Collect:
1. Their #1 passion (pre-filled if they entered it in the demo)
2. One SMALL thing to make the app better
3. One BIG thing to make the app better
4. (Existing) "Want to shape Grade Nerd?" → Email collection

---

## Technical Implementation

### New Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/demo` | `<Demo />` | Demo intro + navigation hub |
| `/demo/topic/:topicId` | `<TopicView />` | View a topic with interest selection |
| `/demo/interest/:interestId` | `<InterestView />` | View all topics for an interest |
| `/demo/topic/:topicId/:interestId` | `<ContentView />` | Full content view |

### New Components

#### Data Layer
```
src/data/
├── topics.ts          # 17 topics with metadata (id, name, description)
├── interests.ts       # 3 interests with metadata
└── content/           # Extracted content from Notion HTML
    ├── 01-linear-equations/
    │   ├── main.ts
    │   ├── economics.ts
    │   ├── physics.ts
    │   ├── neural-networks.ts
    │   └── eli5.ts
    └── ... (repeat for all 17 topics)
```

#### UI Components
```
src/pages/demo/
├── Demo.tsx              # Demo landing/intro page
├── TopicList.tsx         # Grid of 17 topics
├── InterestList.tsx      # Grid of 3 interests + "My Passion" option
├── ContentView.tsx       # Main content display page
└── components/
    ├── TopicCard.tsx     # Topic preview card with progress indicator
    ├── InterestCard.tsx  # Interest area card
    ├── ContentRenderer.tsx # Renders extracted Notion content
    ├── SimplifyToggle.tsx  # ELI5 toggle for Neural Networks
    ├── ProgressTracker.tsx # Shows viewed topics
    ├── FeedbackButton.tsx  # Persistent feedback CTA
    └── MyPassionModal.tsx  # Modal to collect user's passion
```

#### State Management
```typescript
// localStorage keys
- 'gradenerd-viewed-topics': string[]  // Array of "topicId-interestId" combinations
- 'gradenerd-user-passion': string     // User's entered passion (for survey pre-fill)
```

### Content Extraction Strategy
For each Notion HTML file, extract:
1. **Title** (from `<h1>` or page-title)
2. **Sections** (from `<h2>`, `<h3>` headings)
3. **Concept explanation** (first paragraph/section)
4. **Formula/equation** if present
5. **Example problem** with step-by-step solution
6. **Key terms** with definitions

Store as TypeScript objects for type safety and easy rendering.

### Image Handling
- Copy PNG images to `public/images/topics/`
- Reference in content data with paths like `/images/topics/01-linear-equations-economics.png`

---

## Page Designs

### Demo Landing Page (`/demo`)
```
┌─────────────────────────────────────────────┐
│ [Nav: Logo | ... | Give Feedback]           │
├─────────────────────────────────────────────┤
│                                             │
│  Welcome to the Grade Nerd Demo             │
│                                             │
│  [Brief explanation of the app]             │
│                                             │
│  In this demo, explore 17 math topics       │
│  through 3 interest lenses:                 │
│  Economics • Physics • Neural Networks      │
│                                             │
│  💡 Imagine this with YOUR passion          │
│  (basketball, music, cooking, gaming...)    │
│                                             │
│  ┌─────────────┐  ┌─────────────┐          │
│  │ Browse by   │  │ Browse by   │          │
│  │   TOPIC     │  │  INTEREST   │          │
│  └─────────────┘  └─────────────┘          │
│                                             │
│  Your progress: 0/51 combinations viewed    │
│                                             │
└─────────────────────────────────────────────┘
```

### Topic Selection Page
```
┌─────────────────────────────────────────────┐
│ [Nav: Logo | Topics | Interests | Feedback] │
├─────────────────────────────────────────────┤
│                                             │
│  Choose a Math Topic                        │
│  [Progress: 3/17 topics explored]           │
│                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐          │
│  │ Linear │ │ Linear │ │Midpoint│          │
│  │Equations│ │Systems │ │Distance│          │
│  │   ✓    │ │        │ │   ✓    │          │
│  └────────┘ └────────┘ └────────┘          │
│  ... (all 17 topics in grid)               │
│                                             │
└─────────────────────────────────────────────┘
```

### Interest Selection Page
```
┌─────────────────────────────────────────────┐
│ [Nav]                                       │
├─────────────────────────────────────────────┤
│                                             │
│  Choose Your Lens                           │
│                                             │
│  ┌────────────┐ ┌────────────┐             │
│  │ 📈         │ │ ⚛️          │             │
│  │ Economics  │ │ Physics    │             │
│  │            │ │            │             │
│  └────────────┘ └────────────┘             │
│                                             │
│  ┌────────────┐ ┌────────────┐             │
│  │ 🧠         │ │ ❤️          │             │
│  │ Neural     │ │ My #1      │             │
│  │ Networks   │ │ Passion    │             │
│  └────────────┘ └────────────┘             │
│                                             │
│  "My #1 Passion" opens modal to enter       │
│  their interest, then shows random content  │
│  with message about full app customization  │
│                                             │
└─────────────────────────────────────────────┘
```

### Content View Page
```
┌─────────────────────────────────────────────┐
│ [Nav with breadcrumb: Demo > Linear Eq > Econ]│
├─────────────────────────────────────────────┤
│                                             │
│  Linear Equations in Economics              │
│  [Economics] [Physics] [Neural Networks]    │
│                    ↑ tabs to switch         │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │     [Featured PNG Image]            │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ THE CONCEPT                         │   │
│  │ [Extracted content...]              │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ THE EXAMPLE                         │   │
│  │ [Problem + step-by-step solution]   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [For Neural Networks: Simplify Toggle]    │
│                                             │
│  ← Previous Topic    Next Topic →          │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ 💡 Enjoying this? Share feedback!   │   │
│  │    [Give Feedback Button]           │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Modified Survey Page

### Changes from Current
1. Add question: "What's your #1 interest or passion?" (pre-fill if collected in demo)
2. Add question: "What's ONE SMALL thing that would make Grade Nerd better?"
3. Add question: "What's ONE BIG thing that would make Grade Nerd better?"
4. Keep existing: "Want to shape Grade Nerd?" + email collection

### Question Flow
1. Your #1 passion (text input, pre-filled if available)
2. Small improvement suggestion (text input)
3. Big improvement suggestion (text input)
4. Want to help shape Grade Nerd? (yes/no)
5. If yes → email input
6. Submit → Thank you message

---

## Implementation Phases

### Phase 1: Data Extraction & Setup
1. Create content parser to extract structured data from Notion HTML files
2. Set up data structure for 17 topics × 3 interests
3. Copy and organize PNG images
4. Create TypeScript types for content structure

### Phase 2: Core Demo Pages
1. Create Demo landing page
2. Create Topic list page with cards
3. Create Interest selection page
4. Create Content view page with interest tabs

### Phase 3: Features
1. Implement "My #1 Passion" flow with modal
2. Add localStorage progress tracking
3. Add "Simplify" toggle for Neural Networks content
4. Add persistent "Give Feedback" button

### Phase 4: Survey Modifications
1. Update Survey page with new questions
2. Implement passion pre-fill from localStorage
3. Update Google Form integration (if needed)

### Phase 5: Polish & Integration
1. Update homepage CTA
2. Update HelpUsBuild page with demo CTA
3. Add navigation between all demo pages
4. Mobile responsiveness check
5. Final testing

---

## 17 Math Topics (from Notion Data)

1. Linear Equations & Slope
2. Linear Systems
3. Midpoint and Distance
4. Equation of a Circle
5. Medians and Altitudes
6. Triangle Centers
7. Classifying Shapes
8. Congruence and Similarity
9. Right Triangle Ratios (Trig)
10. Non-Right Angle Trig
11. Exponent Laws
12. Expanding and Factoring
13. Factoring Trinomials
14. Difference of Squares
15. Quadratics Vertex Form
16. Completing the Square
17. Quadratic Formula

---

## Files to Create/Modify

### New Files
- `src/pages/demo/Demo.tsx`
- `src/pages/demo/TopicList.tsx`
- `src/pages/demo/InterestList.tsx`
- `src/pages/demo/ContentView.tsx`
- `src/pages/demo/components/TopicCard.tsx`
- `src/pages/demo/components/InterestCard.tsx`
- `src/pages/demo/components/ContentRenderer.tsx`
- `src/pages/demo/components/SimplifyToggle.tsx`
- `src/pages/demo/components/ProgressTracker.tsx`
- `src/pages/demo/components/FeedbackButton.tsx`
- `src/pages/demo/components/MyPassionModal.tsx`
- `src/data/topics.ts`
- `src/data/interests.ts`
- `src/data/content/*.ts` (one per topic, containing all interest variants)
- `src/hooks/useProgress.ts` (localStorage hook)
- `src/hooks/useUserPassion.ts` (localStorage hook)

### Modified Files
- `src/App.tsx` - Add demo routes
- `src/pages/Survey.tsx` - Add new questions
- `src/pages/HelpUsBuild.tsx` - Add demo CTA

### Assets
- `public/images/topics/*.png` - All topic images (51+ images)

---

## Success Criteria
- [ ] Students can navigate all 17 topics through all 3 interest lenses
- [ ] "My #1 Passion" flow works and pre-fills survey
- [ ] Progress tracking persists across sessions
- [ ] Neural Networks has working "Simplify" toggle for ELI5 content
- [ ] Survey collects passion + small/big feedback + email
- [ ] Mobile-responsive design
- [ ] Persistent feedback button visible throughout demo

---

## Questions for Future Consideration (Not in This Plan)
- Should we add a "share your progress" social feature?
- Should completed topics unlock achievements/badges?
- Should there be a "quick tour" onboarding overlay?
