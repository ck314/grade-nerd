import { useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const MILESTONE_COLORS = [
  '#0066FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16',
];

interface ProgressCounterProps {
  masteredCount: number;
  nextWord: string;
  nextCount: number;
  level: number;
}

export function ProgressCounter({ masteredCount, nextWord, nextCount, level }: ProgressCounterProps) {
  const color = MILESTONE_COLORS[level % MILESTONE_COLORS.length];
  const prevLevelRef = useRef(level);
  const controls = useAnimationControls();

  useEffect(() => {
    if (level > prevLevelRef.current) {
      controls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.4, ease: 'easeInOut' },
      });
    }
    prevLevelRef.current = level;
  }, [level, controls]);

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-40 flex flex-col items-start rounded-2xl bg-white border-2 border-black px-3 py-2 font-bold shadow-md"
      animate={controls}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="flex items-baseline gap-1"
        animate={{ color }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <span className="text-2xl leading-tight">{masteredCount}</span>
        <span className="text-xs leading-tight">mastered</span>
      </motion.div>
      {nextWord && (
        <div className="flex items-baseline gap-1 text-gray-500">
          <span className="text-sm leading-tight">{nextCount}/10</span>
          <span className="text-xs leading-tight">{nextWord}</span>
        </div>
      )}
    </motion.div>
  );
}
