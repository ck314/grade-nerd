import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

interface SimplifyToggleProps {
  isSimplified: boolean;
  onToggle: () => void;
}

export function SimplifyToggle({ isSimplified, onToggle }: SimplifyToggleProps) {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className={`group flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all w-full sm:w-auto ${
          isSimplified
            ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-purple-300 text-purple-700'
            : 'bg-white border-gray-300 hover:border-purple-300'
        }`}
      >
        <div
          className={`w-10 h-6 rounded-full relative transition-colors ${
            isSimplified ? 'bg-purple-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              isSimplified ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </div>
        <div className="flex items-center gap-2">
          {isSimplified ? (
            <>
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="font-medium">Simplified Mode Active</span>
            </>
          ) : (
            <>
              <BookOpen className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-600">Explain it to me like I'm 5</span>
            </>
          )}
        </div>
      </button>
      {isSimplified && (
        <p className="mt-2 text-sm text-purple-600 ml-1">
          Showing the "Explain Like I'm 5" version for easier understanding.
        </p>
      )}
    </div>
  );
}
