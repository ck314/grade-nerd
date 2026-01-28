import React from 'react';
import { cn } from '../../lib/utils';
import { AvatarItemSVG, getItemZIndex } from './AvatarItemSVG';

interface CustomizableAvatarProps {
  equippedItems: string[];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
  variant?: 'standing' | 'thinking' | 'teaching' | 'qed';
  showClickHint?: boolean;
  level?: number;
}

// Level border styles - gets more impressive as level increases
const levelBorderStyles: Record<number, string> = {
  1: '', // No border at level 1
  2: 'ring-4 ring-blue-400 ring-offset-2',
  3: 'ring-4 ring-purple-500 ring-offset-2',
  4: 'ring-4 ring-amber-500 ring-offset-2 shadow-lg shadow-amber-200',
  5: 'ring-4 ring-gradient ring-offset-2 shadow-xl shadow-purple-300',
};

// Get the border style for a level (caps at max defined level)
function getLevelBorder(level: number): string {
  if (level <= 1) return '';
  const maxLevel = Math.max(...Object.keys(levelBorderStyles).map(Number));
  const effectiveLevel = Math.min(level, maxLevel);
  return levelBorderStyles[effectiveLevel] || levelBorderStyles[maxLevel];
}

const sizeClasses = {
  sm: 'w-12 h-24',
  md: 'w-16 h-32',
  lg: 'w-24 h-48',
  xl: 'w-32 h-64',
};

export function CustomizableAvatar({
  equippedItems,
  size = 'md',
  onClick,
  className,
  variant = 'standing',
  showClickHint = false,
  level = 1,
}: CustomizableAvatarProps) {
  // Sort items by z-index for proper layering
  const sortedItems = [...equippedItems].sort((a, b) => getItemZIndex(a) - getItemZIndex(b));

  // Split items by z-index (before/after base figure)
  const itemsBehind = sortedItems.filter(id => getItemZIndex(id) < 0);
  const itemsInFront = sortedItems.filter(id => getItemZIndex(id) >= 0);

  const levelBorder = getLevelBorder(level);

  return (
    <div
      className={cn(
        'relative',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:scale-105 transition-transform',
        levelBorder && 'rounded-xl p-1 bg-white',
        levelBorder,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <svg
        viewBox="0 0 100 200"
        className="w-full h-full text-black fill-none stroke-current stroke-[3]"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Items behind the figure */}
        {itemsBehind.map(itemId => (
          <AvatarItemSVG key={itemId} itemId={itemId} />
        ))}

        {/* Base stick figure - Head */}
        <circle cx="50" cy="30" r="20" />

        {/* Default glasses (can be overridden by equipped glasses) */}
        {!equippedItems.includes('round-glasses') &&
         !equippedItems.includes('thick-glasses') &&
         !equippedItems.includes('safety-goggles') && (
          <g className="stroke-[2]">
            <circle cx="42" cy="30" r="6" />
            <circle cx="58" cy="30" r="6" />
            <path d="M48 30 h4" />
            <path d="M36 30 h-4" />
            <path d="M64 30 h4" />
          </g>
        )}

        {/* Smile */}
        <path d="M45 42 q5 5 10 0" className="stroke-[2]" />

        {/* Body */}
        <line x1="50" y1="50" x2="50" y2="120" />

        {variant === 'standing' && (
          <>
            {/* Arms */}
            <path d="M50 70 l-25 20" />
            <path d="M50 70 l25 20" />
            {/* Legs */}
            <path d="M50 120 l-20 60" />
            <path d="M50 120 l20 60" />
          </>
        )}

        {variant === 'thinking' && (
          <>
            {/* Arms - one on chin */}
            <path d="M50 70 l-25 20" />
            <path d="M50 70 l25 -10 l10 -20" />
            {/* Legs */}
            <path d="M50 120 l-20 60" />
            <path d="M50 120 l20 60" />
          </>
        )}

        {variant === 'teaching' && (
          <>
            {/* Arms - pointing */}
            <path d="M50 70 l-25 20" />
            <path d="M50 70 l35 -20" />
            {/* Legs - walking */}
            <path d="M50 120 l-15 60" />
            <path d="M50 120 l25 50" />
          </>
        )}

        {variant === 'qed' && (
          <>
            {/* Arms - hands on hips */}
            <path d="M50 70 l-20 20 l5 15" />
            <path d="M50 70 l20 20 l-5 15" />
            {/* Legs - wide stance */}
            <path d="M50 120 l-25 60" />
            <path d="M50 120 l25 60" />
          </>
        )}

        {/* Items in front of the figure, sorted by z-index */}
        {itemsInFront.map(itemId => (
          <AvatarItemSVG key={itemId} itemId={itemId} />
        ))}
      </svg>

      {/* Click hint badge */}
      {showClickHint && onClick && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0066FF] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          <span className="text-white text-xs">+</span>
        </div>
      )}

      {/* Level badge */}
      {level > 1 && (
        <div className={cn(
          'absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm font-bold text-xs text-white',
          level === 2 && 'bg-blue-500',
          level === 3 && 'bg-purple-500',
          level === 4 && 'bg-amber-500',
          level >= 5 && 'bg-gradient-to-br from-purple-500 to-amber-500',
        )}>
          {level}
        </div>
      )}
    </div>
  );
}
