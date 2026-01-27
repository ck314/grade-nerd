import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useGameProgress } from '../../hooks/useGameProgress';
import { getTopicById } from '../../data/game/gameTopics';
import { getUnitByTopicId } from '../../data/game/gameUnits';
import { getQuestionsByTopicId } from '../../data/game/questions';
import { GameNav, QuestionCard } from './components';
import { Button } from '../../components/ui/Button';
import { ArrowRight, RotateCcw } from 'lucide-react';

export function TopicQuiz() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { startQuiz, completeQuiz, isTopicAccessible } = useGameProgress();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [passed, setPassed] = useState(false);

  const topic = topicId ? getTopicById(topicId) : undefined;
  const unit = topicId ? getUnitByTopicId(topicId) : undefined;
  const questions = topicId ? getQuestionsByTopicId(topicId) : [];

  // Redirect if topic not found or locked
  useEffect(() => {
    if (!topicId || !topic) {
      navigate('/game');
      return;
    }

    if (!isTopicAccessible(topicId)) {
      navigate('/game');
      return;
    }

    // Mark as in quiz state
    startQuiz(topicId);
  }, [topicId, topic]);

  if (!topic || !unit || questions.length === 0) {
    return null;
  }

  const handleAnswer = (answer: string | number, isCorrect: boolean) => {
    const newAnswers = [
      ...answers,
      { questionId: questions[currentQuestion].id, correct: isCorrect },
    ];
    setAnswers(newAnswers);

    // Auto-advance after a delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz complete
        const score = newAnswers.filter((a) => a.correct).length;
        const didPass = completeQuiz(topicId!, score, questions.length);
        setPassed(didPass);
        setQuizComplete(true);
      }
    }, 1500);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizComplete(false);
    setPassed(false);
    startQuiz(topicId!);
  };

  const score = answers.filter((a) => a.correct).length;
  const percentage = Math.round((score / questions.length) * 100);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-graph-paper">
      <GameNav
        title={`Quiz: ${topic.shortName}`}
        showBack
        backTo={`/game/topic/${topicId}`}
      />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div {...fadeIn} className="mb-6">
            <div className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-3',
              unit.bgColor, unit.color
            )}>
              Topic {topic.number}
            </div>

            <h1 className="text-2xl font-bold mb-2">{topic.name} Quiz</h1>

            {!quizComplete && (
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0066FF] transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
            )}
          </motion.div>

          {/* Quiz Content */}
          {!quizComplete ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={questions[currentQuestion]}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
              />
            </motion.div>
          ) : (
            <motion.div {...fadeIn}>
              {/* Results */}
              <div className={cn(
                'border-2 rounded-xl p-8 text-center',
                passed
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              )}>
                <div className={cn(
                  'w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold',
                  passed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                )}>
                  {percentage}%
                </div>

                <h2 className={cn(
                  'text-2xl font-bold mb-2',
                  passed ? 'text-green-700' : 'text-red-700'
                )}>
                  {passed ? 'Great Job!' : 'Not Quite...'}
                </h2>

                <p className={cn(
                  'mb-6',
                  passed ? 'text-green-600' : 'text-red-600'
                )}>
                  You got {score} out of {questions.length} questions correct.
                  {passed
                    ? ' You\'ve unlocked the worked example!'
                    : ' You need 100% to pass. Try again!'}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  {passed ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/game/topic/${topicId}`)}
                      >
                        Back to Topic
                      </Button>
                      <Button onClick={() => navigate(`/game/topic/${topicId}/complete`)}>
                        View Example <ArrowRight className="ml-2" size={18} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/game/topic/${topicId}`)}
                      >
                        Review Material
                      </Button>
                      <Button onClick={handleRetry}>
                        <RotateCcw className="mr-2" size={18} />
                        Try Again
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Question Review */}
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Question Review</h3>
                <div className="space-y-3">
                  {questions.map((q, i) => {
                    const answer = answers[i];
                    return (
                      <div
                        key={q.id}
                        className={cn(
                          'p-4 rounded-lg border-2',
                          answer?.correct
                            ? 'border-green-200 bg-green-50'
                            : 'border-red-200 bg-red-50'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                            answer?.correct
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          )}>
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm mb-1">{q.question}</p>
                            <p className={cn(
                              'text-xs',
                              answer?.correct ? 'text-green-600' : 'text-red-600'
                            )}>
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
