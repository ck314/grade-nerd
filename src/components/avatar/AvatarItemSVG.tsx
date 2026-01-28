import React from 'react';

interface AvatarItemSVGProps {
  itemId: string;
  className?: string;
}

// SVG coordinate reference for base stick figure (viewBox="0 0 100 200"):
// - Head center: (50, 30), radius 20
// - Eyes at: (42, 30) and (58, 30)
// - Neck at: (50, 50)
// - Body: y=50 to y=120
// - Arms from: (50, 70)
// - Hand positions: ~(25, 90) and (75, 90)
// - Legs from: (50, 120) to ~(30, 180) and (70, 180)

export function AvatarItemSVG({ itemId }: AvatarItemSVGProps) {
  switch (itemId) {
    // 3 POINT ITEMS
    case 'pencil-ear':
      return (
        <g className="avatar-item pencil-ear">
          {/* Yellow pencil behind right ear */}
          <line x1="68" y1="15" x2="75" y2="40" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
          <polygon points="75,40 73,45 77,45" fill="#FFD700" />
          <line x1="68" y1="15" x2="70" y2="20" stroke="#FFB6C1" strokeWidth="3" strokeLinecap="round" />
          <polygon points="75,45 73,48 77,48" fill="#2D2D2D" />
        </g>
      );

    case 'round-glasses':
      return (
        <g className="avatar-item round-glasses" fill="none" stroke="#4A4A4A" strokeWidth="1.5">
          <circle cx="42" cy="30" r="8" />
          <circle cx="58" cy="30" r="8" />
          <path d="M50 30 h-0.5" />
          <path d="M34 30 h-6" />
          <path d="M66 30 h6" />
        </g>
      );

    case 'thick-glasses':
      return (
        <g className="avatar-item thick-glasses" fill="none" stroke="#2D2D2D" strokeWidth="3">
          <rect x="33" y="24" width="14" height="12" rx="2" />
          <rect x="53" y="24" width="14" height="12" rx="2" />
          <path d="M47 30 h6" strokeWidth="2" />
          <path d="M33 30 h-5" strokeWidth="2" />
          <path d="M67 30 h5" strokeWidth="2" />
        </g>
      );

    case 'bow-tie':
      return (
        <g className="avatar-item bow-tie">
          <polygon points="43,52 50,55 43,58" fill="#FF4444" />
          <polygon points="57,52 50,55 57,58" fill="#FF4444" />
          <circle cx="50" cy="55" r="2" fill="#CC0000" />
        </g>
      );

    case 'suspenders':
      return (
        <g className="avatar-item suspenders" stroke="#3366CC" strokeWidth="2" fill="none">
          <path d="M45 55 L42 120" />
          <path d="M55 55 L58 120" />
          <path d="M42 75 h16" />
        </g>
      );

    case 'rosy-cheeks':
      return (
        <g className="avatar-item rosy-cheeks">
          <ellipse cx="35" cy="35" rx="5" ry="3" fill="#FFB6C1" opacity="0.6" />
          <ellipse cx="65" cy="35" rx="5" ry="3" fill="#FFB6C1" opacity="0.6" />
        </g>
      );

    case 'pencil-held':
      return (
        <g className="avatar-item pencil-held">
          {/* Pencil in right hand */}
          <line x1="73" y1="85" x2="85" y2="70" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
          <polygon points="85,70 83,66 87,68" fill="#2D2D2D" />
          <line x1="73" y1="85" x2="70" y2="88" stroke="#FFB6C1" strokeWidth="3" strokeLinecap="round" />
        </g>
      );

    case 'ruler-held':
      return (
        <g className="avatar-item ruler-held">
          {/* Ruler in left hand */}
          <rect x="8" y="75" width="22" height="5" fill="#F5DEB3" stroke="#8B4513" strokeWidth="1" rx="1" />
          <line x1="12" y1="75" x2="12" y2="80" stroke="#8B4513" strokeWidth="0.5" />
          <line x1="17" y1="75" x2="17" y2="80" stroke="#8B4513" strokeWidth="0.5" />
          <line x1="22" y1="75" x2="22" y2="80" stroke="#8B4513" strokeWidth="0.5" />
          <line x1="27" y1="75" x2="27" y2="80" stroke="#8B4513" strokeWidth="0.5" />
        </g>
      );

    case 'headband':
      return (
        <g className="avatar-item headband">
          <ellipse cx="50" cy="18" rx="18" ry="5" fill="none" stroke="#FF6B6B" strokeWidth="3" />
        </g>
      );

    case 'tiny-stars':
      return (
        <g className="avatar-item tiny-stars">
          <polygon points="20,15 21,18 24,18 22,20 23,23 20,21 17,23 18,20 16,18 19,18" fill="#FFD700" />
          <polygon points="80,20 81,22 83,22 82,24 82.5,26 80,25 77.5,26 78,24 77,22 79,22" fill="#FFD700" />
          <polygon points="75,5 75.7,7 78,7 76.2,8.5 76.8,11 75,9.5 73.2,11 73.8,8.5 72,7 74.3,7" fill="#FFD700" />
        </g>
      );

    // 6 POINT ITEMS
    case 'graduation-cap':
      return (
        <g className="avatar-item graduation-cap">
          <polygon points="50,0 85,12 50,24 15,12" fill="#2D2D2D" />
          <rect x="35" y="12" width="30" height="4" fill="#2D2D2D" />
          <line x1="75" y1="12" x2="80" y2="25" stroke="#FFD700" strokeWidth="1.5" />
          <circle cx="80" cy="27" r="3" fill="#FFD700" />
        </g>
      );

    case 'lab-coat':
      return (
        <g className="avatar-item lab-coat">
          {/* Lab coat outline */}
          <path d="M35 55 L35 115 L42 120 L50 115 L58 120 L65 115 L65 55 L55 52 L50 55 L45 52 Z"
                fill="white" stroke="#CCCCCC" strokeWidth="1" />
          <line x1="50" y1="55" x2="50" y2="110" stroke="#CCCCCC" strokeWidth="0.5" />
          <rect x="38" y="85" width="8" height="10" fill="none" stroke="#CCCCCC" strokeWidth="0.5" rx="1" />
          <rect x="54" y="85" width="8" height="10" fill="none" stroke="#CCCCCC" strokeWidth="0.5" rx="1" />
        </g>
      );

    case 'calculator-held':
      return (
        <g className="avatar-item calculator-held">
          {/* Calculator in hand */}
          <rect x="70" y="78" width="15" height="20" fill="#333" rx="2" />
          <rect x="72" y="80" width="11" height="6" fill="#90EE90" />
          <g fill="#666">
            <rect x="72" y="88" width="3" height="2" rx="0.5" />
            <rect x="76" y="88" width="3" height="2" rx="0.5" />
            <rect x="80" y="88" width="3" height="2" rx="0.5" />
            <rect x="72" y="91" width="3" height="2" rx="0.5" />
            <rect x="76" y="91" width="3" height="2" rx="0.5" />
            <rect x="80" y="91" width="3" height="2" rx="0.5" />
            <rect x="72" y="94" width="3" height="2" rx="0.5" />
            <rect x="76" y="94" width="3" height="2" rx="0.5" />
            <rect x="80" y="94" width="3" height="2" rx="0.5" />
          </g>
        </g>
      );

    case 'safety-goggles':
      return (
        <g className="avatar-item safety-goggles">
          <path d="M28 25 Q50 20 72 25 L72 38 Q50 43 28 38 Z" fill="rgba(135,206,250,0.4)" stroke="#666" strokeWidth="2" />
          <ellipse cx="40" cy="30" rx="10" ry="7" fill="none" stroke="#666" strokeWidth="2" />
          <ellipse cx="60" cy="30" rx="10" ry="7" fill="none" stroke="#666" strokeWidth="2" />
          <path d="M50 30 h0" stroke="#666" strokeWidth="2" />
        </g>
      );

    case 'backpack':
      return (
        <g className="avatar-item backpack">
          <rect x="35" y="55" width="30" height="40" rx="5" fill="#4169E1" stroke="#2D2D2D" strokeWidth="1" />
          <rect x="40" y="60" width="20" height="12" rx="2" fill="#5179F1" />
          <path d="M38 55 Q38 45 50 45 Q62 45 62 55" fill="none" stroke="#2D2D2D" strokeWidth="2" />
        </g>
      );

    case 'medal':
      return (
        <g className="avatar-item medal">
          <path d="M45 52 L50 70 L55 52" fill="none" stroke="#FFD700" strokeWidth="2" />
          <circle cx="50" cy="78" r="8" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
          <text x="50" y="82" textAnchor="middle" fontSize="8" fill="#DAA520" fontWeight="bold">1</text>
        </g>
      );

    case 'pi-shirt':
      return (
        <g className="avatar-item pi-shirt">
          <rect x="40" y="70" width="20" height="25" fill="#4169E1" rx="2" />
          <text x="50" y="88" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold" fontFamily="serif">π</text>
        </g>
      );

    case 'sparkle-trail':
      return (
        <g className="avatar-item sparkle-trail">
          <circle cx="25" cy="140" r="2" fill="#FFD700" opacity="0.8" />
          <circle cx="30" cy="155" r="1.5" fill="#FFD700" opacity="0.6" />
          <circle cx="22" cy="165" r="1" fill="#FFD700" opacity="0.4" />
          <circle cx="75" cy="140" r="2" fill="#FFD700" opacity="0.8" />
          <circle cx="70" cy="155" r="1.5" fill="#FFD700" opacity="0.6" />
          <circle cx="78" cy="165" r="1" fill="#FFD700" opacity="0.4" />
        </g>
      );

    // 9 POINT ITEMS
    case 'einstein-hair':
      return (
        <g className="avatar-item einstein-hair">
          <path d="M30 25 Q25 10 35 5 Q30 15 38 12 Q32 20 40 18" fill="none" stroke="#888" strokeWidth="3" strokeLinecap="round" />
          <path d="M70 25 Q75 10 65 5 Q70 15 62 12 Q68 20 60 18" fill="none" stroke="#888" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 12 Q50 0 60 12" fill="none" stroke="#888" strokeWidth="3" strokeLinecap="round" />
        </g>
      );

    case 'superhero-cape':
      return (
        <g className="avatar-item superhero-cape">
          <path d="M40 50 Q35 100 25 140 L50 130 L75 140 Q65 100 60 50" fill="#DC143C" stroke="#8B0000" strokeWidth="1" />
          <path d="M40 50 L50 55 L60 50" fill="#DC143C" />
        </g>
      );

    case 'propeller-beanie':
      return (
        <g className="avatar-item propeller-beanie">
          <ellipse cx="50" cy="14" rx="20" ry="8" fill="#FF6B6B" />
          <rect x="35" y="14" width="30" height="5" fill="#FF6B6B" />
          <line x1="50" y1="6" x2="50" y2="0" stroke="#666" strokeWidth="2" />
          <g transform="rotate(30, 50, 0)">
            <ellipse cx="50" cy="0" rx="12" ry="3" fill="#4169E1" />
          </g>
        </g>
      );

    case 'floating-formulas':
      return (
        <g className="avatar-item floating-formulas" fill="#666" fontSize="8" fontFamily="serif">
          <text x="15" y="50" transform="rotate(-15, 15, 50)">E=mc²</text>
          <text x="75" y="45" transform="rotate(10, 75, 45)">∫</text>
          <text x="10" y="100" transform="rotate(-5, 10, 100)">π</text>
          <text x="85" y="85" transform="rotate(15, 85, 85)">Σ</text>
          <text x="20" y="70" fontSize="6">a²+b²</text>
          <text x="78" y="110" fontSize="6">∞</text>
        </g>
      );

    case 'monocle':
      return (
        <g className="avatar-item monocle">
          <circle cx="58" cy="30" r="9" fill="none" stroke="#DAA520" strokeWidth="2" />
          <circle cx="58" cy="30" r="7" fill="rgba(200,200,255,0.2)" />
          <path d="M67 30 Q75 35 72 50" fill="none" stroke="#DAA520" strokeWidth="1" />
        </g>
      );

    // 15 POINT ITEMS
    case 'genius-aura':
      return (
        <g className="avatar-item genius-aura">
          <ellipse cx="50" cy="90" rx="40" ry="70" fill="url(#auraGradient)" opacity="0.3" />
          <defs>
            <radialGradient id="auraGradient" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
          </defs>
        </g>
      );

    case 'wizard-hat':
      return (
        <g className="avatar-item wizard-hat">
          <polygon points="50,-5 25,20 75,20" fill="#4B0082" stroke="#2D0052" strokeWidth="1" />
          <ellipse cx="50" cy="20" rx="28" ry="8" fill="#4B0082" stroke="#2D0052" strokeWidth="1" />
          <polygon points="35,8 32,5 38,7" fill="#FFD700" />
          <polygon points="55,2 58,-1 54,3" fill="#FFD700" />
          <polygon points="45,0 42,-2 48,1" fill="#FFD700" />
          <circle cx="60" cy="5" r="1.5" fill="#FFD700" />
          <circle cx="40" cy="12" r="1" fill="#FFD700" />
        </g>
      );

    default:
      return null;
  }
}

// Get the z-index for layering items correctly
export function getItemZIndex(itemId: string): number {
  const zIndexMap: Record<string, number> = {
    // Behind figure
    'genius-aura': -10,
    'superhero-cape': -8,
    'backpack': -5,
    // Body items
    'lab-coat': 2,
    'suspenders': 3,
    'pi-shirt': 4,
    'bow-tie': 5,
    'medal': 6,
    'pencil-held': 8,
    'ruler-held': 8,
    'calculator-held': 8,
    // Face items
    'rosy-cheeks': 12,
    'round-glasses': 15,
    'thick-glasses': 15,
    'safety-goggles': 16,
    'monocle': 17,
    // Head items
    'pencil-ear': 22,
    'headband': 25,
    'einstein-hair': 26,
    'graduation-cap': 28,
    'propeller-beanie': 29,
    'wizard-hat': 30,
    // Effects
    'sparkle-trail': 32,
    'tiny-stars': 35,
    'floating-formulas': 38,
  };
  return zIndexMap[itemId] || 0;
}
