import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { REGISTRY_KEY, SESSION_KEY, removeAllUserKeys } from '../lib/userStorage';
import { hasLegacyData } from '../lib/migrateLegacyData';

interface UserContextType {
  users: string[];
  activeUser: string | null;
  resetCounter: number;
  migrationNeeded: boolean;
  createUser: (username: string) => { ok: boolean; error?: string };
  deleteUser: (username: string) => void;
  setActiveUser: (username: string) => void;
  clearActiveUser: () => void;
  resetActiveUserProgress: () => void;
  setMigrationNeeded: (needed: boolean) => void;
}

const UserContext = createContext<UserContextType | null>(null);

function loadRegistry(): string[] {
  try {
    const stored = localStorage.getItem(REGISTRY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // corrupt — fall through
  }
  return [];
}

function saveRegistry(users: string[]): void {
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(users));
}

function loadActiveUser(registry: string[]): string | null {
  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  const exists = registry.some(u => u.toLowerCase() === stored.toLowerCase());
  return exists ? stored : null;
}

const ALPHANUMERIC = /^[a-zA-Z0-9]+$/;

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<string[]>(loadRegistry);
  const [activeUser, setActiveUserState] = useState<string | null>(() => loadActiveUser(loadRegistry()));
  const [resetCounter, setResetCounter] = useState(0);
  const [migrationNeeded, setMigrationNeeded] = useState<boolean>(() => {
    // If gradenerd-users registry does not exist, check for legacy unscoped data
    const registryExists = localStorage.getItem(REGISTRY_KEY) !== null;
    if (!registryExists) {
      return hasLegacyData();
    }
    return false;
  });

  const createUser = useCallback((username: string): { ok: boolean; error?: string } => {
    const trimmed = username.trim();
    if (trimmed.length === 0) return { ok: false, error: 'Username cannot be empty' };
    if (trimmed.length > 20) return { ok: false, error: 'Maximum 20 characters' };
    if (!ALPHANUMERIC.test(trimmed)) return { ok: false, error: 'Letters and numbers only' };

    const current = loadRegistry();
    if (current.length >= 100) return { ok: false, error: 'Maximum 100 users reached' };
    if (current.some(u => u.toLowerCase() === trimmed.toLowerCase())) {
      return { ok: false, error: 'Username already exists' };
    }

    const next = [...current, trimmed];
    saveRegistry(next);
    setUsers(next);
    return { ok: true };
  }, []);

  const setActiveUser = useCallback((username: string) => {
    const registry = loadRegistry();
    if (!registry.some(u => u.toLowerCase() === username.toLowerCase())) {
      localStorage.removeItem(SESSION_KEY);
      setActiveUserState(null);
      return;
    }
    localStorage.setItem(SESSION_KEY, username);
    setActiveUserState(username);
  }, []);

  const clearActiveUser = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setActiveUserState(null);
  }, []);

  const deleteUser = useCallback((username: string) => {
    const current = loadRegistry();
    const next = current.filter(u => u.toLowerCase() !== username.toLowerCase());
    saveRegistry(next);
    setUsers(next);
    removeAllUserKeys(username);
    const session = localStorage.getItem(SESSION_KEY);
    if (session && session.toLowerCase() === username.toLowerCase()) {
      localStorage.removeItem(SESSION_KEY);
      setActiveUserState(null);
    }
  }, []);

  const resetActiveUserProgress = useCallback(() => {
    if (!activeUser) return;
    removeAllUserKeys(activeUser);
    setResetCounter(c => c + 1);
  }, [activeUser]);

  return (
    <UserContext.Provider value={{
      users,
      activeUser,
      resetCounter,
      migrationNeeded,
      createUser,
      deleteUser,
      setActiveUser,
      clearActiveUser,
      resetActiveUserProgress,
      setMigrationNeeded,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
