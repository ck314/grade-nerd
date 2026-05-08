import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProgressSteps } from './ProgressSteps';

interface LessonNavProps {
  currentLesson: number;
  highestLesson: number;
  totalLessons: number;
  visible: boolean;
  onBack: () => void;
  onForward: () => void;
}

export function LessonNav({ currentLesson, highestLesson, totalLessons, visible, onBack, onForward }: LessonNavProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={(e) => { e.stopPropagation(); onBack(); }}
        disabled={currentLesson <= 1}
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white border-2 border-black font-bold shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        aria-label="Previous lesson"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="w-36">
        <ProgressSteps current={currentLesson} total={totalLessons} />
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onForward(); }}
        disabled={currentLesson >= highestLesson}
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white border-2 border-black font-bold shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        aria-label="Next lesson"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
