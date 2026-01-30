import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { GameProgress, TopicProgress, TopicStatus, QuizCompletionResult } from '../data/game/gameTypes';
import { gameTopics } from '../data/game/gameTopics';
import { gameUnits } from '../data/game/gameUnits';
import { getItemById } from '../data/game/avatarItems';

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
    points: {
      totalEarned: 0,
      spent: 0,
    },
    avatar: {
      purchasedItems: [],
      equippedItems: [],
      level: 1,
      pointsClaimedTopics: [],
    },
  };
}

// Migrate old progress data to include points and avatar
function migrateProgress(stored: Partial<GameProgress>): GameProgress {
  const initial = createInitialProgress();
  const avatar = stored.avatar || initial.avatar;
  return {
    ...initial,
    ...stored,
    points: stored.points || initial.points,
    avatar: {
      ...initial.avatar,
      ...avatar,
      level: avatar.level || 1,
      pointsClaimedTopics: avatar.pointsClaimedTopics || [],
    },
  };
}

interface GameProgressContextType {
  progress: GameProgress;
  getTopicProgress: (topicId: string) => TopicProgress | undefined;
  startTopic: (topicId: string) => void;
  startQuiz: (topicId: string) => void;
  completeQuiz: (topicId: string, score: number, total: number) => QuizCompletionResult;
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
  // Points and avatar functions
  getAvailablePoints: () => number;
  purchaseItem: (itemId: string) => boolean;
  equipItem: (itemId: string) => void;
  unequipItem: (itemId: string) => void;
  isItemPurchased: (itemId: string) => boolean;
  isItemEquipped: (itemId: string) => boolean;
  // Level up functions
  canLevelUp: () => boolean;
  levelUp: () => void;
  canEarnPointsForTopic: (topicId: string) => boolean;
  getLevel: () => number;
}

const GameProgressContext = createContext<GameProgressContextType | null>(null);

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<GameProgress>(createInitialProgress);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<GameProgress>;
        // Migrate to ensure points and avatar exist
        const updated = migrateProgress(parsed);
        // Also ensure all topics exist
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

  const completeQuiz = useCallback((topicId: string, score: number, total: number): QuizCompletionResult => {
    const passed = score / total >= PASS_THRESHOLD;

    // Check if points can be earned for this topic
    // After level 1, can only earn points once per topic per run
    const canEarnPoints = progress.avatar.level === 1 ||
      !progress.avatar.pointsClaimedTopics.includes(topicId);

    // Calculate points: 1 per correct answer + 2 bonus for 100%
    const correctAnswers = score;
    const bonusPoints = passed ? 2 : 0;
    const pointsEarned = canEarnPoints ? (correctAnswers + bonusPoints) : 0;

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

      // Track that points were claimed for this topic (if earned)
      const newPointsClaimedTopics = canEarnPoints && pointsEarned > 0
        ? [...prev.avatar.pointsClaimedTopics, topicId]
        : prev.avatar.pointsClaimedTopics;

      return {
        ...prev,
        currentTopicId: passed ? null : topicId,
        lastPlayedAt: new Date().toISOString(),
        topics: newTopics,
        points: {
          ...prev.points,
          totalEarned: prev.points.totalEarned + pointsEarned,
        },
        avatar: {
          ...prev.avatar,
          pointsClaimedTopics: newPointsClaimedTopics,
        },
      };
    });

    return {
      passed,
      pointsEarned,
      correctAnswers,
      bonusPoints,
    };
  }, [progress.avatar.level, progress.avatar.pointsClaimedTopics]);

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

  // Points functions
  const getAvailablePoints = useCallback((): number => {
    return progress.points.totalEarned - progress.points.spent;
  }, [progress.points]);

  // Avatar functions
  const purchaseItem = useCallback((itemId: string): boolean => {
    const item = getItemById(itemId);
    if (!item) return false;

    const available = progress.points.totalEarned - progress.points.spent;
    if (available < item.price) return false;
    if (progress.avatar.purchasedItems.includes(itemId)) return false;

    setProgress(prev => ({
      ...prev,
      points: {
        ...prev.points,
        spent: prev.points.spent + item.price,
      },
      avatar: {
        ...prev.avatar,
        purchasedItems: [...prev.avatar.purchasedItems, itemId],
      },
    }));

    return true;
  }, [progress.points, progress.avatar.purchasedItems]);

  const equipItem = useCallback((itemId: string): void => {
    if (!progress.avatar.purchasedItems.includes(itemId)) return;
    if (progress.avatar.equippedItems.includes(itemId)) return;

    setProgress(prev => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        equippedItems: [...prev.avatar.equippedItems, itemId],
      },
    }));
  }, [progress.avatar.purchasedItems, progress.avatar.equippedItems]);

  const unequipItem = useCallback((itemId: string): void => {
    setProgress(prev => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        equippedItems: prev.avatar.equippedItems.filter(id => id !== itemId),
      },
    }));
  }, []);

  const isItemPurchased = useCallback((itemId: string): boolean => {
    return progress.avatar.purchasedItems.includes(itemId);
  }, [progress.avatar.purchasedItems]);

  const isItemEquipped = useCallback((itemId: string): boolean => {
    return progress.avatar.equippedItems.includes(itemId);
  }, [progress.avatar.equippedItems]);

  // Level up functions
  const canLevelUp = useCallback((): boolean => {
    // Can level up when all topics are completed
    const allTopicsCompleted = gameTopics.every(
      topic => progress.topics[topic.id]?.status === 'completed'
    );
    return allTopicsCompleted;
  }, [progress.topics]);

  const levelUp = useCallback((): void => {
    if (!canLevelUp()) return;

    setProgress(prev => {
      // Reset all topic progress BUT keep formulas and examples unlocked
      const newTopics: { [topicId: string]: TopicProgress } = {};
      gameTopics.forEach((topic, index) => {
        const oldProgress = prev.topics[topic.id];
        newTopics[topic.id] = {
          status: index === 0 ? 'available' : 'locked',
          // Keep formulas and examples unlocked (the formula sheet)
          formulaUnlocked: oldProgress?.formulaUnlocked || false,
          exampleUnlocked: oldProgress?.exampleUnlocked || false,
          quizAttempts: 0,
          // Reset quiz score
          quizScore: undefined,
        };
      });

      return {
        ...prev,
        currentTopicId: null,
        lastPlayedAt: new Date().toISOString(),
        topics: newTopics,
        // Reset points to zero
        points: {
          totalEarned: 0,
          spent: 0,
        },
        avatar: {
          // Reset purchased and equipped items
          purchasedItems: [],
          equippedItems: [],
          // Increment level
          level: prev.avatar.level + 1,
          // Reset points claimed for new run
          pointsClaimedTopics: [],
        },
      };
    });
  }, [canLevelUp]);

  const canEarnPointsForTopic = useCallback((topicId: string): boolean => {
    // Level 1: always can earn points
    if (progress.avatar.level === 1) return true;
    // Level 2+: only if not already claimed this run
    return !progress.avatar.pointsClaimedTopics.includes(topicId);
  }, [progress.avatar.level, progress.avatar.pointsClaimedTopics]);

  const getLevel = useCallback((): number => {
    return progress.avatar.level;
  }, [progress.avatar.level]);

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
        getAvailablePoints,
        purchaseItem,
        equipItem,
        unequipItem,
        isItemPurchased,
        isItemEquipped,
        canLevelUp,
        levelUp,
        canEarnPointsForTopic,
        getLevel,
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
