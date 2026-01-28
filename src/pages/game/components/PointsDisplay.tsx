import React from 'react';
import { cn } from '../../../lib/utils';
import { Coins } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    container: 'px-2 py-1 text-sm',
    icon: 14,
  },
  md: {
    container: 'px-3 py-1.5 text-base',
    icon: 18,
  },
  lg: {
    container: 'px-4 py-2 text-lg',
    icon: 22,
  },
};

export function PointsDisplay({
  points,
  size = 'md',
  showLabel = false,
  className,
}: PointsDisplayProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 rounded-full font-bold text-amber-700',
        config.container,
        className
      )}
    >
      <Coins size={config.icon} className="text-amber-500" />
      <span>{points}</span>
      {showLabel && <span className="font-normal text-amber-600">pts</span>}
    </div>
  );
}
