import { useState } from 'react';

interface StoryPanelsProps {
  pageNumber: number;
}

export function StoryPanels({ pageNumber }: StoryPanelsProps) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = `/grade-nerd/images/reading/story/chapter-${String(pageNumber).padStart(3, '0')}.webp`;

  return (
    <div className="w-full rounded-xl overflow-hidden">
      {imageError ? (
        <div className="w-full aspect-square bg-blue-200 rounded-xl" />
      ) : (
        <img
          src={imageSrc}
          alt={`Page ${pageNumber}`}
          loading="lazy"
          className="w-full h-auto object-cover rounded-xl"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
