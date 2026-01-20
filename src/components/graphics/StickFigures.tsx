import React from 'react';
import { cn } from '../../lib/utils';
interface StickFigureProps {
  className?: string;
  variant?: 'standing' | 'thinking' | 'teaching' | 'qed';
}
export function StickFigure({
  className,
  variant = 'standing'
}: StickFigureProps) {
  return <svg viewBox="0 0 100 200" className={cn('w-full h-full text-black fill-none stroke-current stroke-[3]', className)} strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx="50" cy="30" r="20" />

      {/* Glasses */}
      <g className="stroke-[2]">
        <circle cx="42" cy="30" r="6" />
        <circle cx="58" cy="30" r="6" />
        <path d="M48 30 h4" />
        <path d="M36 30 h-4" />
        <path d="M64 30 h4" />
      </g>

      {/* Smile */}
      <path d="M45 42 q5 5 10 0" className="stroke-[2]" />

      {/* Body */}
      <line x1="50" y1="50" x2="50" y2="120" />

      {variant === 'standing' && <>
          {/* Arms */}
          <path d="M50 70 l-25 20" />
          <path d="M50 70 l25 20" />
          {/* Legs */}
          <path d="M50 120 l-20 60" />
          <path d="M50 120 l20 60" />
        </>}

      {variant === 'thinking' && <>
          {/* Arms - one on chin */}
          <path d="M50 70 l-25 20" />
          <path d="M50 70 l25 -10 l10 -20" />
          {/* Legs */}
          <path d="M50 120 l-20 60" />
          <path d="M50 120 l20 60" />
        </>}

      {variant === 'teaching' && <>
          {/* Arms - pointing */}
          <path d="M50 70 l-25 20" />
          <path d="M50 70 l35 -20" />
          {/* Legs - walking */}
          <path d="M50 120 l-15 60" />
          <path d="M50 120 l25 50" />
        </>}

      {variant === 'qed' && <>
          {/* Arms - hands on hips */}
          <path d="M50 70 l-20 20 l5 15" />
          <path d="M50 70 l20 20 l-5 15" />
          {/* Legs - wide stance */}
          <path d="M50 120 l-25 60" />
          <path d="M50 120 l25 60" />
        </>}
    </svg>;
}