import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const xlsxPath = resolve(__dirname, '../artifacts/Blue Fox Story Data.xlsx');
const outputPath = resolve(__dirname, '../src/data/reading/bigContentWords.ts');

mkdirSync(dirname(outputPath), { recursive: true });

const workbook = XLSX.readFile(xlsxPath);
const sheet = workbook.Sheets['Big Content Words'];
if (!sheet) {
  throw new Error('Sheet "Big Content Words" not found in workbook');
}

const rows = XLSX.utils.sheet_to_json<{ '#': number; Word: string; 'After Lesson': number }>(sheet);

const entries = rows.map(row => ({
  lessonNumber: row['After Lesson'],
  word: String(row['Word']).trim().toLowerCase(),
}));

let output = `export interface ContentWord {\n`;
output += `  lessonNumber: number;\n`;
output += `  word: string;\n`;
output += `  imagePath: string;\n`;
output += `}\n\n`;
output += `export const TOTAL_CONTENT_WORDS = ${entries.length};\n\n`;
output += `export const bigContentWords: ContentWord[] = [\n`;
for (const e of entries) {
  output += `  { lessonNumber: ${e.lessonNumber}, word: ${JSON.stringify(e.word)}, imagePath: ${JSON.stringify(`/grade-nerd/images/reading/words/${e.word}.webp`)} },\n`;
}
output += `];\n\n`;
output += `export function getContentWord(lessonNumber: number): ContentWord | undefined {\n`;
output += `  return bigContentWords.find(w => w.lessonNumber === lessonNumber);\n`;
output += `}\n`;

writeFileSync(outputPath, output, 'utf-8');
console.log(`Generated ${entries.length} content words to ${outputPath}`);

// Verify
let errors = 0;

if (entries.length !== 61) {
  console.error(`Expected 61 entries, got ${entries.length}`);
  errors++;
}

for (const e of entries) {
  if (e.lessonNumber > 100) {
    console.error(`Lesson number ${e.lessonNumber} exceeds 100 for word "${e.word}"`);
    errors++;
  }
}

const lastEntry = entries[entries.length - 1];
if (lastEntry.lessonNumber !== 100 || lastEntry.word !== 'gold') {
  console.error(`Expected last entry to be lesson 100 → "gold", got lesson ${lastEntry.lessonNumber} → "${lastEntry.word}"`);
  errors++;
}

if (errors === 0) {
  console.log('Verification complete: all checks passed');
} else {
  console.error(`Verification failed with ${errors} error(s)`);
  process.exit(1);
}
