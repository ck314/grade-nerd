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

interface SafeZone {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

function computePosition(vw: number, vh: number, fw: number, fh: number, avoidCenter: boolean): { x: number; y: number } {
  const zones: SafeZone[] = [];

  // Left zone — avoid ProgressCounter (~120x65 at bottom-left)
  const leftXMax = Math.max(16, vw * 0.15) - fw;
  const leftYMax = vh - 96 - fh;
  if (leftXMax > 16 && leftYMax > 64) {
    zones.push({ xMin: 16, xMax: leftXMax, yMin: 64, yMax: leftYMax });
  }

  // Right zone — clear of hamburger (top-right 40x40)
  const rightXMin = Math.min(vw * 0.85, vw - 16 - fw);
  const rightXMax = vw - 16 - fw;
  const rightYMax = vh - 88 - fh;
  if (rightXMax >= rightXMin && rightYMax > 64) {
    zones.push({ xMin: rightXMin, xMax: rightXMax, yMin: 64, yMax: rightYMax });
  }

  // Top zone
  const topXMax = vw - 64 - fw;
  const topYMax = Math.max(64, vh * 0.2) - fh;
  if (topXMax > 64 && topYMax > 64) {
    zones.push({ xMin: 64, xMax: topXMax, yMin: 64, yMax: topYMax });
  }

  // Bottom zone — avoid LessonNav (~104x48 at bottom-right)
  // When Next Lesson button is visible, push 30px further down to avoid overlap
  const bottomXMax = vw - 120 - fw;
  const bottomYMin = Math.min(vh * 0.8, vh - 88 - fh) + (avoidCenter ? 30 : 0);
  const bottomYMax = vh - 88 - fh;
  if (bottomXMax > 64 && bottomYMax >= bottomYMin) {
    zones.push({ xMin: 64, xMax: bottomXMax, yMin: bottomYMin, yMax: bottomYMax });
  }

  if (zones.length === 0) {
    return { x: 16, y: 64 };
  }

  const zone = zones[randomInt(zones.length)];
  return {
    x: zone.xMin + Math.random() * (zone.xMax - zone.xMin),
    y: zone.yMin + Math.random() * (zone.yMax - zone.yMin),
  };
}

class AvatarErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

interface DecorativeAvatarProps {
  avoidCenter?: boolean;
}

export function DecorativeAvatar({ avoidCenter = false }: DecorativeAvatarProps) {
  const [config] = useState(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const size = getResponsiveSize(vw);
    const { width: fw, height: fh } = SIZE_CONFIG[size];
    const variant = VARIANTS[randomInt(VARIANTS.length)];
    const items = generateRandomItems();
    const pos = computePosition(vw, vh, fw, fh, avoidCenter);
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
