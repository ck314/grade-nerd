import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { FileText, Home, ChevronLeft } from 'lucide-react';
import { FormulaSheetSidebar } from './FormulaSheetSidebar';
import { useGameProgress } from '../../../hooks/useGameProgress';

interface GameNavProps {
  title?: string;
  showBack?: boolean;
  backTo?: string;
  className?: string;
}

export function GameNav({ title, showBack = false, backTo = '/game', className }: GameNavProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { getOverallProgress } = useGameProgress();
  const progress = getOverallProgress();

  return (
    <>
      <nav className={cn(
        'fixed top-0 w-full z-40 bg-white/95 backdrop-blur-sm border-b-2 border-black px-4 py-3',
        className
      )}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {showBack ? (
              <Link
                to={backTo}
                className="flex items-center gap-2 font-bold hover:text-[#0066FF] transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </Link>
            ) : (
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white">
                  <span className="font-bold text-sm">gn</span>
                </div>
              </Link>
            )}

            {title && (
              <>
                <span className="text-gray-300">|</span>
                <span className="font-bold text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                  {title}
                </span>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Progress badge */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="font-bold text-[#0066FF]">{progress.formulasUnlocked}</span>
              <span className="text-gray-500">/ {progress.totalTopics} formulas</span>
            </div>

            {/* Formula Sheet button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-black',
                'bg-yellow-50 hover:bg-yellow-100 transition-colors font-bold text-sm'
              )}
            >
              <FileText size={18} />
              <span className="hidden sm:inline">Formula Sheet</span>
            </button>

            {/* Home button */}
            <Link
              to="/game"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Game Dashboard"
            >
              <Home size={20} />
            </Link>
          </div>
        </div>
      </nav>

      <FormulaSheetSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
