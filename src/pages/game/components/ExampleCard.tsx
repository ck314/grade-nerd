import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { WorkedExample } from '../../../data/game/gameTypes';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface ExampleCardProps {
  example: WorkedExample;
  compact?: boolean;
  expandable?: boolean;
  className?: string;
}

export function ExampleCard({ example, compact = false, expandable = false, className }: ExampleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (compact && expandable) {
    return (
      <div className={cn(
        'bg-green-50 border-2 border-black rounded-lg overflow-hidden',
        className
      )}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 flex items-center justify-between hover:bg-green-100 transition-colors text-left"
        >
          <div>
            <div className="font-bold text-sm mb-1">{example.title}</div>
            {!isExpanded && (
              <div className="text-sm text-gray-600 line-clamp-1">{example.problem}</div>
            )}
          </div>
          <div className="flex-shrink-0 ml-2 text-green-600">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-3 border-t border-green-200">
                {/* Problem */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 my-3">
                  <div className="font-bold text-xs text-blue-700 mb-1">Problem:</div>
                  <p className="text-sm text-blue-900">{example.problem}</p>
                </div>

                {/* Steps */}
                <div className="space-y-2 mb-3">
                  <h4 className="font-bold text-xs text-gray-500">SOLUTION STEPS</h4>
                  {example.steps.map((step, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Answer */}
                <div className="bg-green-100 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                    <Check size={14} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-green-700">Answer:</div>
                    <p className="font-mono font-bold text-sm text-green-900">{example.answer}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

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
