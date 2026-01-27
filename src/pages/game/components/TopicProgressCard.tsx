import React from 'react';
import { cn } from '../../../lib/utils';
import { GameTopic, TopicProgress } from '../../../data/game/gameTypes';
import { Lock, Play, Check, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopicProgressCardProps {
  topic: GameTopic;
  progress: TopicProgress | undefined;
}

export function TopicProgressCard({ topic, progress }: TopicProgressCardProps) {
  const status = progress?.status ?? 'locked';
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isAvailable = status === 'available';
  const isInProgress = status === 'learning' || status === 'quiz';

  const getIcon = () => {
    if (isLocked) return <Lock size={18} />;
    if (isCompleted) return <Check size={18} />;
    if (isInProgress) return <BookOpen size={18} />;
    return <Play size={18} />;
  };

  const getStatusText = () => {
    if (isLocked) return 'Locked';
    if (isCompleted) return 'Completed';
    if (status === 'quiz') return 'Quiz Ready';
    if (status === 'learning') return 'In Progress';
    return 'Start';
  };

  const content = (
    <div className={cn(
      'border-2 rounded-xl p-4 transition-all',
      isLocked && 'border-gray-200 bg-gray-50 opacity-60',
      isCompleted && 'border-green-500 bg-green-50',
      isAvailable && 'border-[#0066FF] bg-white hover:shadow-educational cursor-pointer',
      isInProgress && 'border-yellow-500 bg-yellow-50 hover:shadow-educational cursor-pointer',
    )}>
      <div className="flex items-start gap-3">
        {/* Topic Number */}
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0',
          isLocked && 'bg-gray-200 text-gray-400',
          isCompleted && 'bg-green-500 text-white',
          isAvailable && 'bg-[#0066FF] text-white',
          isInProgress && 'bg-yellow-500 text-white',
        )}>
          {topic.number}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-bold text-sm mb-1 truncate',
            isLocked && 'text-gray-400'
          )}>
            {topic.name}
          </h3>
          <p className={cn(
            'text-xs line-clamp-2',
            isLocked ? 'text-gray-400' : 'text-gray-600'
          )}>
            {topic.description}
          </p>
        </div>

        {/* Status Icon */}
        <div className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
          isLocked && 'bg-gray-200 text-gray-400',
          isCompleted && 'bg-green-500 text-white',
          isAvailable && 'bg-[#0066FF] text-white animate-pulse',
          isInProgress && 'bg-yellow-500 text-white',
        )}>
          {getIcon()}
        </div>
      </div>

      {/* Progress indicators */}
      {(progress?.formulaUnlocked || progress?.exampleUnlocked) && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          {progress.formulaUnlocked && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">
              Formula
            </span>
          )}
          {progress.exampleUnlocked && (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
              Example
            </span>
          )}
          {progress.quizScore !== undefined && (
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold ml-auto">
              {progress.quizScore}pts
            </span>
          )}
        </div>
      )}

      {/* Hover state for available */}
      {(isAvailable || isInProgress) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className={cn(
            'text-xs font-bold',
            isAvailable && 'text-[#0066FF]',
            isInProgress && 'text-yellow-600',
          )}>
            {getStatusText()} →
          </span>
        </div>
      )}
    </div>
  );

  if (isLocked) {
    return content;
  }

  return (
    <Link to={`/game/topic/${topic.id}`}>
      {content}
    </Link>
  );
}
