import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { WordToken, readingLessons } from '../../../data/reading';
import { WordHighlightDisplay } from './WordHighlightDisplay';

interface LessonDisplayProps {
  lessonNumber: number;
  tokens: WordToken[];
  isLastLesson: boolean;
  onComplete: (normalizedWords: string[]) => void;
  onNextLesson: () => void;
  suppressCompletion?: boolean;
  completionExtra?: ReactNode;
}

export function LessonDisplay({ lessonNumber, tokens, isLastLesson, onComplete, onNextLesson, suppressCompletion, completionExtra }: LessonDisplayProps) {
  const [lessonComplete, setLessonComplete] = useState(false);
  const advanceRef = useRef<() => void>();

  useEffect(() => {
    setLessonComplete(false);
  }, [lessonNumber]);

  const wordCount = tokens.length;
  const fontSize = wordCount <= 1 ? 'clamp(48px, 10vw, 64px)'
    : wordCount <= 5 ? 'clamp(36px, 7vw, 48px)'
    : 'clamp(28px, 5vw, 36px)';

  const handleHighlightComplete = useCallback(() => {
    setLessonComplete(true);
    onComplete(tokens.map(t => t.normalized));
  }, [onComplete, tokens]);

  const handleNextOrDismiss = useCallback(() => {
    if (!isLastLesson) {
      onNextLesson();
    }
  }, [isLastLesson, onNextLesson]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (!lessonComplete) return;
      if (suppressCompletion) return;

      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNextOrDismiss();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lessonComplete, suppressCompletion, handleNextOrDismiss]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"]')) return;

    if (lessonComplete && !suppressCompletion) {
      handleNextOrDismiss();
    } else if (!lessonComplete) {
      advanceRef.current?.();
    }
  }, [lessonComplete, suppressCompletion, handleNextOrDismiss]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ paddingTop: '60px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px' }}
      onClick={handleContainerClick}
    >
      <WordHighlightDisplay
        tokens={tokens}
        fontSize={fontSize}
        onComplete={handleHighlightComplete}
        advanceRef={advanceRef}
      />

      {lessonComplete && !suppressCompletion && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {completionExtra}
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
