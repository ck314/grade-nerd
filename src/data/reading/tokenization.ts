import { WordToken } from './readingTypes';
import { normalizeWord } from './lessons';

export function getChapterTokens(chapterText: string): WordToken[] {
  return chapterText.split(/\s+/).filter(Boolean).map(raw => ({
    display: raw,
    normalized: normalizeWord(raw),
  }));
}
