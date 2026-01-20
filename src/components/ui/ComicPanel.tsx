import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
interface ComicPanelProps {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  delay?: number;
  variant?: 'white' | 'yellow' | 'blue' | 'red';
}
export function ComicPanel({
  children,
  className,
  rotate = 0,
  delay = 0,
  variant = 'white'
}: ComicPanelProps) {
  const bgColors = {
    white: 'bg-white',
    yellow: 'bg-[#FFD700]',
    blue: 'bg-[#0066FF]',
    red: 'bg-[#FF0000]'
  };
  return <motion.div initial={{
    opacity: 0,
    scale: 0.9,
    rotate: rotate - 5
  }} whileInView={{
    opacity: 1,
    scale: 1,
    rotate: rotate
  }} viewport={{
    once: true,
    margin: '-50px'
  }} transition={{
    type: 'spring',
    stiffness: 200,
    damping: 15,
    delay: delay
  }} className={cn('border-[5px] border-black comic-shadow p-6 relative overflow-hidden', bgColors[variant], className)}>
      {/* Halftone Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-halftone-color text-black" />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>;
}