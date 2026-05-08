import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const xlsxPath = resolve(__dirname, '../artifacts/Blue Fox Story Data.xlsx');
const outputPath = resolve(__dirname, '../src/data/reading/storyChapters.ts');

mkdirSync(dirname(outputPath), { recursive: true });

const workbook = XLSX.readFile(xlsxPath);
const worksheet = workbook.Sheets['Story Chapters'];
const rows = XLSX.utils.sheet_to_json<{
  Chapter: number;
  'New 1': string;
  'New 2': string;
  'New 3': string;
  'New 4': string;
  Words: number;
  'Chapter Text': string;
}>(worksheet, { defval: '' });

const chapters = rows.map(row => {
  const chapter = row.Chapter;
  const text = row['Chapter Text'];
  const newWords = [row['New 1'], row['New 2'], row['New 3'], row['New 4']]
    .filter(w => w !== null && w !== undefined && String(w).trim() !== '')
    .map(w => String(w).trim());
  return { chapter, text, newWords };
});

// Verification
if (chapters.length !== 100) {
  console.error(`Expected 100 chapters, got ${chapters.length}`);
  process.exit(1);
}

for (const ch of chapters) {
  if (!ch.text || ch.text.trim() === '') {
    console.error(`Chapter ${ch.chapter} has empty text`);
    process.exit(1);
  }
}

// Group into pages of 4
const pages: { page: number; chapters: typeof chapters }[] = [];
for (let i = 0; i < chapters.length; i += 4) {
  pages.push({
    page: Math.floor(i / 4) + 1,
    chapters: chapters.slice(i, i + 4),
  });
}

if (pages.length !== 25) {
  console.error(`Expected 25 pages, got ${pages.length}`);
  process.exit(1);
}

for (const p of pages) {
  if (p.chapters.length !== 4) {
    console.error(`Page ${p.page} has ${p.chapters.length} chapters, expected 4`);
    process.exit(1);
  }
}

// Generate output
let output = ``;
output += `export interface StoryChapter {\n`;
output += `  chapter: number;\n`;
output += `  text: string;\n`;
output += `  newWords: string[];\n`;
output += `}\n\n`;
output += `export interface StoryPage {\n`;
output += `  page: number;\n`;
output += `  chapters: StoryChapter[];\n`;
output += `}\n\n`;
output += `export const TOTAL_PAGES = 25;\n`;
output += `export const TOTAL_CHAPTERS = 100;\n\n`;
output += `export const storyPages: StoryPage[] = [\n`;
for (const p of pages) {
  output += `  {\n`;
  output += `    page: ${p.page},\n`;
  output += `    chapters: [\n`;
  for (const ch of p.chapters) {
    const newWordsStr = ch.newWords.map(w => JSON.stringify(w)).join(', ');
    output += `      { chapter: ${ch.chapter}, text: ${JSON.stringify(ch.text)}, newWords: [${newWordsStr}] },\n`;
  }
  output += `    ],\n`;
  output += `  },\n`;
}
output += `];\n\n`;
output += `export function getStoryPage(pageNumber: number): StoryPage | undefined {\n`;
output += `  return storyPages.find(p => p.page === pageNumber);\n`;
output += `}\n`;

writeFileSync(outputPath, output, 'utf-8');
console.log(`Generated ${chapters.length} chapters across ${pages.length} pages to ${outputPath}`);
console.log('Verification complete');
