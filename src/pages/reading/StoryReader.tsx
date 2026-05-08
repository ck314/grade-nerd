import { useState, useCallback, useEffect, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReadingProgressProvider, useReadingProgress, isStoryUnlocked, createInitialStoryProgress } from '../../contexts/ReadingProgressContext';
import { getChapterByPage, TOTAL_CHAPTERS, CHAPTERS_PER_PAGE } from '../../data/reading/storyChapters';
import { cn } from '../../lib/utils';
import { getChapterTokens } from '../../data/reading/tokenization';
import { WordHighlightDisplay } from './components/WordHighlightDisplay';
import { StoryNav } from './components/StoryNav';
import { StoryPanels } from './components/StoryPanels';

function StoryContent() {
  const { progress, advanceStoryChapter, updateStoryProgress } = useReadingProgress();
  const storyProgress = progress.storyProgress ?? createInitialStoryProgress();
  const [currentPage, setCurrentPage] = useState(storyProgress.currentPage);
  const [readingMode, setReadingMode] = useState<'advance' | 'word-tap'>(storyProgress.readingMode);
  const [chapterComplete, setChapterComplete] = useState(false);
  const [storyFinished, setStoryFinished] = useState(false);

  const chapterIndex = currentPage - 1;
  const chapter = useMemo(() => getChapterByPage(currentPage), [currentPage]);
  const chapterGroupNumber = Math.floor(chapterIndex / CHAPTERS_PER_PAGE) + 1;
  const pageInChapter = chapterIndex % CHAPTERS_PER_PAGE;
  const chapterGroupStart = (chapterGroupNumber - 1) * CHAPTERS_PER_PAGE;

  const isAlreadyRead = storyProgress.chaptersRead[chapterIndex] === true;

  useEffect(() => {
    if (isAlreadyRead) {
      setChapterComplete(true);
    } else if (readingMode === 'advance') {
      setChapterComplete(true);
      advanceStoryChapter(chapterIndex);
    } else {
      setChapterComplete(false);
    }
  }, [chapterIndex, isAlreadyRead, readingMode, advanceStoryChapter]);

  const completeCurrentChapter = useCallback(() => {
    if (chapterComplete) return;
    setChapterComplete(true);
    advanceStoryChapter(chapterIndex);
  }, [chapterComplete, advanceStoryChapter, chapterIndex]);

  const handleWordTapComplete = useCallback(() => {
    completeCurrentChapter();
  }, [completeCurrentChapter]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setStoryFinished(false);
      updateStoryProgress({ currentPage: newPage, currentChapter: newPage - 1 });
    }
  }, [currentPage, updateStoryProgress]);

  const goToNextPage = useCallback(() => {
    if (currentPage < TOTAL_CHAPTERS) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setStoryFinished(false);
      updateStoryProgress({ currentPage: newPage, currentChapter: newPage - 1 });
    }
  }, [currentPage, updateStoryProgress]);

  const toggleMode = useCallback(() => {
    const newMode = readingMode === 'advance' ? 'word-tap' as const : 'advance' as const;
    setReadingMode(newMode);
    updateStoryProgress({ readingMode: newMode });
  }, [readingMode, updateStoryProgress]);

  const handleReadAgain = useCallback(() => {
    setCurrentPage(1);
    setStoryFinished(false);
    updateStoryProgress({ currentPage: 1, currentChapter: 0 });
  }, [updateStoryProgress]);

  const tokens = useMemo(() => {
    if (!chapter) return [];
    return getChapterTokens(chapter.text);
  }, [chapter]);

  const fontSize = useMemo(() => {
    const wordCount = tokens.length;
    if (wordCount <= 5) return 'clamp(28px, 5vw, 36px)';
    if (wordCount <= 15) return 'clamp(22px, 4vw, 28px)';
    return 'clamp(18px, 3.5vw, 24px)';
  }, [tokens]);

  if (!chapter) return null;

  // In Read mode: arrows always work. In Practice mode: must finish words first.
  const canGoNext = readingMode === 'advance'
    ? currentPage < TOTAL_CHAPTERS
    : chapterComplete && currentPage < TOTAL_CHAPTERS;

  const chapterDots = Array.from({ length: CHAPTERS_PER_PAGE }, (_, i) => {
    const isRead = storyProgress.chaptersRead[chapterGroupStart + i];
    const isCurrent = i === pageInChapter;
    return (
      <div
        key={i}
        className={cn(
          'w-3 h-3 rounded-full border-2 transition-all',
          isCurrent
            ? 'border-[#0066FF] bg-[#0066FF]'
            : isRead
              ? 'border-black bg-black'
              : 'border-gray-300 bg-white'
        )}
      />
    );
  });

  if (storyFinished) {
    return (
      <div className="min-h-screen bg-graph-paper flex flex-col">
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b-2 border-black px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <Link
              to="/reading"
              className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-black bg-white hover:bg-gray-100 transition-colors"
              aria-label="Back to reading"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-lg font-bold tracking-tight">Blue Fox Story</h1>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6">
          <div className="text-4xl font-extrabold text-center text-[#0066FF]">
            Congratulations!
          </div>
          <p className="text-lg text-gray-600 text-center max-w-md">
            You finished the entire Blue Fox story! All 25 chapters, 100 pages.
          </p>
          <div className="flex flex-col items-center gap-3 mt-4">
            <button
              onClick={handleReadAgain}
              className="min-h-[56px] min-w-[200px] px-8 py-3 bg-[#0066FF] text-white text-lg font-bold rounded-xl border-2 border-black shadow-md hover:bg-[#0052CC] transition-colors"
            >
              Read Again
            </button>
            <Link
              to="/reading"
              className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
            >
              Back to Reading
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graph-paper flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b-2 border-black px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link
            to="/reading"
            className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-black bg-white hover:bg-gray-100 transition-colors"
            aria-label="Back to reading"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-lg font-bold tracking-tight">Blue Fox Story</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-bold text-gray-400">
              Chapter {chapterGroupNumber}
            </span>
            <div className="flex items-center gap-1.5">
              {chapterDots}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-4xl mx-auto w-full">
        {/* Full-size story image */}
        <div className="w-full md:w-3/5 flex items-center justify-center p-4">
          <StoryPanels pageNumber={currentPage} />
        </div>

        {/* Text area */}
        <div className="w-full md:w-2/5 flex flex-col p-4">
          <div className="flex-1 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapterIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full flex flex-col items-center"
              >
                {readingMode === 'word-tap' && !isAlreadyRead ? (
                  <WordHighlightDisplay
                    tokens={tokens}
                    fontSize={fontSize}
                    onComplete={handleWordTapComplete}
                  />
                ) : (
                  <div
                    className="flex flex-wrap items-center justify-center gap-x-[0.4em] gap-y-[0.2em] select-none"
                    style={{ fontSize }}
                  >
                    {tokens.map((token, i) => (
                      <span
                        key={i}
                        className="inline-block py-1"
                        style={{
                          fontWeight: 700,
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}
                      >
                        {token.display}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {chapterComplete && currentPage === TOTAL_CHAPTERS && (
              <button
                onClick={() => setStoryFinished(true)}
                className="mt-6 px-6 py-3 bg-[#0066FF] text-white text-base font-bold rounded-xl border-2 border-black shadow-md hover:bg-[#0052CC] transition-colors"
              >
                Finish Story
              </button>
            )}
          </div>

          {/* Bottom: page nav */}
          <div className="mt-auto pt-4">
            <StoryNav
              currentPage={currentPage}
              totalPages={TOTAL_CHAPTERS}
              canGoNext={canGoNext}
              onPrev={goToPrevPage}
              onNext={goToNextPage}
            />
          </div>
        </div>
      </div>

      {/* Mode toggle pill */}
      <button
        onClick={toggleMode}
        className="fixed bottom-4 right-4 z-40 px-4 py-2 rounded-full bg-white border-2 border-black text-sm font-bold shadow-md hover:bg-gray-100 transition-colors"
      >
        {readingMode === 'advance' ? 'Read' : 'Practice'}
      </button>
    </div>
  );
}

function StoryGuard() {
  const { progress } = useReadingProgress();
  if (!isStoryUnlocked(progress.completedLessons)) {
    return <Navigate to="/reading" replace />;
  }
  return <StoryContent />;
}

export function StoryReader() {
  return (
    <ReadingProgressProvider>
      <StoryGuard />
    </ReadingProgressProvider>
  );
}
