import React from 'react';
import { cn } from '../../lib/utils';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-[#0066FF] text-white border-2 border-[#0066FF] hover:bg-[#0052CC] hover:border-[#0052CC]',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-50',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black/5',
    ghost: 'bg-transparent text-black hover:bg-black/5 border-2 border-transparent'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  return <button className={cn('font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2', 'focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2', variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>;
}