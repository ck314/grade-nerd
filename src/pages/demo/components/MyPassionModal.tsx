import React, { useState } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface MyPassionModalProps {
  onClose: () => void;
  onSubmit: (passion: string) => void;
  currentPassion?: string;
}

export function MyPassionModal({ onClose, onSubmit, currentPassion }: MyPassionModalProps) {
  const [passion, setPassion] = useState(currentPassion || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passion.trim()) {
      onSubmit(passion.trim());
    }
  };

  const suggestions = [
    'Gaming',
    'Music',
    'Sports',
    'Art',
    'Cooking',
    'Fashion',
    'Anime',
    'Cars',
    'Space',
    'Animals',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border-2 border-black overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">What's Your #1 Interest?</h2>
              <p className="text-white/80 text-sm">We'll show you how Grade Nerd would work for YOU</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              My passion is...
            </label>
            <input
              type="text"
              value={passion}
              onChange={(e) => setPassion(e.target.value)}
              placeholder="e.g., Basketball, Music Production, Photography..."
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-100 transition-all"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Quick picks:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setPassion(suggestion)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    passion === suggestion
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Today you get one of our 3 available interests. In the full app, you pick your #1 interest.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!passion.trim()}
              className="flex-1"
            >
              Explore Demo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
