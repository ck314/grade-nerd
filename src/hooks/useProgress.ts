import { useState, useEffect, useCallback } from 'react';
import { ViewedTopic } from '../data/types';

const STORAGE_KEY = 'gradenerd-viewed-topics';

export function useProgress() {
  const [viewedTopics, setViewedTopics] = useState<ViewedTopic[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setViewedTopics(JSON.parse(stored));
      }
    } catch {
      // If parsing fails, start fresh
      setViewedTopics([]);
    }
  }, []);

  // Save to localStorage whenever viewedTopics changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedTopics));
  }, [viewedTopics]);

  const markAsViewed = useCallback((topicId: string, interestId: string) => {
    const key: ViewedTopic = `${topicId}-${interestId}`;
    setViewedTopics(prev => {
      if (prev.includes(key)) return prev;
      return [...prev, key];
    });
  }, []);

  const isViewed = useCallback((topicId: string, interestId: string): boolean => {
    const key: ViewedTopic = `${topicId}-${interestId}`;
    return viewedTopics.includes(key);
  }, [viewedTopics]);

  const getTopicProgress = useCallback((topicId: string): number => {
    const count = viewedTopics.filter(v => v.startsWith(`${topicId}-`)).length;
    return count;
  }, [viewedTopics]);

  const getTotalProgress = useCallback((): { viewed: number; total: number } => {
    // 17 topics x 3 interests = 51 total combinations
    return {
      viewed: viewedTopics.length,
      total: 51,
    };
  }, [viewedTopics]);

  const clearProgress = useCallback(() => {
    setViewedTopics([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    viewedTopics,
    markAsViewed,
    isViewed,
    getTopicProgress,
    getTotalProgress,
    clearProgress,
  };
}
