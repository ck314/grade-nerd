import { WordToken } from './readingTypes';

function normalizeWord(word: string): string {
  return word.replace(/^[^a-zA-Z]+/, '').replace(/[^a-zA-Z]+$/, '').toLowerCase();
}

export function getChapterTokens(chapterText: string): WordToken[] {
  return chapterText.split(/\s+/).filter(Boolean).map(raw => ({
    display: raw,
    normalized: normalizeWord(raw),
  }));
}
