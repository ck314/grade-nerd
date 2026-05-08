import { useState } from 'react';
import { motion } from 'framer-motion';

interface StoryPanelsProps {
  pageNumber: number;
  chaptersRevealed: boolean[]; // length 4, which panels are sharp
}

const QUADRANTS = [
  { objectPosition: '0% 0%' },     // top-left
  { objectPosition: '100% 0%' },   // top-right
  { objectPosition: '0% 100%' },   // bottom-left
  { objectPosition: '100% 100%' }, // bottom-right
];

const PLACEHOLDER_COLORS = [
  'bg-blue-200',
  'bg-amber-200',
  'bg-emerald-200',
  'bg-rose-200',
];

export function StoryPanels({ pageNumber, chaptersRevealed }: StoryPanelsProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const imageSrc = `/grade-nerd/images/reading/story/page-${String(pageNumber).padStart(2, '0')}.webp`;

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div
      key={pageNumber}
      className="grid grid-cols-2 gap-1 w-full rounded-xl overflow-hidden"
    >
      {QUADRANTS.map((quadrant, index) => {
        const revealed = chaptersRevealed[index] ?? false;
        const hasError = imageErrors[index] ?? false;

        return (
          <motion.div
            key={`${pageNumber}-panel-${index}`}
            className="aspect-square overflow-hidden"
            animate={{
              filter: revealed ? 'blur(0px) grayscale(0%)' : 'blur(8px) grayscale(100%)',
            }}
            transition={{ duration: 0.5 }}
          >
            {hasError ? (
              <div className={`w-full h-full ${PLACEHOLDER_COLORS[index]}`} />
            ) : (
              <img
                src={imageSrc}
                alt={`Story panel ${index + 1}`}
                loading="lazy"
                onError={() => handleImageError(index)}
                style={{
                  objectFit: 'cover',
                  objectPosition: quadrant.objectPosition,
                  width: '200%',
                  height: '200%',
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
