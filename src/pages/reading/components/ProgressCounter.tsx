import { useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const MILESTONE_COLORS = [
  '#0066FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16',
];

interface ProgressCounterProps {
  count: number;
  word: string;
  level: number;
}

export function ProgressCounter({ count, word, level }: ProgressCounterProps) {
  const countSize = Math.min(24 + level * 2, 48);
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

  if (count === 0) {
    return (
      <div
        className="fixed bottom-4 left-4 z-40 flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full bg-white border-2 border-black px-3 py-1 font-bold shadow-md text-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        0
      </div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-40 flex flex-col items-center justify-center min-w-[48px] min-h-[48px] rounded-2xl bg-white border-2 border-black px-3 py-1 font-bold shadow-md"
      animate={controls}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.span
        animate={{ fontSize: countSize, color }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="leading-tight"
      >
        {count}
      </motion.span>
      <span className="text-xs text-gray-500 leading-tight">{word}</span>
    </motion.div>
  );
}
