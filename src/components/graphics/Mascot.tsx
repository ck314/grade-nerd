import React from 'react';
import { motion } from 'framer-motion';
export function Mascot({
  className
}: {
  className?: string;
}) {
  return <motion.svg viewBox="0 0 200 200" className={className} initial={{
    y: 20
  }} animate={{
    y: -20
  }} transition={{
    repeat: Infinity,
    repeatType: 'reverse',
    duration: 2,
    ease: 'easeInOut'
  }}>
      {/* Cape */}
      <path d="M60,80 Q40,150 20,180 L180,180 Q160,150 140,80" fill="#FF0000" stroke="black" strokeWidth="4" />

      {/* Body */}
      <rect x="70" y="80" width="60" height="80" rx="10" fill="#0066FF" stroke="black" strokeWidth="4" />

      {/* Belt */}
      <rect x="70" y="130" width="60" height="15" fill="#FFD700" stroke="black" strokeWidth="4" />
      <circle cx="100" cy="137.5" r="10" fill="#FF0000" stroke="black" strokeWidth="3" />

      {/* Head */}
      <circle cx="100" cy="60" r="35" fill="#FFE0BD" stroke="black" strokeWidth="4" />

      {/* Mask */}
      <path d="M65,50 Q100,30 135,50 L135,65 Q100,80 65,65 Z" fill="#0066FF" stroke="black" strokeWidth="3" />
      <circle cx="85" cy="58" r="5" fill="white" />
      <circle cx="115" cy="58" r="5" fill="white" />

      {/* Emblem */}
      <path d="M90,95 L110,95 L100,115 Z" fill="#FFD700" stroke="black" strokeWidth="2" />

      {/* Arms */}
      <path d="M70,90 Q50,110 40,80" fill="none" stroke="black" strokeWidth="12" strokeLinecap="round" />
      <path d="M70,90 Q50,110 40,80" fill="none" stroke="#0066FF" strokeWidth="6" strokeLinecap="round" />

      <path d="M130,90 Q150,110 160,60" fill="none" stroke="black" strokeWidth="12" strokeLinecap="round" />
      <path d="M130,90 Q150,110 160,60" fill="none" stroke="#0066FF" strokeWidth="6" strokeLinecap="round" />

      {/* Fist */}
      <circle cx="160" cy="55" r="12" fill="#FF0000" stroke="black" strokeWidth="3" />
    </motion.svg>;
}