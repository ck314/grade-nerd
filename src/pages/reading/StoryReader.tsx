import { useState, useCallback, useEffect, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReadingProgressProvider, useReadingProgress, isStoryUnlocked, createInitialStoryProgress } from '../../contexts/ReadingProgressContext';
import { getStoryPage, TOTAL_PAGES, CHAPTERS_PER_PAGE, StoryPage } from '../../data/reading/storyChapters';
import { cn } from '../../lib/utils';
import { getChapterTokens } from '../../data/reading/tokenization';
import { WordHighlightDisplay } from './components/WordHighlightDisplay';
import { StoryNav } from './components/StoryNav';

function StoryContent() {
  const { progress, advanceStoryChapter, updateStoryProgress } = useReadingProgress();
  const storyProgress = progress.storyProgress ?? createInitialStoryProgress();
  const [currentPage, setCurrentPage] = useState(storyProgress.currentPage);
  const [currentChapterInPage, setCurrentChapterInPage] = useState(() => {
    // Derive chapter-in-page from the global chapter index
    const savedPage = storyProgress.currentPage;
    const savedGlobal = storyProgress.currentChapter;
    // If saved global chapter belongs to saved page, use its offset; otherwise start at 0
    const pageStart = (savedPage - 1) * CHAPTERS_PER_PAGE;
    if (savedGlobal >= pageStart && savedGlobal < pageStart + CHAPTERS_PER_PAGE) {
      return savedGlobal - pageStart;
    }
    return 0;
  });
  const [readingMode, setReadingMode] = useState<'advance' | 'word-tap'>(storyProgress.readingMode);
  const [chapterComplete, setChapterComplete] = useState(false);
  const [storyFinished, setStoryFinished] = useState(false);

  const page: StoryPage | undefined = useMemo(() => getStoryPage(currentPage), [currentPage]);
  const chapter = page?.chapters[currentChapterInPage];
  const globalChapterIndex = (currentPage - 1) * CHAPTERS_PER_PAGE + currentChapterInPage;

  // Check if this chapter was already read
  const isAlreadyRead = storyProgress.chaptersRead[globalChapterIndex] === true;

  // On mount or page/chapter change, check if already complete
  useEffect(() => {
    if (isAlreadyRead) {
      setChapterComplete(true);
    } else {
      setChapterComplete(false);
    }
  }, [globalChapterIndex, isAlreadyRead]);

  // Check if all 4 chapters on current page are read
  const allPageChaptersRead = useMemo(() => {
    const pageStart = (currentPage - 1) * CHAPTERS_PER_PAGE;
    return Array.from({ length: CHAPTERS_PER_PAGE }, (_, i) => i).every(i => storyProgress.chaptersRead[pageStart + i]);
  }, [currentPage, storyProgress.chaptersRead]);

  const completeCurrentChapter = useCallback(() => {
    if (chapterComplete) return;
    setChapterComplete(true);
    advanceStoryChapter(globalChapterIndex);
  }, [chapterComplete, advanceStoryChapter, globalChapterIndex]);

  // Tap-to-advance: click handler for "Read" mode
  const handleReadModeClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"]')) return;
    if (readingMode !== 'advance') return;
    if (chapterComplete) {
      // If chapter done, advance to next chapter if available
      if (currentChapterInPage < CHAPTERS_PER_PAGE - 1) {
        setCurrentChapterInPage(prev => prev + 1);
      }
      return;
    }
    completeCurrentChapter();
  }, [readingMode, chapterComplete, currentChapterInPage, completeCurrentChapter]);

  // Keydown for Read mode
  useEffect(() => {
    if (readingMode !== 'advance') return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) return;
      if (e.key === ' ') e.preventDefault();

      if (!chapterComplete) {
        completeCurrentChapter();
      } else if (currentChapterInPage < CHAPTERS_PER_PAGE - 1) {
        setCurrentChapterInPage(prev => prev + 1);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [readingMode, chapterComplete, currentChapterInPage, completeCurrentChapter]);

  // Word-tap mode complete callback
  const handleWordTapComplete = useCallback(() => {
    completeCurrentChapter();
  }, [completeCurrentChapter]);

  // Navigate to next chapter within page
  const advanceToNextChapter = useCallback(() => {
    if (currentChapterInPage < CHAPTERS_PER_PAGE - 1) {
      setCurrentChapterInPage(prev => prev + 1);
    }
  }, [currentChapterInPage]);

  // Page navigation
  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setCurrentChapterInPage(0);
      setStoryFinished(false);
      updateStoryProgress({ currentPage: newPage, currentChapter: (newPage - 1) * CHAPTERS_PER_PAGE });
    }
  }, [currentPage, updateStoryProgress]);

  const goToNextPage = useCallback(() => {
    if (currentPage < TOTAL_PAGES && allPageChaptersRead) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setCurrentChapterInPage(0);
      setStoryFinished(false);
      updateStoryProgress({ currentPage: newPage, currentChapter: (newPage - 1) * CHAPTERS_PER_PAGE });
    }
  }, [currentPage, allPageChaptersRead, updateStoryProgress]);

  // Toggle reading mode
  const toggleMode = useCallback(() => {
    const newMode = readingMode === 'advance' ? 'word-tap' as const : 'advance' as const;
    setReadingMode(newMode);
    updateStoryProgress({ readingMode: newMode });
  }, [readingMode, updateStoryProgress]);

  // Read Again handler
  const handleReadAgain = useCallback(() => {
    setCurrentPage(1);
    setCurrentChapterInPage(0);
    setStoryFinished(false);
    updateStoryProgress({ currentPage: 1, currentChapter: 0 });
    // chaptersRead is NOT cleared
  }, [updateStoryProgress]);

  // Token computation for word-tap mode
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

  if (!page || !chapter) return null;

  // Story finished screen
  if (storyFinished) {
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
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6">
          <div className="text-4xl font-extrabold text-center text-[#0066FF]">
            Congratulations!
          </div>
          <p className="text-lg text-gray-600 text-center max-w-md">
            You finished the entire Blue Fox story! All 100 chapters across 25 pages.
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

  // Chapter indicators (dots)
  const chapterDots = Array.from({ length: CHAPTERS_PER_PAGE }, (_, i) => i).map(i => {
    const gi = (currentPage - 1) * CHAPTERS_PER_PAGE + i;
    const isRead = storyProgress.chaptersRead[gi];
    const isCurrent = i === currentChapterInPage;
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

  // Can go to next page: all 4 chapters read
  const canGoNext = allPageChaptersRead && currentPage < TOTAL_PAGES;

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
          <div className="ml-auto flex items-center gap-1.5">
            {chapterDots}
          </div>
        </div>
      </div>

      {/* Main content: side-by-side on md+, stacked on mobile */}
      <div className="flex-1 flex flex-col md:flex-row max-w-4xl mx-auto w-full">
        {/* Panel image placeholder (Unit 12) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="w-full aspect-[3/4] max-h-[500px] bg-gray-200 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-bold text-center px-4">
              Story panels coming in Unit 12
            </span>
          </div>
        </div>

        {/* Text area */}
        <div className="w-full md:w-1/2 flex flex-col p-4" onClick={handleReadModeClick}>
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Chapter number */}
            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
              Chapter {chapter.chapter}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={globalChapterIndex}
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
                    className="flex flex-wrap items-center justify-center gap-x-[0.4em] gap-y-[0.2em] cursor-pointer select-none"
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

            {/* Completion / advance UI */}
            {chapterComplete && currentChapterInPage < CHAPTERS_PER_PAGE - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); advanceToNextChapter(); }}
                className="mt-6 px-6 py-3 bg-[#0066FF] text-white text-base font-bold rounded-xl border-2 border-black shadow-md hover:bg-[#0052CC] transition-colors"
              >
                Next Chapter
              </button>
            )}

            {chapterComplete && currentChapterInPage === CHAPTERS_PER_PAGE - 1 && !allPageChaptersRead && (
              <div className="mt-6 text-sm text-gray-400 font-bold">
                Finish all chapters to continue...
              </div>
            )}

            {chapterComplete && currentChapterInPage === CHAPTERS_PER_PAGE - 1 && allPageChaptersRead && currentPage < TOTAL_PAGES && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
                className="mt-6 px-6 py-3 bg-[#0066FF] text-white text-base font-bold rounded-xl border-2 border-black shadow-md hover:bg-[#0052CC] transition-colors"
              >
                Next Page
              </button>
            )}

            {chapterComplete && currentChapterInPage === CHAPTERS_PER_PAGE - 1 && allPageChaptersRead && currentPage === TOTAL_PAGES && (
              <button
                onClick={(e) => { e.stopPropagation(); setStoryFinished(true); }}
                className="mt-6 px-6 py-3 bg-[#0066FF] text-white text-base font-bold rounded-xl border-2 border-black shadow-md hover:bg-[#0052CC] transition-colors"
              >
                Finish Story
              </button>
            )}
          </div>

          {/* Bottom section: mode toggle + page nav */}
          <div className="mt-auto pt-4">
            <StoryNav
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              canGoNext={canGoNext}
              onPrev={goToPrevPage}
              onNext={goToNextPage}
            />
          </div>
        </div>
      </div>

      {/* Mode toggle pill - bottom right */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleMode(); }}
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
