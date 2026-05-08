import { useState, useCallback, useMemo } from 'react';
import { Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReadingProgressProvider, useReadingProgress, getEarnedWords, isStoryUnlocked } from '../../contexts/ReadingProgressContext';
import { getLesson, getWordTokens, selectVersion, readingLessons, getContentWord, ContentWord } from '../../data/reading';
import { ProgressCounter } from './components/ProgressCounter';
import { LessonNav } from './components/LessonNav';
import { LessonPicker } from './components/LessonPicker';
import { LessonDisplay } from './components/LessonDisplay';
import { DecorativeAvatar } from './components/DecorativeAvatar';

function ReadingContent() {
  const { progress, setCurrentLesson, completeLesson, getMasteryStats, getCurrentMilestone } = useReadingProgress();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isTraversing, setIsTraversing] = useState(true);
  const [lessonKey, setLessonKey] = useState(0);
  const [pendingCelebration, setPendingCelebration] = useState<{ word: ContentWord; isGold: boolean } | null>(null);
  const [showStoryInvitation, setShowStoryInvitation] = useState(false);

  const lesson = getLesson(progress.currentLesson);

  // Lock version selection when lesson loads — prevent text change on completion
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const versionIndex = useMemo(() => {
    if (!lesson) return 0;
    return lesson.versions.length > 1
      ? selectVersion(lesson, progress.lastVersions[progress.currentLesson])
      : 0;
  }, [progress.currentLesson, lessonKey]);

  const tokens = lesson ? getWordTokens(lesson, versionIndex) : [];

  const handleLessonComplete = useCallback((normalizedWords: string[]) => {
    const isFirstCompletion = !progress.completedLessons.includes(progress.currentLesson);
    const contentWord = getContentWord(progress.currentLesson);

    if (isFirstCompletion && contentWord) {
      const isGold = contentWord.word === 'gold';
      setPendingCelebration({ word: contentWord, isGold });
    }

    completeLesson(progress.currentLesson, normalizedWords, versionIndex);
    setIsTraversing(false);
  }, [completeLesson, progress.currentLesson, progress.completedLessons, versionIndex]);

  const goToLesson = useCallback((n: number) => {
    setCurrentLesson(n);
    setIsTraversing(true);
    setLessonKey(k => k + 1);
  }, [setCurrentLesson]);

  const handleNextLesson = useCallback(() => {
    if (progress.currentLesson < readingLessons.length) {
      goToLesson(progress.currentLesson + 1);
    }
  }, [goToLesson, progress.currentLesson]);

  const handleBack = useCallback(() => {
    if (progress.currentLesson > 1) {
      goToLesson(progress.currentLesson - 1);
    }
  }, [goToLesson, progress.currentLesson]);

  const handleForward = useCallback(() => {
    if (progress.currentLesson < progress.highestLesson) {
      goToLesson(progress.currentLesson + 1);
    }
  }, [goToLesson, progress.currentLesson, progress.highestLesson]);

  const milestone = getCurrentMilestone();
  const mastery = getMasteryStats();

  return (
    <div className="min-h-screen bg-graph-paper relative">
      {/* Logo — top left */}
      <div
        className="fixed top-4 left-4 z-40 w-10 h-10 bg-black rounded flex items-center justify-center text-white cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-bold text-sm">gn</span>
      </div>

      {/* Hamburger — top right */}
      <button
        onClick={(e) => { e.stopPropagation(); setPickerOpen(true); }}
        className="fixed top-4 right-4 z-40 w-10 h-10 flex items-center justify-center rounded-lg bg-white border-2 border-black hover:bg-gray-100 transition-colors shadow-md"
        aria-label="Open lesson picker"
      >
        <Menu size={20} />
      </button>

      {/* Progress counter — bottom left */}
      <ProgressCounter
        masteredCount={mastery.masteredCount}
        nextWord={mastery.nextWord}
        nextCount={mastery.nextCount}
        level={milestone.level}
      />

      {/* Lesson navigation arrows — bottom right */}
      <LessonNav
        currentLesson={progress.currentLesson}
        highestLesson={progress.highestLesson}
        visible={!isTraversing}
        onBack={handleBack}
        onForward={handleForward}
      />

      {/* Lesson picker drawer */}
      <LessonPicker
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        currentLesson={progress.currentLesson}
        highestLesson={progress.highestLesson}
        onSelectLesson={goToLesson}
      />

      {/* Main content area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${progress.currentLesson}-${lessonKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="min-h-screen"
        >
          <DecorativeAvatar key={`avatar-${isTraversing}`} avoidCenter={!isTraversing} lessonNumber={progress.currentLesson} isTraversing={isTraversing} />
          {lesson && (
            <LessonDisplay
              lessonNumber={progress.currentLesson}
              tokens={tokens}
              isLastLesson={progress.currentLesson === readingLessons.length}
              onComplete={handleLessonComplete}
              onNextLesson={handleNextLesson}
              suppressCompletion={!!pendingCelebration}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ReadingPage() {
  return (
    <ReadingProgressProvider>
      <ReadingContent />
    </ReadingProgressProvider>
  );
}
