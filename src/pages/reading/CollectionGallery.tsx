import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ReadingProgressProvider, useReadingProgress, getEarnedWords } from '../../contexts/ReadingProgressContext';
import { bigContentWords, TOTAL_CONTENT_WORDS, ContentWord } from '../../data/reading';
import { WordCelebration } from './components/WordCelebration';

function GalleryContent() {
  const { progress } = useReadingProgress();
  const earnedWords = getEarnedWords(progress.completedLessons);
  const earnedLessons = new Set(earnedWords.map(w => w.lessonNumber));
  const [selectedWord, setSelectedWord] = useState<ContentWord | null>(null);

  const handleDismiss = useCallback(() => setSelectedWord(null), []);

  return (
    <div className="min-h-screen bg-graph-paper">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b-2 border-black px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            to="/reading"
            className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-black bg-white hover:bg-gray-100 transition-colors"
            aria-label="Back to reading"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-lg font-bold tracking-tight">Word Collection</h1>
        </div>
      </div>

      {/* Progress banner */}
      <div className="max-w-2xl mx-auto px-4 pt-5 pb-2">
        <div className="bg-white border-2 border-black rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
          <span className="font-bold text-sm tracking-tight">Words Collected</span>
          <span className="font-mono font-bold text-lg">
            {earnedWords.length}
            <span className="text-gray-400 text-base"> / {TOTAL_CONTENT_WORDS}</span>
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
          <div
            className="h-full bg-black rounded-full transition-all duration-500"
            style={{ width: `${(earnedWords.length / TOTAL_CONTENT_WORDS) * 100}%` }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-2xl mx-auto px-4 py-4 pb-12">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {bigContentWords.map((entry) => {
            const earned = earnedLessons.has(entry.lessonNumber);

            return (
              <button
                key={entry.lessonNumber}
                className={cn(
                  'flex flex-col items-center',
                  earned ? 'cursor-pointer' : 'cursor-default'
                )}
                onClick={() => earned && setSelectedWord(entry)}
                disabled={!earned}
              >
                {/* Card */}
                <div
                  className={cn(
                    'w-full aspect-square rounded-xl border-2 overflow-hidden flex items-center justify-center',
                    earned ? 'border-black bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all' : 'border-gray-300 bg-gray-100'
                  )}
                >
                  {earned ? (
                    <img
                      src={entry.imagePath}
                      alt={entry.word}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Lock size={24} className="text-gray-400" />
                  )}
                </div>
                {/* Label */}
                <span
                  className={cn(
                    'mt-1.5 text-xs font-bold tracking-wide text-center leading-tight',
                    earned ? 'text-black' : 'text-gray-400'
                  )}
                >
                  {earned ? entry.word : '???'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedWord && (
        <WordCelebration
          word={selectedWord.word}
          imagePath={selectedWord.imagePath}
          isGold={false}
          onDismiss={handleDismiss}
        />
      )}
    </div>
  );
}

export function CollectionGallery() {
  return (
    <ReadingProgressProvider>
      <GalleryContent />
    </ReadingProgressProvider>
  );
}
