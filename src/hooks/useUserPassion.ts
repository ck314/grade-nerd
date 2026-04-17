import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import { getUserKey } from '../lib/userStorage';

export function useUserPassion() {
  const { activeUser } = useUser();
  const storageKey = getUserKey(activeUser!, 'user-passion');

  const [passion, setPassionState] = useState<string>('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
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
      localStorage.setItem(storageKey, value);
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const clearPassion = useCallback(() => {
    setPassionState('');
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    passion,
    setPassion,
    clearPassion,
    hasPassion: passion.length > 0,
  };
}
