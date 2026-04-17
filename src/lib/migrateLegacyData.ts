import { SCOPED_BASE_KEYS, getUserKey } from './userStorage';

const LEGACY_PREFIX = 'gradenerd-';

const LEGACY_KEYS = SCOPED_BASE_KEYS.map(baseKey => `${LEGACY_PREFIX}${baseKey}`);

/**
 * Checks if any of the 5 legacy (unscoped) localStorage keys exist.
 * Used to detect pre-upgrade data that needs migration.
 */
export function hasLegacyData(): boolean {
  return LEGACY_KEYS.some(key => localStorage.getItem(key) !== null);
}

/**
 * Migrates all existing legacy localStorage data to user-scoped keys.
 *
 * Writes all scoped keys first, then removes legacy keys only after
 * all writes succeed — partial failure leaves legacy data intact.
 */
export function migrateLegacyData(userId: string): void {
  const writes: Array<{ scopedKey: string; value: string }> = [];

  // Collect all values that need to be migrated
  for (const baseKey of SCOPED_BASE_KEYS) {
    const legacyKey = `${LEGACY_PREFIX}${baseKey}`;
    const value = localStorage.getItem(legacyKey);
    if (value !== null) {
      writes.push({
        scopedKey: getUserKey(userId, baseKey),
        value,
      });
    }
  }

  // Write all scoped keys first
  for (const { scopedKey, value } of writes) {
    localStorage.setItem(scopedKey, value);
  }

  // Only remove legacy keys after all writes succeed
  for (const baseKey of SCOPED_BASE_KEYS) {
    const legacyKey = `${LEGACY_PREFIX}${baseKey}`;
    localStorage.removeItem(legacyKey);
  }
}
