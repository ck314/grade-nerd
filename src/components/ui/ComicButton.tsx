import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
interface ComicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
export function ComicButton({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ComicButtonProps) {
  const variants = {
    primary: 'bg-[#FF0000] text-white hover:bg-red-600',
    secondary: 'bg-[#0066FF] text-white hover:bg-blue-600',
    yellow: 'bg-[#FFD700] text-black hover:bg-yellow-400'
  };
  const sizes = {
    sm: 'px-4 py-2 text-lg',
    md: 'px-8 py-3 text-xl',
    lg: 'px-10 py-4 text-2xl'
  };
  return <motion.button whileHover={{
    scale: 1.05,
    rotate: -1
  }} whileTap={{
    scale: 0.95
  }} className={cn("font-['Bangers'] tracking-wider border-4 border-black comic-shadow transition-colors relative overflow-hidden group", variants[variant], sizes[size], className)} {...props}>
      <span className="relative z-10 drop-shadow-md">{children}</span>

      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />

      {/* Halftone overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />
    </motion.button>;
}