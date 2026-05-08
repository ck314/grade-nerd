import { cn } from '../../../lib/utils';

interface ProgressStepsProps {
  current: number;
  total: number;
}

export function ProgressSteps({ current, total }: ProgressStepsProps) {
  const steps = 10;
  const unitsPerStep = total / steps;

  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: steps }, (_, i) => {
        const stepStart = i * unitsPerStep;
        const stepEnd = (i + 1) * unitsPerStep;
        const isFull = current >= stepEnd;
        const isPartial = current > stepStart && current < stepEnd;
        const fillPercent = isPartial
          ? ((current - stepStart) / unitsPerStep) * 100
          : 0;

        return (
          <div
            key={i}
            className={cn(
              'h-2.5 flex-1 rounded-sm overflow-hidden transition-colors duration-300',
              isFull
                ? 'bg-[#0066FF] shadow-[inset_0_-1px_0_rgba(0,0,0,0.15)]'
                : 'bg-gray-200'
            )}
          >
            {isPartial && (
              <div
                className="h-full bg-[#0066FF]/50 transition-all duration-500 ease-out"
                style={{ width: `${fillPercent}%` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
