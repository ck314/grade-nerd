import { useState, useCallback, useMemo } from 'react';
import { Menu, LayoutGrid, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReadingProgressProvider, useReadingProgress, getEarnedWords, isStoryUnlocked } from '../../contexts/ReadingProgressContext';
import { getLesson, getWordTokens, selectVersion, readingLessons, getContentWord, ContentWord } from '../../data/reading';
import { ProgressCounter } from './components/ProgressCounter';
import { LessonNav } from './components/LessonNav';
import { LessonPicker } from './components/LessonPicker';
import { LessonDisplay } from './components/LessonDisplay';
import { DecorativeAvatar } from './components/DecorativeAvatar';
import { WordCelebration } from './components/WordCelebration';
import { InlineWordBadge } from './components/InlineWordBadge';
import { StoryInvitation } from './components/StoryInvitation';
import { RewardStrip } from './components/RewardStrip';

function ReadingContent() {
  const { progress, setCurrentLesson, completeLesson, getMasteryStats, getCurrentMilestone, updateStoryProgress } = useReadingProgress();
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isTraversing, setIsTraversing] = useState(true);
  const [lessonKey, setLessonKey] = useState(0);
  const [pendingCelebration, setPendingCelebration] = useState<{ word: ContentWord; isGold: boolean } | null>(null);

  const storyUnlocked = isStoryUnlocked(progress.completedLessons);
  const invitationSeen = progress.storyProgress?.storyInvitationSeen ?? false;
  const [showStoryInvitation, setShowStoryInvitation] = useState(() => storyUnlocked && !invitationSeen);

  const lesson = getLesson(progress.currentLesson);

  // Lock version selection when lesson loads — prevent text change on completion
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const versionIndex = useMemo(() => {
    if (!lesson) return 0;
    return lesson.versions.length > 1
      ? selectVersion(lesson, progress.lastVersions[progress.currentLesson])
      : 0;
  }, [progress.currentLesson, lessonKey]);

  const tokens = useMemo(() => lesson ? getWordTokens(lesson, versionIndex) : [], [lesson, versionIndex]);

  const handleLessonComplete = useCallback((normalizedWords: string[]) => {
    const isFirstCompletion = !progress.completedLessons.includes(progress.currentLesson);
    const contentWord = getContentWord(progress.currentLesson);

    if (isFirstCompletion && contentWord) {
      const willUnlockStory = !storyUnlocked && isStoryUnlocked([...progress.completedLessons, progress.currentLesson]);
      setPendingCelebration({ word: contentWord, isGold: willUnlockStory });
    }

    completeLesson(progress.currentLesson, normalizedWords, versionIndex);
    setIsTraversing(false);
  }, [completeLesson, progress.currentLesson, progress.completedLessons, versionIndex, storyUnlocked]);

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

  const handleCelebrationDismiss = useCallback(() => {
    const wasGold = pendingCelebration?.isGold;
    setPendingCelebration(null);
    if (wasGold) {
      setShowStoryInvitation(true);
    } else {
      handleNextLesson();
    }
  }, [pendingCelebration, handleNextLesson]);

  const handleInvitationDismiss = useCallback(() => {
    setShowStoryInvitation(false);
    updateStoryProgress({ storyInvitationSeen: true });
  }, [updateStoryProgress]);

  const handleStartReading = useCallback(() => {
    setShowStoryInvitation(false);
    updateStoryProgress({ storyInvitationSeen: true });
    navigate('/reading/story');
  }, [updateStoryProgress, navigate]);

  const revisitContentWord = !pendingCelebration ? getContentWord(progress.currentLesson) : undefined;
  const showInlineBadge = revisitContentWord && progress.completedLessons.includes(progress.currentLesson) && !pendingCelebration;

  const earnedWords = getEarnedWords(progress.completedLessons);
  const hasEarnedWords = earnedWords.length > 0;

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

      {/* Collection + Story icons — centered top */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        <Link
          to="/reading/collection"
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border-2 border-[#0066FF] hover:bg-blue-50 transition-all shadow-md"
          style={{ opacity: hasEarnedWords ? 1 : 0, pointerEvents: hasEarnedWords ? 'auto' : 'none' }}
          aria-label="Word collection"
          tabIndex={hasEarnedWords ? undefined : -1}
          onClick={(e) => e.stopPropagation()}
        >
          <LayoutGrid size={20} className="text-[#0066FF]" />
        </Link>
        <Link
          to="/reading/story"
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border-2 border-[#0066FF] hover:bg-blue-50 transition-all shadow-md"
          style={{ opacity: storyUnlocked ? 1 : 0, pointerEvents: storyUnlocked ? 'auto' : 'none' }}
          tabIndex={storyUnlocked ? undefined : -1}
          aria-label="Read story"
          onClick={(e) => e.stopPropagation()}
        >
          <BookOpen size={20} className="text-[#0066FF]" />
        </Link>
      </div>

      {/* Hamburger — top right */}
      <button
        onClick={(e) => { e.stopPropagation(); setPickerOpen(true); }}
        className="fixed top-4 right-4 z-40 w-10 h-10 flex items-center justify-center rounded-lg bg-white border-2 border-black hover:bg-gray-100 transition-colors shadow-md"
        aria-label="Open lesson picker"
      >
        <Menu size={20} />
      </button>

      {/* Reward strip — left side */}
      <RewardStrip completedLessons={progress.completedLessons} pendingLessonNumber={pendingCelebration?.word.lessonNumber} />

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
        totalLessons={readingLessons.length}
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
              completionExtra={showInlineBadge ? (
                <InlineWordBadge word={revisitContentWord.word} imagePath={revisitContentWord.imagePath} />
              ) : undefined}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {pendingCelebration && (
        <WordCelebration
          key={`celebration-${progress.currentLesson}`}
          word={pendingCelebration.word.word}
          imagePath={pendingCelebration.word.imagePath}
          isGold={pendingCelebration.isGold}
          onDismiss={handleCelebrationDismiss}
        />
      )}

      {showStoryInvitation && !pendingCelebration && (
        <StoryInvitation
          onStartReading={handleStartReading}
          onDismiss={handleInvitationDismiss}
        />
      )}
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
