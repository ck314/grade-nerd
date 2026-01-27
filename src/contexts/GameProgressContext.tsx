import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { GameProgress, TopicProgress, TopicStatus } from '../data/game/gameTypes';
import { gameTopics } from '../data/game/gameTopics';
import { gameUnits } from '../data/game/gameUnits';

const STORAGE_KEY = 'gradenerd-formula-forge';
const PASS_THRESHOLD = 1.0; // 100% to pass

function createInitialProgress(): GameProgress {
  const topics: { [topicId: string]: TopicProgress } = {};

  gameTopics.forEach((topic, index) => {
    topics[topic.id] = {
      status: index === 0 ? 'available' : 'locked',
      formulaUnlocked: false,
      exampleUnlocked: false,
      quizAttempts: 0,
    };
  });

  return {
    currentTopicId: null,
    topics,
    startedAt: new Date().toISOString(),
    lastPlayedAt: new Date().toISOString(),
  };
}

interface GameProgressContextType {
  progress: GameProgress;
  getTopicProgress: (topicId: string) => TopicProgress | undefined;
  startTopic: (topicId: string) => void;
  startQuiz: (topicId: string) => void;
  completeQuiz: (topicId: string, score: number, total: number) => boolean;
  getOverallProgress: () => {
    totalTopics: number;
    formulasUnlocked: number;
    examplesUnlocked: number;
    topicsCompleted: number;
    percentComplete: number;
  };
  getUnitProgress: (unitId: string) => {
    total: number;
    completed: number;
    percentComplete: number;
  };
  isTopicAccessible: (topicId: string) => boolean;
  getUnlockedFormulas: () => string[];
  getUnlockedExamples: () => string[];
  resetProgress: () => void;
}

const GameProgressContext = createContext<GameProgressContextType | null>(null);

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<GameProgress>(createInitialProgress);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as GameProgress;
        const updated = { ...parsed };
        gameTopics.forEach((topic, index) => {
          if (!updated.topics[topic.id]) {
            updated.topics[topic.id] = {
              status: index === 0 ? 'available' : 'locked',
              formulaUnlocked: false,
              exampleUnlocked: false,
              quizAttempts: 0,
            };
          }
        });
        setProgress(updated);
      }
    } catch {
      setProgress(createInitialProgress());
    }
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getTopicProgress = useCallback((topicId: string): TopicProgress | undefined => {
    return progress.topics[topicId];
  }, [progress]);

  const startTopic = useCallback((topicId: string) => {
    setProgress(prev => {
      const topicProgress = prev.topics[topicId];
      if (!topicProgress || topicProgress.status === 'locked') {
        return prev;
      }

      // Don't change status if already completed
      const newStatus = topicProgress.status === 'completed'
        ? 'completed'
        : 'learning' as TopicStatus;

      return {
        ...prev,
        currentTopicId: topicId,
        lastPlayedAt: new Date().toISOString(),
        topics: {
          ...prev.topics,
          [topicId]: {
            ...topicProgress,
            status: newStatus,
            formulaUnlocked: true,
          },
        },
      };
    });
  }, []);

  const startQuiz = useCallback((topicId: string) => {
    setProgress(prev => {
      const topicProgress = prev.topics[topicId];
      if (!topicProgress) return prev;

      return {
        ...prev,
        lastPlayedAt: new Date().toISOString(),
        topics: {
          ...prev.topics,
          [topicId]: {
            ...topicProgress,
            status: 'quiz' as TopicStatus,
          },
        },
      };
    });
  }, []);

  const completeQuiz = useCallback((topicId: string, score: number, total: number) => {
    const passed = score / total >= PASS_THRESHOLD;

    setProgress(prev => {
      const topicProgress = prev.topics[topicId];
      if (!topicProgress) return prev;

      const currentTopicIndex = gameTopics.findIndex(t => t.id === topicId);
      const nextTopic = gameTopics[currentTopicIndex + 1];

      const newTopics = { ...prev.topics };

      newTopics[topicId] = {
        ...topicProgress,
        status: passed ? 'completed' : 'learning',
        exampleUnlocked: passed ? true : topicProgress.exampleUnlocked,
        quizScore: score,
        quizAttempts: topicProgress.quizAttempts + 1,
      };

      if (passed && nextTopic && newTopics[nextTopic.id]?.status === 'locked') {
        newTopics[nextTopic.id] = {
          ...newTopics[nextTopic.id],
          status: 'available',
        };
      }

      return {
        ...prev,
        currentTopicId: passed ? null : topicId,
        lastPlayedAt: new Date().toISOString(),
        topics: newTopics,
      };
    });

    return passed;
  }, []);

  const getOverallProgress = useCallback(() => {
    const totalTopics = gameTopics.length;
    let formulasUnlocked = 0;
    let examplesUnlocked = 0;
    let topicsCompleted = 0;

    Object.values(progress.topics).forEach(topic => {
      if (topic.formulaUnlocked) formulasUnlocked++;
      if (topic.exampleUnlocked) examplesUnlocked++;
      if (topic.status === 'completed') topicsCompleted++;
    });

    return {
      totalTopics,
      formulasUnlocked,
      examplesUnlocked,
      topicsCompleted,
      percentComplete: Math.round((topicsCompleted / totalTopics) * 100),
    };
  }, [progress]);

  const getUnitProgress = useCallback((unitId: string) => {
    const unit = gameUnits.find(u => u.id === unitId);
    if (!unit) return { total: 0, completed: 0, percentComplete: 0 };

    let completed = 0;
    unit.topicIds.forEach(topicId => {
      if (progress.topics[topicId]?.status === 'completed') {
        completed++;
      }
    });

    return {
      total: unit.topicIds.length,
      completed,
      percentComplete: Math.round((completed / unit.topicIds.length) * 100),
    };
  }, [progress]);

  const isTopicAccessible = useCallback((topicId: string): boolean => {
    const topicProgress = progress.topics[topicId];
    return topicProgress?.status !== 'locked';
  }, [progress]);

  const getUnlockedFormulas = useCallback(() => {
    return Object.entries(progress.topics)
      .filter(([, tp]) => tp.formulaUnlocked)
      .map(([topicId]) => topicId);
  }, [progress]);

  const getUnlockedExamples = useCallback(() => {
    return Object.entries(progress.topics)
      .filter(([, tp]) => tp.exampleUnlocked)
      .map(([topicId]) => topicId);
  }, [progress]);

  const resetProgress = useCallback(() => {
    const initial = createInitialProgress();
    setProgress(initial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  }, []);

  return (
    <GameProgressContext.Provider
      value={{
        progress,
        getTopicProgress,
        startTopic,
        startQuiz,
        completeQuiz,
        getOverallProgress,
        getUnitProgress,
        isTopicAccessible,
        getUnlockedFormulas,
        getUnlockedExamples,
        resetProgress,
      }}
    >
      {children}
    </GameProgressContext.Provider>
  );
}

export function useGameProgress() {
  const context = useContext(GameProgressContext);
  if (!context) {
    throw new Error('useGameProgress must be used within a GameProgressProvider');
  }
  return context;
}
