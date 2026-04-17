import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getLesson } from '../../../data/reading';

interface LessonPickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLesson: number;
  highestLesson: number;
  onSelectLesson: (lesson: number) => void;
}

export function LessonPicker({ isOpen, onClose, currentLesson, highestLesson, onSelectLesson }: LessonPickerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      setTimeout(() => drawerRef.current?.focus(), 50);
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    }
    document.addEventListener('keydown', handleKey, true);
    return () => document.removeEventListener('keydown', handleKey, true);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const activeItem = drawerRef.current.querySelector(`[data-lesson="${currentLesson}"]`);
      activeItem?.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }, [isOpen, currentLesson]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          />
          <motion.div
            ref={drawerRef}
            tabIndex={-1}
            className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white border-l-2 border-black overflow-y-auto outline-none"
            initial={{ x: 280 }}
            animate={{ x: 0 }}
            exit={{ x: 280 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-black">
              <span className="font-bold text-lg">Lessons</span>
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close lesson picker"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-2">
              {Array.from({ length: highestLesson }, (_, i) => i + 1).map(n => {
                const lesson = getLesson(n);
                const isCurrent = n === currentLesson;
                return (
                  <button
                    key={n}
                    data-lesson={n}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(n);
                      onClose();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      isCurrent ? 'bg-[#0066FF] text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-bold w-8 text-right">{n}</span>
                    <span className="text-sm">{lesson?.newWord}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
