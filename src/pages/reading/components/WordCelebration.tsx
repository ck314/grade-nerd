import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface WordCelebrationProps {
  word: string;
  imagePath: string;
  isGold: boolean;
  onDismiss: () => void;
}

export function WordCelebration({ word, imagePath, isGold, onDismiss }: WordCelebrationProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
        role="dialog"
        aria-modal="true"
        aria-label={`New word earned: ${word}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onDismiss}
      >
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {!imageError && (
            <img
              src={imagePath}
              alt={word}
              loading="lazy"
              className="w-[400px] h-[400px] object-contain rounded-2xl"
              onError={() => setImageError(true)}
            />
          )}
          <span
            className={cn(
              'text-5xl font-bold text-center',
              isGold ? 'text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.6)]' : 'text-white'
            )}
          >
            {word}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
