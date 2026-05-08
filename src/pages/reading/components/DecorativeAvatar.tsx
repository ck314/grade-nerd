import { useState, Component, ReactNode } from 'react';
import { CustomizableAvatar } from '../../../components/avatar/CustomizableAvatar';
import { getItemsByCategory, AvatarItemCategory } from '../../../data/game/avatarItems';

const VARIANTS = ['standing', 'thinking', 'teaching', 'qed'] as const;
const CATEGORIES: AvatarItemCategory[] = ['head', 'face', 'body', 'effects'];

const SIZE_CONFIG = {
  lg: { width: 96, height: 192 },
  md: { width: 64, height: 128 },
  sm: { width: 48, height: 96 },
} as const;

function getResponsiveSize(viewportWidth: number) {
  if (viewportWidth >= 480) return 'lg' as const;
  if (viewportWidth >= 380) return 'md' as const;
  return 'sm' as const;
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateRandomItems(): string[] {
  const count = randomInt(5); // 0-4
  if (count === 0) return [];
  const picked = shuffle(CATEGORIES).slice(0, count);
  return picked.map(cat => {
    const items = getItemsByCategory(cat);
    return items[randomInt(items.length)].id;
  });
}

function computePosition(vw: number, fw: number, lessonNumber: number, isTraversing: boolean): { x: number; y: number } {
  // 20 steps per 10-lesson cycle: 2 per lesson (traversing + completed)
  // Lesson 1 traversing = step 0, lesson 1 completed = step 1,
  // lesson 2 traversing = step 2, etc.
  const lessonInCycle = ((lessonNumber - 1) % 10);
  const step = lessonInCycle * 2 + (isTraversing ? 0 : 1);

  const rightMargin = vw * 0.05;
  const leftMargin = vw >= 640 ? 320 : vw * 0.05;
  const xMin = leftMargin;
  const xMax = vw - rightMargin - fw;
  const t = xMax > xMin ? step / 19 : 0;
  const x = xMin + t * (xMax - xMin);

  const y = 72;
  return { x, y };
}

class AvatarErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

interface DecorativeAvatarProps {
  avoidCenter?: boolean;
  lessonNumber?: number;
  isTraversing?: boolean;
}

export function DecorativeAvatar({ lessonNumber = 1, isTraversing = true }: DecorativeAvatarProps) {
  const [config] = useState(() => {
    const vw = window.innerWidth;
    const size = getResponsiveSize(vw);
    const { width: fw } = SIZE_CONFIG[size];
    const variant = VARIANTS[randomInt(VARIANTS.length)];
    const items = generateRandomItems();
    const pos = computePosition(vw, fw, lessonNumber, isTraversing);
    return { variant, items, pos, size };
  });

  return (
    <div
      className="absolute z-10 pointer-events-none"
      style={{ top: config.pos.y, left: config.pos.x }}
    >
      <AvatarErrorBoundary>
        <CustomizableAvatar
          equippedItems={config.items}
          variant={config.variant}
          size={config.size}
          level={1}
        />
      </AvatarErrorBoundary>
    </div>
  );
}
