import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gradenerd-user-passion';

export function useUserPassion() {
  const [passion, setPassionState] = useState<string>('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPassionState(stored);
      }
    } catch {
      setPassionState('');
    }
  }, []);

  const setPassion = useCallback((value: string) => {
    setPassionState(value);
    if (value) {
      localStorage.setItem(STORAGE_KEY, value);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const clearPassion = useCallback(() => {
    setPassionState('');
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    passion,
    setPassion,
    clearPassion,
    hasPassion: passion.length > 0,
  };
}
