import { useState, useEffect, useCallback } from 'react';
import { WordToken } from '../../../data/reading';

const IGNORED_KEYS = new Set(['Escape', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Shift', 'Control', 'Alt', 'Meta']);

interface WordHighlightDisplayProps {
  tokens: WordToken[];
  fontSize: string;
  onComplete: () => void;
}

export function WordHighlightDisplay({ tokens, fontSize, onComplete }: WordHighlightDisplayProps) {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  // Reset when tokens change
  useEffect(() => {
    setHighlightIndex(0);
    setComplete(false);
  }, [tokens]);

  const advance = useCallback(() => {
    if (complete) return;
    const nextIndex = highlightIndex + 1;
    if (nextIndex > tokens.length - 1) {
      setComplete(true);
      onComplete();
    } else {
      setHighlightIndex(nextIndex);
    }
  }, [highlightIndex, tokens, complete, onComplete]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (IGNORED_KEYS.has(e.key)) return;

      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) return;

      if (complete) return;

      if (e.key === ' ') e.preventDefault();
      advance();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [advance, complete]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"]')) return;
    if (!complete) {
      advance();
    }
  }, [advance, complete]);

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-[0.4em] gap-y-[0.2em] cursor-pointer select-none"
      style={{ fontSize }}
      onClick={handleClick}
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          className="inline-block py-1 transition-all duration-150"
          style={{
            borderBottom: i === highlightIndex && !complete ? '4px solid #0066FF' : '4px solid transparent',
            fontWeight: 700,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {token.display}
        </span>
      ))}
    </div>
  );
}
