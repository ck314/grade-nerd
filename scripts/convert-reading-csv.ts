import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = resolve(__dirname, '../artifacts/Reading Lessons - 1 to 175.csv');
const outputPath = resolve(__dirname, '../src/data/reading/lessons.ts');

mkdirSync(dirname(outputPath), { recursive: true });

let csv = readFileSync(csvPath, 'utf-8');
if (csv.charCodeAt(0) === 0xFEFF) {
  csv = csv.slice(1);
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

const lines = csv.split(/\r?\n/).filter(l => l.trim());
const dataLines = lines.slice(1);

const lessons = dataLines.map(line => {
  const fields = parseCSVLine(line);
  const lesson = parseInt(fields[0]);
  const newWord = fields[1];
  const collectionSize = parseInt(fields[2]);
  const versions: string[] = [fields[3]];
  if (fields[4]) versions.push(fields[4]);
  if (fields[5]) versions.push(fields[5]);
  return { lesson, newWord, collectionSize, versions };
});

let output = `import { ReadingLesson, WordToken } from './readingTypes';\n\n`;
output += `export const readingLessons: ReadingLesson[] = [\n`;
for (const l of lessons) {
  const versionsStr = l.versions.map(v => JSON.stringify(v)).join(', ');
  output += `  { lesson: ${l.lesson}, newWord: ${JSON.stringify(l.newWord)}, collectionSize: ${l.collectionSize}, versions: [${versionsStr}] },\n`;
}
output += `];\n\n`;
output += `export function getLesson(n: number): ReadingLesson | undefined {\n`;
output += `  return readingLessons.find(l => l.lesson === n);\n`;
output += `}\n\n`;
output += `export function normalizeWord(word: string): string {\n`;
output += `  return word.replace(/^[^a-zA-Z]+/, '').replace(/[^a-zA-Z]+$/, '').toLowerCase();\n`;
output += `}\n\n`;
output += `function stripDisplayPunctuation(display: string): string {\n`;
output += `  return display.replace(/[^a-zA-Z?]/g, '');\n`;
output += `}\n\n`;
output += `export function getWordTokens(lesson: ReadingLesson, versionIndex: number): WordToken[] {\n`;
output += `  const text = lesson.versions[versionIndex] ?? lesson.versions[0];\n`;
output += `  return text.split(/\\s+/).filter(Boolean).map(raw => ({\n`;
output += `    display: lesson.lesson <= 40 ? stripDisplayPunctuation(raw) : raw,\n`;
output += `    normalized: normalizeWord(raw),\n`;
output += `  }));\n`;
output += `}\n\n`;
output += `export function selectVersion(lesson: ReadingLesson, lastVersion: number | undefined): number {\n`;
output += `  if (lesson.versions.length <= 1) return 0;\n`;
output += `  const candidates = Array.from({ length: lesson.versions.length }, (_, i) => i)\n`;
output += `    .filter(i => i !== lastVersion);\n`;
output += `  return candidates[Math.floor(Math.random() * candidates.length)];\n`;
output += `}\n`;

writeFileSync(outputPath, output, 'utf-8');
console.log(`Generated ${lessons.length} lessons to ${outputPath}`);

// Verify
for (const l of lessons) {
  if (l.lesson <= 10 && l.versions.length !== 1) {
    console.error(`Lesson ${l.lesson} should have 1 version, has ${l.versions.length}`);
  }
  if (l.lesson > 10 && l.lesson <= 150 && l.versions.length !== 3) {
    console.error(`Lesson ${l.lesson} should have 3 versions, has ${l.versions.length}`);
  }
}
console.log('Verification complete');
