import React from 'react';
import { cn } from '../../lib/utils';
interface EducationalPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  footer?: React.ReactNode;
}
export function EducationalPanel({
  children,
  className,
  title,
  footer
}: EducationalPanelProps) {
  return <div className={cn('bg-white border-2 border-black rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300', className)}>
      {title && <div className="border-b-2 border-black bg-gray-50 px-6 py-3">
          <h3 className="font-bold text-lg tracking-tight">{title}</h3>
        </div>}
      <div className="p-6">{children}</div>
      {footer && <div className="border-t-2 border-black bg-gray-50 px-6 py-3 text-sm">
          {footer}
        </div>}
    </div>;
}