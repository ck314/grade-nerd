import React from 'react';
import { cn } from '../../../lib/utils';
import { Formula } from '../../../data/game/gameTypes';

interface FormulaCardProps {
  formula: Formula;
  compact?: boolean;
  className?: string;
}

export function FormulaCard({ formula, compact = false, className }: FormulaCardProps) {
  if (compact) {
    return (
      <div className={cn(
        'bg-white border-2 border-black rounded-lg p-3',
        className
      )}>
        <div className="font-bold text-sm mb-1">{formula.name}</div>
        <div className="font-mono text-lg text-[#0066FF]">{formula.formula}</div>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-white border-2 border-black rounded-xl p-6 shadow-sm',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-xl">{formula.name}</h3>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
          FORMULA
        </span>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div className="text-center">
          <span className="font-mono text-2xl md:text-3xl font-bold text-[#0066FF]">
            {formula.formula}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{formula.description}</p>

      {formula.variables && formula.variables.length > 0 && (
        <div className="border-t border-gray-100 pt-4">
          <h4 className="font-bold text-sm mb-2 text-gray-500">VARIABLES</h4>
          <div className="space-y-2">
            {formula.variables.map((v, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="font-mono font-bold text-[#0066FF] min-w-[40px]">
                  {v.symbol}
                </span>
                <span className="text-gray-600">= {v.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
