import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { studyParts, studyQuestions, getQuestionsByPart, StudyQuestion, StudyPart } from '../data/studyQuestions';
import { ChevronLeft, ChevronDown, ChevronRight, BookOpen, Lightbulb, Calculator, Info } from 'lucide-react';

export function Study() {
  const [expandedPart, setExpandedPart] = useState<string | null>('part1');
  const [selectedQuestion, setSelectedQuestion] = useState<StudyQuestion | null>(studyQuestions[0]);

  const handlePartClick = (partId: string) => {
    setExpandedPart(expandedPart === partId ? null : partId);
  };

  const handleQuestionClick = (question: StudyQuestion) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="min-h-screen bg-graph-paper">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-sm border-b-2 border-black px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold hover:text-[#0066FF] transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-[#0066FF]" />
            <span className="font-bold">Exam Review Guide</span>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">MPM 2D Exam Review</h1>
            <p className="text-gray-600 text-lg">
              Concept explanations for each question - understand the "why" behind the math.
            </p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <Info size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                This guide explains the concepts and methods needed to solve each question,
                without giving away the actual solutions. Use it to understand the approach,
                then try solving the questions yourself!
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Accordion Navigation */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white border-2 border-black rounded-xl overflow-hidden sticky top-24">
                <div className="p-4 bg-gray-50 border-b-2 border-gray-200">
                  <h2 className="font-bold text-lg">Questions</h2>
                  <p className="text-sm text-gray-500">{studyQuestions.length} questions across 4 parts</p>
                </div>

                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  {studyParts.map((part) => {
                    const partQuestions = getQuestionsByPart(part.id);
                    const isExpanded = expandedPart === part.id;

                    return (
                      <div key={part.id} className="border-b border-gray-200 last:border-b-0">
                        {/* Part Header */}
                        <button
                          onClick={() => handlePartClick(part.id)}
                          className={cn(
                            'w-full p-4 flex items-center justify-between text-left transition-colors',
                            isExpanded ? part.bgColor : 'hover:bg-gray-50'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white',
                              part.id === 'part1' && 'bg-blue-500',
                              part.id === 'part2' && 'bg-green-500',
                              part.id === 'part3' && 'bg-purple-500',
                              part.id === 'part4' && 'bg-orange-500',
                            )}>
                              {part.number}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{part.title}</div>
                              <div className="text-xs text-gray-500">{partQuestions.length} questions</div>
                            </div>
                          </div>
                          <ChevronDown
                            size={20}
                            className={cn(
                              'transition-transform',
                              isExpanded && 'rotate-180'
                            )}
                          />
                        </button>

                        {/* Questions List */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-2 pb-2">
                                {partQuestions.map((question) => (
                                  <button
                                    key={question.id}
                                    onClick={() => handleQuestionClick(question)}
                                    className={cn(
                                      'w-full p-3 text-left rounded-lg transition-colors text-sm',
                                      selectedQuestion?.id === question.id
                                        ? 'bg-[#0066FF] text-white'
                                        : 'hover:bg-gray-100'
                                    )}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className={cn(
                                        'font-bold',
                                        selectedQuestion?.id === question.id ? 'text-white' : part.color
                                      )}>
                                        Q{question.number}
                                      </span>
                                      <span className="truncate">{question.title}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content - Question Detail */}
            <div className="flex-1 min-w-0">
              {selectedQuestion ? (
                <QuestionDetail question={selectedQuestion} />
              ) : (
                <div className="bg-white border-2 border-black rounded-xl p-8 text-center">
                  <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                  <h2 className="text-xl font-bold text-gray-500 mb-2">Select a Question</h2>
                  <p className="text-gray-400">Choose a question from the sidebar to view its concept explanation.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuestionDetail({ question }: { question: StudyQuestion }) {
  const part = studyParts.find(p => p.id === question.partId);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Question Header */}
      <div className="bg-white border-2 border-black rounded-xl overflow-hidden">
        <div className={cn('p-4', part?.bgColor)}>
          <div className="flex items-center gap-3 mb-2">
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-bold text-white',
              part?.id === 'part1' && 'bg-blue-500',
              part?.id === 'part2' && 'bg-green-500',
              part?.id === 'part3' && 'bg-purple-500',
              part?.id === 'part4' && 'bg-orange-500',
            )}>
              Part {part?.number} - Q{question.number}
            </span>
            <span className="text-sm text-gray-600">{part?.title}</span>
          </div>
          <h2 className="text-2xl font-bold">{question.title}</h2>
        </div>

        {/* Original Question */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-sm text-gray-500 mb-2 flex items-center gap-2">
            <Calculator size={16} />
            THE QUESTION
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 text-lg">
            {question.questionText}
          </div>
        </div>

        {/* Concept Explanation */}
        <div className="p-6">
          <h3 className="font-bold text-sm text-[#0066FF] mb-4 flex items-center gap-2">
            <Lightbulb size={16} />
            CONCEPT EXPLANATION
          </h3>
          <div className="space-y-3">
            {question.conceptExplanation.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Key Formulas */}
      {question.keyFormulas && question.keyFormulas.length > 0 && (
        <div className="bg-white border-2 border-black rounded-xl p-6">
          <h3 className="font-bold text-sm text-purple-600 mb-4 flex items-center gap-2">
            <span className="text-lg">∑</span>
            KEY FORMULAS
          </h3>
          <div className="grid gap-2">
            {question.keyFormulas.map((formula, i) => (
              <div
                key={i}
                className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 font-mono text-sm"
              >
                {formula}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      {question.tips && question.tips.length > 0 && (
        <div className="bg-white border-2 border-black rounded-xl p-6">
          <h3 className="font-bold text-sm text-green-600 mb-4 flex items-center gap-2">
            <span className="text-lg">💡</span>
            TIPS & HINTS
          </h3>
          <ul className="space-y-2">
            {question.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <QuestionNavigation currentQuestion={question} />
    </motion.div>
  );
}

function QuestionNavigation({ currentQuestion }: { currentQuestion: StudyQuestion }) {
  const currentIndex = studyQuestions.findIndex(q => q.id === currentQuestion.id);
  const prevQuestion = currentIndex > 0 ? studyQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < studyQuestions.length - 1 ? studyQuestions[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between">
      {prevQuestion ? (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0066FF] transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">Previous: Q{prevQuestion.number} {prevQuestion.title}</span>
        </button>
      ) : (
        <div />
      )}

      {nextQuestion ? (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0066FF] transition-colors"
        >
          <span className="text-sm">Next: Q{nextQuestion.number} {nextQuestion.title}</span>
          <ChevronRight size={20} />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
