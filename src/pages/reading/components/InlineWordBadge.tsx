import { useState } from 'react';

interface InlineWordBadgeProps {
  word: string;
  imagePath: string;
}

export function InlineWordBadge({ word, imagePath }: InlineWordBadgeProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-black shadow-sm">
        {!imgError && (
          <img
            src={imagePath}
            alt={word}
            loading="lazy"
            className="w-12 h-12 rounded object-cover"
            onError={() => setImgError(true)}
          />
        )}
        <span className="text-lg font-bold">{word}</span>
      </div>
    </div>
  );
}
