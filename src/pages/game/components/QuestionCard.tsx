import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { QuizQuestion } from '../../../data/game/gameTypes';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string | number, isCorrect: boolean) => void;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showResult = true,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (value: string | number) => {
    if (hasAnswered) return;

    setSelectedAnswer(value);
    setHasAnswered(true);
    const isCorrect = value === question.correctAnswer;
    onAnswer(value, isCorrect);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white border-2 border-black rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className={cn(
          'px-2 py-1 rounded text-xs font-bold',
          question.difficulty === 'easy' && 'bg-green-100 text-green-700',
          question.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700',
          question.difficulty === 'hard' && 'bg-red-100 text-red-700'
        )}>
          {question.difficulty.toUpperCase()}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-6">{question.question}</h3>

      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === option.value;
          const isCorrectOption = option.value === question.correctAnswer;
          const showCorrectHighlight = hasAnswered && showResult && isCorrectOption;
          const showWrongHighlight = hasAnswered && showResult && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleSelect(option.value)}
              disabled={hasAnswered}
              className={cn(
                'w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3',
                !hasAnswered && 'hover:border-[#0066FF] hover:bg-blue-50 cursor-pointer',
                hasAnswered && 'cursor-default',
                !hasAnswered && !isSelected && 'border-gray-200 bg-white',
                showCorrectHighlight && 'border-green-500 bg-green-50',
                showWrongHighlight && 'border-red-500 bg-red-50',
                isSelected && !hasAnswered && 'border-[#0066FF] bg-blue-50'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0',
                !hasAnswered && 'border-gray-300 text-gray-500',
                showCorrectHighlight && 'border-green-500 bg-green-500 text-white',
                showWrongHighlight && 'border-red-500 bg-red-500 text-white',
                isSelected && !hasAnswered && 'border-[#0066FF] text-[#0066FF]'
              )}>
                {showCorrectHighlight ? (
                  <Check size={16} />
                ) : showWrongHighlight ? (
                  <X size={16} />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </div>
              <span className={cn(
                'font-medium',
                showCorrectHighlight && 'text-green-700',
                showWrongHighlight && 'text-red-700'
              )}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {hasAnswered && showResult && (
        <div className={cn(
          'mt-6 p-4 rounded-lg',
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        )}>
          <div className={cn(
            'font-bold text-sm mb-1',
            isCorrect ? 'text-green-700' : 'text-red-700'
          )}>
            {isCorrect ? 'Correct!' : 'Not quite...'}
          </div>
          <p className={cn(
            'text-sm',
            isCorrect ? 'text-green-600' : 'text-red-600'
          )}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
