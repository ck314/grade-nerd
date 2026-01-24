import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export function FeedbackButton() {
  return (
    <Link
      to="/survey"
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
    >
      <MessageSquare className="w-4 h-4" />
      <span className="hidden sm:inline">Give Feedback</span>
    </Link>
  );
}
