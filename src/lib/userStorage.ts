const REGISTRY_KEY = 'gradenerd-users';
const SESSION_KEY = 'gradenerd-active-user';

const SCOPED_BASE_KEYS = [
  'reading',
  'formula-forge',
  'user-passion',
  'viewed-topics',
  'seen-intro',
] as const;

function getUserKey(userId: string, baseKey: string): string {
  return `gradenerd-${userId.toLowerCase()}-${baseKey}`;
}

function removeAllUserKeys(userId: string): void {
  for (const baseKey of SCOPED_BASE_KEYS) {
    localStorage.removeItem(getUserKey(userId, baseKey));
  }
}

export { REGISTRY_KEY, SESSION_KEY, SCOPED_BASE_KEYS, getUserKey, removeAllUserKeys };
