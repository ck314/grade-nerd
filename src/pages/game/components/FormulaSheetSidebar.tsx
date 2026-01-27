import React from 'react';
import { cn } from '../../../lib/utils';
import { X, FileText } from 'lucide-react';
import { useGameProgress } from '../../../hooks/useGameProgress';
import { getFormulasByTopicId } from '../../../data/game/formulas';
import { getTopicById } from '../../../data/game/gameTopics';
import { getUnitByTopicId } from '../../../data/game/gameUnits';
import { FormulaCard } from './FormulaCard';

interface FormulaSheetSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FormulaSheetSidebar({ isOpen, onClose }: FormulaSheetSidebarProps) {
  const { getUnlockedFormulas } = useGameProgress();
  const unlockedTopicIds = getUnlockedFormulas();

  // Group formulas by unit
  const formulasByUnit: { [unitId: string]: { topicId: string; topicName: string; formulas: ReturnType<typeof getFormulasByTopicId> }[] } = {};

  unlockedTopicIds.forEach(topicId => {
    const topic = getTopicById(topicId);
    const unit = getUnitByTopicId(topicId);
    if (!topic || !unit) return;

    if (!formulasByUnit[unit.id]) {
      formulasByUnit[unit.id] = [];
    }

    const formulas = getFormulasByTopicId(topicId);
    if (formulas.length > 0) {
      formulasByUnit[unit.id].push({
        topicId,
        topicName: topic.name,
        formulas,
      });
    }
  });

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed top-0 right-0 h-full w-full max-w-md bg-white border-l-2 border-black z-50 transform transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b-2 border-black p-4 flex items-center justify-between bg-yellow-50">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <div>
                <h2 className="font-bold text-lg">Formula Sheet</h2>
                <p className="text-xs text-gray-600">{unlockedTopicIds.length} formulas unlocked</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {unlockedTopicIds.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No formulas yet!</p>
                <p className="text-sm">Start a topic to unlock your first formula.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(formulasByUnit).map(([unitId, topics]) => {
                  const unit = getUnitByTopicId(topics[0]?.topicId);
                  if (!unit) return null;

                  return (
                    <div key={unitId}>
                      <h3 className={cn(
                        'font-bold text-sm px-2 py-1 rounded mb-3',
                        unit.bgColor, unit.color
                      )}>
                        Unit {unit.number}: {unit.shortName}
                      </h3>
                      <div className="space-y-3">
                        {topics.map(({ topicId, topicName, formulas }) => (
                          <div key={topicId}>
                            <h4 className="text-xs font-bold text-gray-500 mb-2">{topicName}</h4>
                            <div className="space-y-2">
                              {formulas.map(formula => (
                                <FormulaCard
                                  key={formula.id}
                                  formula={formula}
                                  compact
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
