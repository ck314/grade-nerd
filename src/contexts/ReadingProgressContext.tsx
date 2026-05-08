import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { bigContentWords, TOTAL_CONTENT_WORDS, TOTAL_CHAPTERS } from '../data/reading';
import { useUser } from '../contexts/UserContext';
import { getUserKey } from '../lib/userStorage';

export interface StoryProgress {
  currentPage: number;
  currentChapter: number;
  chaptersRead: boolean[];
  storyInvitationSeen: boolean;
  readingMode: 'advance' | 'word-tap';
}

export function createInitialStoryProgress(): StoryProgress {
  return {
    currentPage: 1,
    currentChapter: 0,
    chaptersRead: Array(TOTAL_CHAPTERS).fill(false),
    storyInvitationSeen: false,
    readingMode: 'advance',
  };
}

interface ReadingProgress {
  currentLesson: number;
  highestLesson: number;
  completedLessons: number[];
  wordCounts: Record<string, number>;
  lastVersions: Record<number, number>;
  storyProgress?: StoryProgress;
}

function createInitialProgress(): ReadingProgress {
  return {
    currentLesson: 1,
    highestLesson: 1,
    completedLessons: [],
    wordCounts: {},
    lastVersions: {},
    storyProgress: createInitialStoryProgress(),
  };
}

function createSeededProgress(): ReadingProgress {
  const completedLessons = bigContentWords.map(w => w.lessonNumber);
  return {
    currentLesson: 101,
    highestLesson: 101,
    completedLessons,
    wordCounts: {},
    lastVersions: {},
    storyProgress: createInitialStoryProgress(),
  };
}

function loadFromLocalStorage(key: string, username?: string): ReadingProgress {
  try {
    const stored = localStorage.getItem(key);
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
        const storyProgress = parsed.storyProgress && typeof parsed.storyProgress === 'object'
          ? {
              currentPage: typeof parsed.storyProgress.currentPage === 'number' ? parsed.storyProgress.currentPage : 1,
              currentChapter: typeof parsed.storyProgress.currentChapter === 'number' ? parsed.storyProgress.currentChapter : 0,
              chaptersRead: Array.isArray(parsed.storyProgress.chaptersRead) && parsed.storyProgress.chaptersRead.length === TOTAL_CHAPTERS
                ? parsed.storyProgress.chaptersRead
                : Array(TOTAL_CHAPTERS).fill(false),
              storyInvitationSeen: parsed.storyProgress.storyInvitationSeen === true,
              readingMode: parsed.storyProgress.readingMode === 'word-tap' ? 'word-tap' as const : 'advance' as const,
            }
          : createInitialStoryProgress();
        return { ...parsed, lastVersions: parsed.lastVersions ?? {}, storyProgress } as ReadingProgress;
      }
    }
  } catch {
    // corrupt localStorage — fall through
  }
  if (username && username.startsWith('100')) return createSeededProgress();
  return createInitialProgress();
}

export function getEarnedWords(completedLessons: number[]) {
  return bigContentWords.filter(w => completedLessons.includes(w.lessonNumber));
}

export function isStoryUnlocked(completedLessons: number[]): boolean {
  return getEarnedWords(completedLessons).length >= TOTAL_CONTENT_WORDS;
}

interface ReadingProgressContextType {
  progress: ReadingProgress;
  setCurrentLesson: (n: number) => void;
  completeLesson: (lessonNumber: number, wordsRead: string[], versionIndex: number) => void;
  getMasteryStats: () => { masteredCount: number; nextWord: string; nextCount: number };
  getCurrentMilestone: () => { level: number; threshold: number };
  resetProgress: () => void;
  advanceStoryChapter: (chapterIndex: number) => void;
  updateStoryProgress: (updates: Partial<StoryProgress>) => void;
}

const ReadingProgressContext = createContext<ReadingProgressContextType | null>(null);

export function ReadingProgressProvider({ children }: { children: ReactNode }) {
  const { activeUser } = useUser();
  const storageKey = getUserKey(activeUser!, 'reading');

  const [progress, setProgress] = useState<ReadingProgress>(() => loadFromLocalStorage(storageKey, activeUser ?? undefined));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const setCurrentLesson = useCallback((n: number) => {
    setProgress(prev => ({
      ...prev,
      currentLesson: n,
      highestLesson: Math.max(prev.highestLesson, n),
    }));
  }, []);

  const completeLesson = useCallback((lessonNumber: number, wordsRead: string[], versionIndex: number) => {
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
        lastVersions: { ...prev.lastVersions, [lessonNumber]: versionIndex },
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

  const advanceStoryChapter = useCallback((chapterIndex: number) => {
    setProgress(prev => {
      const sp = prev.storyProgress ?? createInitialStoryProgress();
      if (sp.chaptersRead[chapterIndex]) return prev;
      const newChaptersRead = [...sp.chaptersRead];
      newChaptersRead[chapterIndex] = true;
      const page = chapterIndex + 1;
      return {
        ...prev,
        storyProgress: { ...sp, chaptersRead: newChaptersRead, currentPage: page, currentChapter: chapterIndex },
      };
    });
  }, []);

  const updateStoryProgress = useCallback((updates: Partial<StoryProgress>) => {
    setProgress(prev => ({
      ...prev,
      storyProgress: { ...(prev.storyProgress ?? createInitialStoryProgress()), ...updates },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const initial = createInitialProgress();
    setProgress(initial);
    localStorage.setItem(storageKey, JSON.stringify(initial));
  }, [storageKey]);

  return (
    <ReadingProgressContext.Provider value={{
      progress,
      setCurrentLesson,
      completeLesson,
      getMasteryStats,
      getCurrentMilestone,
      resetProgress,
      advanceStoryChapter,
      updateStoryProgress,
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
