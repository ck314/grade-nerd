import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { Sparkles, Trophy, Star } from 'lucide-react';

interface UnlockAnimationProps {
  type: 'formula' | 'example' | 'unit';
  title: string;
  subtitle?: string;
  onComplete?: () => void;
}

export function UnlockAnimation({ type, title, subtitle, onComplete }: UnlockAnimationProps) {
  const getIcon = () => {
    switch (type) {
      case 'formula':
        return <Sparkles className="w-12 h-12" />;
      case 'example':
        return <Star className="w-12 h-12" />;
      case 'unit':
        return <Trophy className="w-12 h-12" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'formula':
        return {
          bg: 'bg-blue-500',
          light: 'bg-blue-100',
          text: 'text-blue-600',
          label: 'NEW FORMULA UNLOCKED!',
        };
      case 'example':
        return {
          bg: 'bg-green-500',
          light: 'bg-green-100',
          text: 'text-green-600',
          label: 'WORKED EXAMPLE UNLOCKED!',
        };
      case 'unit':
        return {
          bg: 'bg-yellow-500',
          light: 'bg-yellow-100',
          text: 'text-yellow-600',
          label: 'UNIT COMPLETE!',
        };
    }
  };

  const colors = getColors();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onComplete}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="bg-white rounded-2xl border-4 border-black p-8 max-w-md w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Burst effect */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={cn(
            'w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-white',
            colors.bg
          )}
        >
          {getIcon()}
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn(
            'inline-block px-4 py-1 rounded-full font-bold text-sm mb-3',
            colors.light, colors.text
          )}
        >
          {colors.label}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold mb-2"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onComplete}
          className={cn(
            'mt-6 px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105',
            colors.bg
          )}
        >
          Continue
        </motion.button>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * (50 + Math.random() * 50)],
              y: [0, -50 - Math.random() * 50],
            }}
            transition={{
              delay: 0.3 + i * 0.1,
              duration: 1,
              ease: 'easeOut',
            }}
            className={cn(
              'absolute w-3 h-3 rounded-full',
              i % 3 === 0 ? colors.bg : i % 3 === 1 ? 'bg-yellow-400' : 'bg-pink-400'
            )}
            style={{
              left: '50%',
              top: '40%',
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
