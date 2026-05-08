import { useState } from 'react';
import { motion } from 'framer-motion';

interface StoryPanelsProps {
  pageNumber: number;
  chaptersRevealed: boolean[];
}

const PLACEHOLDER_COLORS = [
  'bg-blue-200',
  'bg-amber-200',
  'bg-emerald-200',
  'bg-rose-200',
];

export function StoryPanels({ pageNumber, chaptersRevealed }: StoryPanelsProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const chapterNumbers = Array.from({ length: 4 }, (_, i) => (pageNumber - 1) * 4 + i + 1);

  return (
    <div
      key={pageNumber}
      className="grid grid-cols-2 gap-1 w-full rounded-xl overflow-hidden"
    >
      {chapterNumbers.map((chapterNum, index) => {
        const revealed = chaptersRevealed[index] ?? false;
        const hasError = imageErrors[index] ?? false;
        const imageSrc = `/grade-nerd/images/reading/story/chapter-${String(chapterNum).padStart(3, '0')}.webp`;

        return (
          <motion.div
            key={`${pageNumber}-panel-${index}`}
            className="aspect-square overflow-hidden rounded-lg"
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
                alt={`Chapter ${chapterNum}`}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
