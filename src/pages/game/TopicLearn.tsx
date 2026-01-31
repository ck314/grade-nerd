import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useGameProgress } from '../../hooks/useGameProgress';
import { getTopicById } from '../../data/game/gameTopics';
import { getUnitByTopicId } from '../../data/game/gameUnits';
import { getFormulasByTopicId } from '../../data/game/formulas';
import { getExamplesByTopicId } from '../../data/game/examples';
import { GameNav, FormulaCard, ExampleCard, UnlockAnimation } from './components';
import { Button } from '../../components/ui/Button';
import { ArrowRight, BookOpen, CheckCircle, Lightbulb } from 'lucide-react';

export function TopicLearn() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { getTopicProgress, startTopic, isTopicAccessible } = useGameProgress();

  const [showUnlock, setShowUnlock] = useState(false);
  const [hasSeenUnlock, setHasSeenUnlock] = useState(false);

  const topic = topicId ? getTopicById(topicId) : undefined;
  const unit = topicId ? getUnitByTopicId(topicId) : undefined;
  const formulas = topicId ? getFormulasByTopicId(topicId) : [];
  const examples = topicId ? getExamplesByTopicId(topicId) : [];
  const progress = topicId ? getTopicProgress(topicId) : undefined;

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

    // Start the topic (unlocks formula)
    const wasFormulaUnlocked = progress?.formulaUnlocked;
    startTopic(topicId);

    // Show unlock animation if formula was just unlocked
    if (!wasFormulaUnlocked && !hasSeenUnlock) {
      setShowUnlock(true);
    }
  }, [topicId, topic, progress?.formulaUnlocked, hasSeenUnlock]);

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
        title={`Topic ${topic.number}: ${topic.shortName}`}
        showBack
        backTo="/game"
      />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Topic Header */}
          <motion.div {...fadeIn} className="mb-6">
            <div className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-3',
              unit.bgColor, unit.color
            )}>
              Unit {unit.number}: {unit.shortName}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {topic.name}
            </h1>
            <p className="text-gray-600">{topic.description}</p>
          </motion.div>

          {/* Formula Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-[#0066FF]" size={20} />
              <h2 className="font-bold text-lg">Your New Formula{formulas.length > 1 ? 's' : ''}</h2>
            </div>

            <div className="space-y-4">
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
            </div>
          </motion.section>

          {/* Worked Example Section - Only show if unlocked */}
          {progress?.exampleUnlocked && examples.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="text-green-500" size={20} />
                <h2 className="font-bold text-lg">Worked Example</h2>
                <span className="ml-auto flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle size={16} />
                  Unlocked
                </span>
              </div>

              <div className="space-y-4">
                {examples.map((example, index) => (
                  <motion.div
                    key={example.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <ExampleCard example={example} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Learning Content Placeholder */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: progress?.exampleUnlocked ? 0.4 : 0.3 }}
            className="mb-8"
          >
            <div className="bg-white border-2 border-black rounded-xl p-6">
              <h2 className="font-bold text-lg mb-4">Key Concepts</h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  This topic covers <strong>{topic.name.toLowerCase()}</strong>.
                  Study the formula{formulas.length > 1 ? 's' : ''} above and make sure
                  you understand when and how to apply {formulas.length > 1 ? 'them' : 'it'}.
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h3 className="font-bold text-sm text-blue-700 mb-2">Curriculum Coverage</h3>
                  <p className="text-sm text-blue-600">{topic.lessonsCovered}</p>
                </div>

                <p>
                  When you feel ready, take the quiz to test your understanding and
                  unlock a worked example for your formula sheet!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Quiz CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: progress?.exampleUnlocked ? 0.5 : 0.4 }}
            className="text-center"
          >
            {progress?.status === 'completed' ? (
              <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl p-6 text-white">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle size={24} />
                  <h3 className="font-bold text-xl">Topic Complete!</h3>
                </div>
                <p className="text-green-100 mb-4">
                  You've mastered this topic. Take the quiz again for more practice.
                </p>
                <Link to={`/game/topic/${topicId}/quiz`}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-green-600 border-white hover:bg-green-50"
                  >
                    Practice Again <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-[#0066FF] to-blue-400 rounded-xl p-6 text-white">
                <h3 className="font-bold text-xl mb-2">Ready to Test Your Knowledge?</h3>
                <p className="text-blue-100 mb-4">
                  Get 100% to unlock the worked example!
                </p>
                <Link to={`/game/topic/${topicId}/quiz`}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-[#0066FF] border-white hover:bg-blue-50"
                  >
                    Start Quiz <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Unlock Animation */}
      <AnimatePresence>
        {showUnlock && formulas.length > 0 && (
          <UnlockAnimation
            type="formula"
            title={formulas[0].name}
            subtitle="Added to your formula sheet"
            onComplete={() => {
              setShowUnlock(false);
              setHasSeenUnlock(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
