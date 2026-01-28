// Types for Formula Forge game

export type TopicStatus = 'locked' | 'available' | 'learning' | 'quiz' | 'completed';

// Points system
export interface PointsState {
  totalEarned: number;
  spent: number;
}

// Avatar customization
export interface AvatarState {
  purchasedItems: string[];  // item IDs that have been purchased
  equippedItems: string[];   // item IDs currently equipped (displayed on avatar)
  level: number;             // current level (starts at 1)
  pointsClaimedTopics: string[];  // topics that have given points this run (resets on level up)
}

export interface TopicProgress {
  status: TopicStatus;
  formulaUnlocked: boolean;
  exampleUnlocked: boolean;
  quizScore?: number;
  quizAttempts: number;
}

export interface GameProgress {
  currentTopicId: string | null;
  topics: {
    [topicId: string]: TopicProgress;
  };
  startedAt: string;
  lastPlayedAt: string;
  points: PointsState;
  avatar: AvatarState;
}

// Result from completing a quiz, including points earned
export interface QuizCompletionResult {
  passed: boolean;
  pointsEarned: number;
  correctAnswers: number;
  bonusPoints: number;
}

export interface GameUnit {
  id: string;
  number: number;
  name: string;
  shortName: string;
  description: string;
  color: string;
  bgColor: string;
  topicIds: string[];
}

export interface GameTopic {
  id: string;
  unitId: string;
  number: number;
  name: string;
  shortName: string;
  description: string;
  lessonsCovered: string;
}

export interface FormulaVariable {
  symbol: string;
  meaning: string;
}

export interface Formula {
  id: string;
  topicId: string;
  name: string;
  formula: string;
  description: string;
  variables?: FormulaVariable[];
}

export interface WorkedExample {
  id: string;
  topicId: string;
  title: string;
  problem: string;
  steps: string[];
  answer: string;
}

export interface QuizOption {
  label: string;
  value: string | number;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  type: 'multiple-choice' | 'fill-blank';
  question: string;
  options?: QuizOption[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  score: number;
  total: number;
  passed: boolean;
  answers: {
    questionId: string;
    userAnswer: string | number;
    correct: boolean;
  }[];
}
