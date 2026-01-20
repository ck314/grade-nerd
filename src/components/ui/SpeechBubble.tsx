import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
interface SpeechBubbleProps {
  children: React.ReactNode;
  author: string;
  role?: string;
  delay?: number;
  className?: string;
}
export function SpeechBubble({
  children,
  author,
  role,
  delay = 0,
  className
}: SpeechBubbleProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 50,
    scale: 0.8
  }} whileInView={{
    opacity: 1,
    y: 0,
    scale: 1
  }} viewport={{
    once: true
  }} transition={{
    type: 'spring',
    bounce: 0.5,
    delay
  }} className={cn('flex flex-col items-start', className)}>
      <div className="relative bg-white border-4 border-black p-6 rounded-2xl comic-shadow mb-6 w-full">
        <p className="font-['Comic_Neue'] text-xl font-bold leading-relaxed">
          "{children}"
        </p>

        {/* Tail */}
        <div className="absolute -bottom-[24px] left-8 w-0 h-0 border-l-[20px] border-l-transparent border-r-[0px] border-r-transparent border-t-[24px] border-t-black"></div>
        <div className="absolute -bottom-[18px] left-[34px] w-0 h-0 border-l-[16px] border-l-transparent border-r-[0px] border-r-transparent border-t-[20px] border-t-white"></div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <div className="w-12 h-12 rounded-full border-2 border-black bg-[#FFD700] flex items-center justify-center overflow-hidden">
          <span className="font-['Bangers'] text-xl">{author.charAt(0)}</span>
        </div>
        <div>
          <div className="font-['Bangers'] text-xl tracking-wide">{author}</div>
          {role && <div className="font-['Comic_Neue'] font-bold text-sm text-gray-600 uppercase">
              {role}
            </div>}
        </div>
      </div>
    </motion.div>;
}