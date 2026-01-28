import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Star, Sparkles } from 'lucide-react';

interface PointsToastProps {
  points: number;
  bonus?: number;
  isVisible: boolean;
  onComplete?: () => void;
}

export function PointsToast({
  points,
  bonus = 0,
  isVisible,
  onComplete,
}: PointsToastProps) {
  const [showBonus, setShowBonus] = useState(false);
  const totalPoints = points + bonus;

  useEffect(() => {
    if (isVisible && bonus > 0) {
      const timer = setTimeout(() => setShowBonus(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowBonus(false);
    }
  }, [isVisible, bonus]);

  useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl px-6 py-4 shadow-lg border-2 border-amber-600">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Coins size={32} className="text-amber-800" />
              </motion.div>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-3xl font-bold text-white drop-shadow-md"
                >
                  +{points}
                </motion.div>
                <div className="text-amber-800 text-sm font-medium">
                  Points Earned!
                </div>
              </div>

              {/* Bonus indicator */}
              <AnimatePresence>
                {showBonus && bonus > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="flex items-center gap-1 bg-white/30 rounded-lg px-2 py-1"
                  >
                    <Star size={16} className="text-amber-800 fill-amber-800" />
                    <span className="text-amber-800 font-bold">+{bonus}</span>
                    <span className="text-amber-700 text-xs">bonus!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sparkles decoration */}
            <motion.div
              className="absolute -top-2 -right-2"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles size={20} className="text-white" />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1"
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles size={16} className="text-white" />
            </motion.div>
          </div>

          {/* Points flying up animation */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-amber-500 font-bold text-lg"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -30 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            +{totalPoints} total
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
