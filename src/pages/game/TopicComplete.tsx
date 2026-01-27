import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameProgress } from '../../hooks/useGameProgress';
import { getTopicById, getNextTopic } from '../../data/game/gameTopics';
import { getUnitByTopicId } from '../../data/game/gameUnits';
import { getFormulasByTopicId } from '../../data/game/formulas';
import { getExamplesByTopicId } from '../../data/game/examples';
import { GameNav, FormulaCard, ExampleCard, UnlockAnimation } from './components';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Trophy, FileText, Home } from 'lucide-react';

export function TopicComplete() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { getTopicProgress, isTopicAccessible } = useGameProgress();

  const [showUnlock, setShowUnlock] = useState(true);

  const topic = topicId ? getTopicById(topicId) : undefined;
  const unit = topicId ? getUnitByTopicId(topicId) : undefined;
  const formulas = topicId ? getFormulasByTopicId(topicId) : [];
  const examples = topicId ? getExamplesByTopicId(topicId) : [];
  const progress = topicId ? getTopicProgress(topicId) : undefined;
  const nextTopic = topicId ? getNextTopic(topicId) : undefined;

  // Redirect if topic not found, locked, or not completed
  useEffect(() => {
    if (!topicId || !topic) {
      navigate('/game');
      return;
    }

    if (!isTopicAccessible(topicId) || progress?.status !== 'completed') {
      navigate(`/game/topic/${topicId}`);
      return;
    }
  }, [topicId, topic, progress?.status]);

  if (!topic || !unit) {
    return null;
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-graph-paper">
      <GameNav
        title={`Topic ${topic.number} Complete!`}
        showBack
        backTo="/game"
      />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Celebration Header */}
          <motion.div {...fadeIn} className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 text-white mb-4">
              <Trophy size={40} />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Topic Complete!
            </h1>
            <p className="text-gray-600">
              You've mastered <strong>{topic.name}</strong> and unlocked the worked example.
            </p>
          </motion.div>

          {/* What You've Earned */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FileText className="text-[#0066FF]" size={20} />
              Added to Your Formula Sheet
            </h2>

            <div className="space-y-4">
              {/* Formulas */}
              {formulas.map((formula, index) => (
                <motion.div
                  key={formula.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <FormulaCard formula={formula} />
                </motion.div>
              ))}

              {/* Examples */}
              {examples.map((example, index) => (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + formulas.length * 0.1 + index * 0.1 }}
                >
                  <ExampleCard example={example} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Score Summary */}
          {progress?.quizScore !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-purple-600 mb-1">Quiz Score</div>
                  <div className="text-2xl font-bold text-purple-700">
                    {progress.quizScore} points
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-purple-600">
                    Attempts: {progress.quizAttempts}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {nextTopic ? (
              <div className="bg-gradient-to-r from-[#0066FF] to-blue-400 rounded-xl p-6 text-white text-center">
                <h3 className="font-bold text-xl mb-2">Ready for More?</h3>
                <p className="text-blue-100 mb-4">
                  Topic {nextTopic.number}: {nextTopic.name} is now available!
                </p>
                <Link to={`/game/topic/${nextTopic.id}`}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-[#0066FF] border-white hover:bg-blue-50"
                  >
                    Start Next Topic <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl p-6 text-white text-center">
                <h3 className="font-bold text-xl mb-2">Congratulations!</h3>
                <p className="text-green-100 mb-4">
                  You've completed all topics! Your formula sheet is complete.
                </p>
                <Link to="/game/formula-sheet">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-green-600 border-white hover:bg-green-50"
                  >
                    View Full Formula Sheet <FileText className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <Link to="/game">
                <Button variant="outline">
                  <Home className="mr-2" size={18} />
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/game/formula-sheet">
                <Button variant="ghost">
                  <FileText className="mr-2" size={18} />
                  View Formula Sheet
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Unlock Animation */}
      <AnimatePresence>
        {showUnlock && examples.length > 0 && (
          <UnlockAnimation
            type="example"
            title={examples[0].title}
            subtitle="Your worked example is ready"
            onComplete={() => setShowUnlock(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
