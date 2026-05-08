import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-black font-bold shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={24} />
      </button>
      <span className="text-sm font-bold tracking-tight min-w-[80px] text-center">
        Page {currentPage} / {totalPages}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={!canGoNext}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-black font-bold shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
