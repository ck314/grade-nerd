import React from 'react';
import { cn } from '../../../lib/utils';
import { WorkedExample } from '../../../data/game/gameTypes';
import { Check } from 'lucide-react';

interface ExampleCardProps {
  example: WorkedExample;
  compact?: boolean;
  className?: string;
}

export function ExampleCard({ example, compact = false, className }: ExampleCardProps) {
  if (compact) {
    return (
      <div className={cn(
        'bg-green-50 border-2 border-black rounded-lg p-3',
        className
      )}>
        <div className="font-bold text-sm mb-1">{example.title}</div>
        <div className="text-sm text-gray-600 line-clamp-2">{example.problem}</div>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-white border-2 border-black rounded-xl p-6 shadow-sm',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-xl">{example.title}</h3>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
          EXAMPLE
        </span>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
        <div className="font-bold text-sm text-blue-700 mb-1">Problem:</div>
        <p className="text-blue-900">{example.problem}</p>
      </div>

      <div className="space-y-3 mb-4">
        <h4 className="font-bold text-sm text-gray-500">SOLUTION STEPS</h4>
        {example.steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
          <Check size={18} />
        </div>
        <div>
          <div className="font-bold text-sm text-green-700 mb-0.5">Answer:</div>
          <p className="font-mono font-bold text-green-900">{example.answer}</p>
        </div>
      </div>
    </div>
  );
}
