import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryInvitationProps {
  onStartReading: () => void;
  onDismiss: () => void;
}

export function StoryInvitation({ onStartReading, onDismiss }: StoryInvitationProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onDismiss}
      >
        <motion.div
          className="flex flex-col items-center gap-5 px-6 max-w-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {!imageError && (
            <img
              src="/grade-nerd/images/reading/story/base.webp"
              alt="Blue Fox Red Whale"
              loading="lazy"
              className="w-[280px] h-[280px] object-contain rounded-2xl"
              onError={() => setImageError(true)}
            />
          )}

          <h2 className="text-4xl font-bold text-white text-center">
            Blue Fox Red Whale
          </h2>

          <p className="text-lg text-white/80 text-center">
            Your story is ready!
          </p>

          <button
            onClick={onStartReading}
            className="mt-2 px-8 py-3 bg-[#0066FF] text-white font-bold text-lg rounded-xl border-2 border-black shadow-md active:scale-95 transition-transform"
          >
            Start Reading
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
