import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useProgress } from '../../../hooks/useProgress';

export function ProgressTracker() {
  const { getTotalProgress, clearProgress } = useProgress();
  const { viewed, total } = getTotalProgress();
  const percentage = Math.round((viewed / total) * 100);

  if (viewed === 0) return null;

  return (
    <div className="mb-8 bg-white border-2 border-black rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="font-bold">Your Progress</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {viewed} of {total} topics explored
          </span>
          <button
            onClick={clearProgress}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {percentage === 100 && (
        <p className="text-center text-green-600 font-medium mt-2">
          Congratulations! You've explored all topics!
        </p>
      )}
    </div>
  );
}
