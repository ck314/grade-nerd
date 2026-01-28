import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useGameProgress } from '../../hooks/useGameProgress';
import { gameUnits } from '../../data/game/gameUnits';
import { getTopicsByUnitId } from '../../data/game/gameTopics';
import { GameNav, TopicProgressCard, PointsDisplay, AvatarStore } from './components';
import { CustomizableAvatar } from '../../components/avatar';
import { Button } from '../../components/ui/Button';
import { RotateCcw, Trophy, FileText, Sparkles, ArrowUpCircle } from 'lucide-react';

export function Game() {
  const { getOverallProgress, getUnitProgress, getTopicProgress, resetProgress, progress, getAvailablePoints, canLevelUp, levelUp, getLevel } = useGameProgress();
  const overall = getOverallProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [showLevelUpConfirm, setShowLevelUpConfirm] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-graph-paper">
      <GameNav title="Formula Forge" />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div {...fadeIn} className="mb-8">
            <div className="bg-white border-2 border-black rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Avatar section */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <CustomizableAvatar
                      equippedItems={progress.avatar.equippedItems}
                      size="lg"
                      onClick={() => setStoreOpen(true)}
                      showClickHint
                      level={getLevel()}
                    />
                    <span className="text-xs text-gray-500 mt-1">Click to customize</span>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                      Formula Forge
                    </h1>
                    <p className="text-gray-600">
                      Build your exam formula sheet, one topic at a time.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PointsDisplay points={getAvailablePoints()} size="md" showLabel />
                  {canLevelUp() && (
                    <Button
                      onClick={() => setShowLevelUpConfirm(true)}
                      className="bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white border-0"
                      size="sm"
                    >
                      <ArrowUpCircle size={18} className="mr-2" />
                      Level Up!
                    </Button>
                  )}
                  <Link to="/game/formula-sheet">
                    <Button variant="secondary" size="sm">
                      <FileText size={18} className="mr-2" />
                      View Full Sheet
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-bold">
                    {overall.percentComplete}% Complete
                  </span>
                  <span className="text-gray-500">
                    {overall.topicsCompleted} / {overall.totalTopics} topics
                  </span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overall.percentComplete}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#0066FF] to-blue-400"
                  />
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    <span><strong>{overall.formulasUnlocked}</strong> formulas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-green-600" />
                    <span><strong>{overall.examplesUnlocked}</strong> examples</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Units */}
          <div className="space-y-8">
            {gameUnits.map((unit, unitIndex) => {
              const topics = getTopicsByUnitId(unit.id);
              const unitProgress = getUnitProgress(unit.id);

              return (
                <motion.section
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: unitIndex * 0.1 }}
                >
                  {/* Unit Header */}
                  <div className={cn(
                    'border-2 border-black rounded-xl p-4 mb-4',
                    unit.bgColor
                  )}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-lg bg-white border-2 border-black flex items-center justify-center font-bold text-lg',
                          unit.color
                        )}>
                          {unit.number}
                        </div>
                        <div>
                          <h2 className="font-bold text-lg">{unit.name}</h2>
                          <p className="text-sm text-gray-600">{unit.description}</p>
                        </div>
                      </div>

                      {/* Unit progress */}
                      <div className="text-right">
                        <div className={cn('font-bold text-lg', unit.color)}>
                          {unitProgress.percentComplete}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {unitProgress.completed}/{unitProgress.total} topics
                        </div>
                      </div>
                    </div>

                    {/* Unit progress bar */}
                    <div className="mt-3 h-2 bg-white/50 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full transition-all duration-500', unit.color.replace('text-', 'bg-'))}
                        style={{ width: `${unitProgress.percentComplete}%` }}
                      />
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topics.map((topic) => (
                      <TopicProgressCard
                        key={topic.id}
                        topic={topic}
                        progress={getTopicProgress(topic.id)}
                      />
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>

          {/* Reset Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gray-200 text-center"
          >
            {showResetConfirm ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 inline-block">
                <p className="text-red-700 font-medium mb-3">
                  Are you sure? This will reset all your progress.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowResetConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <button
                    onClick={() => {
                      resetProgress();
                      setShowResetConfirm(false);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold text-sm hover:bg-red-600"
                  >
                    Reset Progress
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={14} />
                Reset Progress
              </button>
            )}
          </motion.div>
        </div>
      </main>

      {/* Avatar Store Modal */}
      <AvatarStore isOpen={storeOpen} onClose={() => setStoreOpen(false)} />

      {/* Level Up Confirmation Modal */}
      {showLevelUpConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full border-2 border-black shadow-xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUpCircle size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Level Up to Level {getLevel() + 1}?</h2>
              <p className="text-gray-600 mb-4">
                Congratulations! You've earned enough points to buy all avatar items.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-bold text-amber-800 mb-2">What happens:</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>+ Your avatar gets a cool Level {getLevel() + 1} border</li>
                  <li>+ All topics reset for another run</li>
                  <li>+ Your Formula Sheet stays unlocked</li>
                  <li>- Avatar items & points reset to zero</li>
                  <li>- Each topic can only give points once per run</li>
                </ul>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowLevelUpConfirm(false)}
                >
                  Not Yet
                </Button>
                <Button
                  onClick={() => {
                    levelUp();
                    setShowLevelUpConfirm(false);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white border-0"
                >
                  <ArrowUpCircle size={18} className="mr-2" />
                  Level Up!
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
