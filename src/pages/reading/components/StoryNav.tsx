import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProgressSteps } from './ProgressSteps';

interface StoryNavProps {
  currentPage: number;
  totalPages: number;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function StoryNav({ currentPage, totalPages, canGoNext, onPrev, onNext }: StoryNavProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={currentPage <= 1}
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white border-2 border-black font-bold shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={24} />
      </button>
      <div className="flex-1 max-w-[200px] flex flex-col items-center gap-1">
        <div className="w-full">
          <ProgressSteps current={currentPage} total={totalPages} />
        </div>
        <span className="text-xs font-bold text-gray-400 tracking-tight">
          Page {currentPage}
        </span>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={!canGoNext}
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white border-2 border-black font-bold shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
