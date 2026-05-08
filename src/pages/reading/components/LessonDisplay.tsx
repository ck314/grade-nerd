import { useState, useEffect, useCallback } from 'react';
import { WordToken, readingLessons } from '../../../data/reading';

const IGNORED_KEYS = new Set(['Escape', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Shift', 'Control', 'Alt', 'Meta']);

interface LessonDisplayProps {
  lessonNumber: number;
  tokens: WordToken[];
  isLastLesson: boolean;
  onComplete: (normalizedWords: string[]) => void;
  onNextLesson: () => void;
  suppressCompletion?: boolean;
}

export function LessonDisplay({ lessonNumber, tokens, isLastLesson, onComplete, onNextLesson, suppressCompletion }: LessonDisplayProps) {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [lessonComplete, setLessonComplete] = useState(false);

  useEffect(() => {
    setHighlightIndex(0);
    setLessonComplete(false);
  }, [lessonNumber]);

  const wordCount = tokens.length;
  const fontSize = wordCount <= 1 ? 'clamp(48px, 10vw, 64px)'
    : wordCount <= 5 ? 'clamp(36px, 7vw, 48px)'
    : 'clamp(28px, 5vw, 36px)';

  const advance = useCallback(() => {
    if (lessonComplete) return;
    const nextIndex = highlightIndex + 1;
    if (nextIndex > tokens.length - 1) {
      setLessonComplete(true);
      onComplete(tokens.map(t => t.normalized));
    } else {
      setHighlightIndex(nextIndex);
    }
  }, [highlightIndex, tokens, lessonComplete, onComplete]);

  const handleNextOrDismiss = useCallback(() => {
    if (!isLastLesson) {
      onNextLesson();
    }
  }, [isLastLesson, onNextLesson]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (IGNORED_KEYS.has(e.key)) return;

      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) return;

      if (lessonComplete) {
        if (suppressCompletion) return;
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleNextOrDismiss();
        }
        return;
      }

      if (e.key === ' ') e.preventDefault();
      advance();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [advance, lessonComplete, suppressCompletion, handleNextOrDismiss]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"]')) return;

    if (lessonComplete) {
      if (!suppressCompletion) handleNextOrDismiss();
    } else {
      advance();
    }
  }, [advance, lessonComplete, suppressCompletion, handleNextOrDismiss]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ paddingTop: '60px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px' }}
      onClick={handleContainerClick}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-[0.4em] gap-y-[0.2em]" style={{ fontSize }}>
        {tokens.map((token, i) => (
          <span
            key={i}
            className="inline-block py-1 transition-all duration-150"
            style={{
              borderBottom: i === highlightIndex ? '4px solid #0066FF' : '4px solid transparent',
              fontWeight: 700,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {token.display}
          </span>
        ))}
      </div>

      {lessonComplete && !suppressCompletion && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {isLastLesson ? (
            <div className="text-2xl font-bold text-[#0066FF] text-center">
              You finished all {readingLessons.length} lessons!
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onNextLesson(); }}
              className="min-h-[72px] min-w-[200px] px-8 py-4 bg-[#0066FF] text-white text-xl font-bold rounded-xl border-2 border-black shadow-md hover:bg-[#0052CC] transition-colors"
            >
              Next Lesson
            </button>
          )}
        </div>
      )}
    </div>
  );
}
