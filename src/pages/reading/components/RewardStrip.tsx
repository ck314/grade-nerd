import { useState } from 'react';
import { Lock } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { bigContentWords, ContentWord } from '../../../data/reading';

interface RewardStripProps {
  completedLessons: number[];
  pendingLessonNumber?: number;
}

export function RewardStrip({ completedLessons, pendingLessonNumber }: RewardStripProps) {
  const effectiveLessons = pendingLessonNumber
    ? completedLessons.filter(l => l !== pendingLessonNumber)
    : completedLessons;
  const nextIndex = bigContentWords.findIndex(w => !effectiveLessons.includes(w.lessonNumber));

  const lastEarned = nextIndex > 0
    ? bigContentWords[nextIndex - 1]
    : nextIndex === -1
      ? bigContentWords[bigContentWords.length - 1]
      : undefined;
  const currentWord = nextIndex >= 0 ? bigContentWords[nextIndex] : undefined;
  const nextWord = nextIndex >= 0 && nextIndex + 1 < bigContentWords.length
    ? bigContentWords[nextIndex + 1]
    : undefined;

  if (!currentWord && !lastEarned) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-start gap-4">
      {lastEarned && (
        <div className="flex items-center gap-3">
          <WordThumb word={lastEarned} state="earned" />
          <span className="text-4xl font-extrabold text-black/80 drop-shadow-sm">
            {lastEarned.word}
          </span>
        </div>
      )}
      {currentWord && <WordThumb word={currentWord} state="current" />}
      {nextWord && <WordThumb word={nextWord} state="locked" />}
    </div>
  );
}

function WordThumb({ word, state }: { word: ContentWord; state: 'earned' | 'current' | 'locked' }) {
  const [error, setError] = useState(false);

  return (
    <div className={cn(
      'relative rounded-xl overflow-hidden shadow-md bg-white transition-all flex-shrink-0',
      state === 'current' ? 'w-40 h-40 border-2 border-[#0066FF]/40' : 'w-32 h-32 border-2 border-black/15',
    )}>
      {!error ? (
        <img
          src={word.imagePath}
          alt={state === 'locked' ? '' : word.word}
          className={cn(
            'w-full h-full object-cover',
            state === 'current' && 'blur-[6px]',
            state === 'locked' && 'blur-[6px] grayscale opacity-40',
          )}
          onError={() => setError(true)}
        />
      ) : (
        <div className={cn(
          'w-full h-full',
          state === 'earned' ? 'bg-blue-100' : 'bg-gray-200',
        )} />
      )}
      {state === 'locked' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock size={32} className="text-gray-400" />
        </div>
      )}
    </div>
  );
}
