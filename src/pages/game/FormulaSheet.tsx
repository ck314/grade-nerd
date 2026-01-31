import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useGameProgress } from '../../hooks/useGameProgress';
import { gameUnits } from '../../data/game/gameUnits';
import { getTopicsByUnitId } from '../../data/game/gameTopics';
import { getFormulasByTopicId } from '../../data/game/formulas';
import { getExamplesByTopicId } from '../../data/game/examples';
import { FormulaCard, ExampleCard } from './components';
import { Button } from '../../components/ui/Button';
import { Printer, Lock, ChevronLeft } from 'lucide-react';

export function FormulaSheet() {
  const { getUnlockedFormulas, getUnlockedExamples, getOverallProgress } = useGameProgress();
  const unlockedFormulaTopics = getUnlockedFormulas();
  const unlockedExampleTopics = getUnlockedExamples();
  const progress = getOverallProgress();

  const handlePrint = () => {
    window.print();
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-white print:bg-white">
      {/* Screen Nav - Hidden when printing */}
      <nav className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-sm border-b-2 border-black px-4 py-3 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/game"
            className="flex items-center gap-2 font-bold hover:text-[#0066FF] transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Game
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {progress.formulasUnlocked} / {progress.totalTopics} formulas
            </span>
            <Button onClick={handlePrint} size="sm">
              <Printer size={18} className="mr-2" />
              Print
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-16 px-4 print:pt-0 print:pb-0 print:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Print Header */}
          <div className="hidden print:block mb-8 text-center border-b-2 border-black pb-4">
            <h1 className="text-3xl font-bold">Grade 10 Math Formula Sheet</h1>
            <p className="text-gray-600">Formula Forge - Grade Nerd</p>
          </div>

          {/* Screen Header */}
          <motion.div {...fadeIn} className="mb-8 print:hidden">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Your Formula Sheet
            </h1>
            <p className="text-gray-600">
              All your unlocked formulas and worked examples in one place.
              Print this to study or bring to your exam!
            </p>
          </motion.div>

          {/* Content by Unit */}
          <div className="space-y-8 print:space-y-6">
            {gameUnits.map((unit, unitIndex) => {
              const topics = getTopicsByUnitId(unit.id);
              const hasUnlockedContent = topics.some(
                (t) => unlockedFormulaTopics.includes(t.id) || unlockedExampleTopics.includes(t.id)
              );

              return (
                <motion.section
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: unitIndex * 0.05 }}
                  className="print:break-inside-avoid"
                >
                  {/* Unit Header */}
                  <div className={cn(
                    'border-2 border-black rounded-lg p-3 mb-4 print:rounded-none print:border-b-2 print:border-t-0 print:border-x-0',
                    unit.bgColor
                  )}>
                    <h2 className={cn('font-bold text-lg', unit.color)}>
                      Unit {unit.number}: {unit.name}
                    </h2>
                  </div>

                  {/* Topics in Unit */}
                  {!hasUnlockedContent ? (
                    <div className="text-center py-8 text-gray-400 print:hidden">
                      <Lock size={24} className="mx-auto mb-2" />
                      <p>Complete topics to unlock formulas</p>
                    </div>
                  ) : (
                    <div className="space-y-6 print:space-y-4">
                      {topics.map((topic) => {
                        const hasFormula = unlockedFormulaTopics.includes(topic.id);
                        const hasExample = unlockedExampleTopics.includes(topic.id);

                        if (!hasFormula && !hasExample) {
                          return (
                            <div
                              key={topic.id}
                              className="border border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400 print:hidden"
                            >
                              <Lock size={16} className="inline mr-2" />
                              Topic {topic.number}: {topic.name} - Locked
                            </div>
                          );
                        }

                        const formulas = getFormulasByTopicId(topic.id);
                        const examples = hasExample ? getExamplesByTopicId(topic.id) : [];

                        return (
                          <div key={topic.id} className="print:break-inside-avoid">
                            <h3 className="font-bold text-sm text-gray-500 mb-3">
                              Topic {topic.number}: {topic.name}
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 print:grid-cols-1 print:gap-2">
                              {/* Formulas */}
                              {formulas.map((formula) => (
                                <div key={formula.id} className="print:mb-2">
                                  <FormulaCard formula={formula} compact className="print:p-2 print:text-sm" />
                                </div>
                              ))}

                              {/* Examples */}
                              {examples.map((example) => (
                                <div key={example.id} className="print:mb-2">
                                  <ExampleCard example={example} compact expandable className="print:p-2 print:text-sm" />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.section>
              );
            })}
          </div>

          {/* Empty State */}
          {progress.formulasUnlocked === 0 && (
            <div className="text-center py-16 print:hidden">
              <Lock size={48} className="mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-bold text-gray-500 mb-2">
                No Formulas Yet
              </h2>
              <p className="text-gray-400 mb-6">
                Start learning topics to unlock formulas for your sheet!
              </p>
              <Link to="/game">
                <Button>Start Learning</Button>
              </Link>
            </div>
          )}

          {/* Print Footer */}
          <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-500">
            Generated by Formula Forge - grade-nerd.com
          </div>
        </div>
      </main>
    </div>
  );
}
