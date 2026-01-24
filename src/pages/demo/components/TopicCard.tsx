import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { Topic } from '../../../data/types';

interface TopicCardProps {
  topic: Topic;
  viewedCount: number;
}

export function TopicCard({ topic, viewedCount }: TopicCardProps) {
  const isComplete = viewedCount >= 3;
  const hasProgress = viewedCount > 0;

  return (
    <Link to={`/demo/topic/${topic.id}`}>
      <div
        className={`group relative bg-white border-2 rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1 ${
          isComplete
            ? 'border-green-500 bg-green-50/30'
            : hasProgress
            ? 'border-blue-300'
            : 'border-black'
        }`}
      >
        {/* Topic Number */}
        <div
          className={`absolute -top-3 -left-3 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm ${
            isComplete
              ? 'bg-green-500 text-white'
              : 'bg-black text-white'
          }`}
        >
          {isComplete ? <CheckCircle className="w-5 h-5" /> : topic.number}
        </div>

        {/* Progress indicator */}
        {hasProgress && !isComplete && (
          <div className="absolute -top-3 right-3 flex gap-0.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i <= viewedCount ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        <div className="pt-2">
          <h3 className="font-bold text-lg mb-1 group-hover:text-[#0066FF] transition-colors">
            {topic.shortName}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {topic.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {viewedCount}/3 interests viewed
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0066FF] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}
