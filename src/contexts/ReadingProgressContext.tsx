import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getLesson } from '../data/reading';

const STORAGE_KEY = 'gradenerd-reading';

interface ReadingProgress {
  currentLesson: number;
  highestLesson: number;
  completedLessons: number[];
  wordCounts: Record<string, number>;
}

function createInitialProgress(): ReadingProgress {
  return {
    currentLesson: 1,
    highestLesson: 1,
    completedLessons: [],
    wordCounts: {},
  };
}

function loadFromLocalStorage(): ReadingProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        typeof parsed.currentLesson === 'number' &&
        typeof parsed.highestLesson === 'number' &&
        Array.isArray(parsed.completedLessons) &&
        typeof parsed.wordCounts === 'object'
      ) {
        return parsed as ReadingProgress;
      }
    }
  } catch {
    // corrupt localStorage — fall through
  }
  return createInitialProgress();
}

interface ReadingProgressContextType {
  progress: ReadingProgress;
  setCurrentLesson: (n: number) => void;
  completeLesson: (lessonNumber: number, wordsRead: string[]) => void;
  getMasteryStats: () => { masteredCount: number; nextWord: string; nextCount: number };
  getCurrentMilestone: () => { level: number; threshold: number };
}

const ReadingProgressContext = createContext<ReadingProgressContextType | null>(null);

export function ReadingProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ReadingProgress>(loadFromLocalStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const setCurrentLesson = useCallback((n: number) => {
    setProgress(prev => ({
      ...prev,
      currentLesson: n,
      highestLesson: Math.max(prev.highestLesson, n),
    }));
  }, []);

  const completeLesson = useCallback((lessonNumber: number, wordsRead: string[]) => {
    setProgress(prev => {
      const newWordCounts = { ...prev.wordCounts };
      for (const word of wordsRead) {
        newWordCounts[word] = (newWordCounts[word] ?? 0) + 1;
      }
      const newCompleted = prev.completedLessons.includes(lessonNumber)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonNumber];
      return {
        ...prev,
        wordCounts: newWordCounts,
        completedLessons: newCompleted,
        highestLesson: Math.max(prev.highestLesson, lessonNumber),
      };
    });
  }, []);

  const getMasteryStats = useCallback((): { masteredCount: number; nextWord: string; nextCount: number } => {
    let masteredCount = 0;
    let nextWord = '';
    let nextCount = 0;
    for (const [word, count] of Object.entries(progress.wordCounts)) {
      if (count >= 10) {
        masteredCount++;
      } else if (count > nextCount) {
        nextCount = count;
        nextWord = word;
      }
    }
    return { masteredCount, nextWord, nextCount };
  }, [progress.wordCounts]);

  const getCurrentMilestone = useCallback((): { level: number; threshold: number } => {
    const { masteredCount } = getMasteryStats();
    const level = Math.floor((-1 + Math.sqrt(1 + 8 * masteredCount)) / 2);
    const threshold = (level * (level + 1)) / 2;
    return { level, threshold };
  }, [getMasteryStats]);

  return (
    <ReadingProgressContext.Provider value={{
      progress,
      setCurrentLesson,
      completeLesson,
      getMasteryStats,
      getCurrentMilestone,
    }}>
      {children}
    </ReadingProgressContext.Provider>
  );
}

export function useReadingProgress(): ReadingProgressContextType {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    throw new Error('useReadingProgress must be used within a ReadingProgressProvider');
  }
  return context;
}
