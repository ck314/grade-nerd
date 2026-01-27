// Types for Formula Forge game

export type TopicStatus = 'locked' | 'available' | 'learning' | 'quiz' | 'completed';

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
