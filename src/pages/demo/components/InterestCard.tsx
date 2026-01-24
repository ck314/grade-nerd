import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Interest } from '../../../data/types';

interface InterestCardProps {
  interest: Interest;
  icon: React.ReactNode;
}

export function InterestCard({ interest, icon }: InterestCardProps) {
  return (
    <Link to={`/demo/interest/${interest.id}`}>
      <div
        className={`group bg-white border-2 border-black rounded-xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${interest.bgColor}`}
      >
        <div className={`w-16 h-16 rounded-xl ${interest.bgColor} border-2 border-black flex items-center justify-center mb-4 ${interest.color}`}>
          {icon}
        </div>
        <h3 className="font-bold text-xl mb-2">{interest.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{interest.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">17 topics</span>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0066FF] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
