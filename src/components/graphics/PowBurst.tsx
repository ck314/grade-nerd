import React from 'react';
import { motion } from 'framer-motion';
export function PowBurst({
  className
}: {
  className?: string;
}) {
  return <motion.div className={className} initial={{
    scale: 0,
    rotate: -180
  }} animate={{
    scale: 1,
    rotate: 0
  }} transition={{
    type: 'spring',
    stiffness: 260,
    damping: 20,
    delay: 0.2
  }}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Burst Shape */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          <path d="M100,10 L120,60 L170,40 L150,90 L190,120 L140,140 L160,190 L110,160 L80,190 L70,140 L20,160 L50,110 L10,80 L60,60 L40,10 Z" fill="#FFD700" stroke="black" strokeWidth="4" />
        </svg>

        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="font-['Bangers'] text-6xl text-[#FF0000] tracking-widest rotate-[-15deg]" style={{
          WebkitTextStroke: '2px black',
          textShadow: '4px 4px 0px black'
        }} animate={{
          scale: [1, 1.2, 1]
        }} transition={{
          repeat: Infinity,
          duration: 1.5
        }}>
            POW!
          </motion.span>
        </div>
      </div>
    </motion.div>;
}