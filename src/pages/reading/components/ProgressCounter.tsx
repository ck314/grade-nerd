import { motion } from 'framer-motion';

const MILESTONE_COLORS = [
  '#0066FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16',
];

interface ProgressCounterProps {
  count: number;
  level: number;
}

export function ProgressCounter({ count, level }: ProgressCounterProps) {
  const fontSize = Math.min(24 + level * 2, 48);
  const color = MILESTONE_COLORS[level % MILESTONE_COLORS.length];

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-40 flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full bg-white border-2 border-black px-3 py-1 font-bold shadow-md"
      animate={{ fontSize, color }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {count}
    </motion.div>
  );
}
