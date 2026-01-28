// Avatar customization items for Formula Forge

export type AvatarItemCategory = 'head' | 'face' | 'body' | 'effects';

export interface AvatarItem {
  id: string;
  name: string;
  category: AvatarItemCategory;
  price: number;
  description: string;
  zIndex: number; // layering order: negative=behind, 0=base, positive=front
}

// Z-index ranges:
// Behind (-10 to -1): Capes, backpacks, auras
// Base (0): Stick figure (not an item)
// Body (1-10): Shirts, bow ties, held items
// Face (11-20): Glasses, goggles, cheeks
// Head (21-30): Hats, hair, headbands
// Effects (31-40): Stars, sparkles, floating formulas (animated)

export const avatarItems: AvatarItem[] = [
  // 3 POINT ITEMS (10 items)
  {
    id: 'pencil-ear',
    name: 'Pencil Behind Ear',
    category: 'head',
    price: 3,
    description: 'A classic yellow pencil tucked behind your ear',
    zIndex: 22,
  },
  {
    id: 'round-glasses',
    name: 'Round Glasses',
    category: 'face',
    price: 3,
    description: 'Circular spectacles for a scholarly look',
    zIndex: 15,
  },
  {
    id: 'thick-glasses',
    name: 'Thick-Rimmed Glasses',
    category: 'face',
    price: 3,
    description: 'Bold frames that mean business',
    zIndex: 15,
  },
  {
    id: 'bow-tie',
    name: 'Bow Tie',
    category: 'body',
    price: 3,
    description: 'A dapper bow tie for formal occasions',
    zIndex: 5,
  },
  {
    id: 'suspenders',
    name: 'Suspenders',
    category: 'body',
    price: 3,
    description: 'Classic suspenders to hold everything together',
    zIndex: 3,
  },
  {
    id: 'rosy-cheeks',
    name: 'Rosy Cheeks',
    category: 'face',
    price: 3,
    description: 'A healthy glow of academic enthusiasm',
    zIndex: 12,
  },
  {
    id: 'pencil-held',
    name: 'Pencil (Held)',
    category: 'body',
    price: 3,
    description: 'Ready to solve any problem',
    zIndex: 8,
  },
  {
    id: 'ruler-held',
    name: 'Ruler (Held)',
    category: 'body',
    price: 3,
    description: 'Measure twice, calculate once',
    zIndex: 8,
  },
  {
    id: 'headband',
    name: 'Headband',
    category: 'head',
    price: 3,
    description: 'Athletic style for mental gymnastics',
    zIndex: 25,
  },
  {
    id: 'tiny-stars',
    name: 'Tiny Stars',
    category: 'effects',
    price: 3,
    description: 'Twinkling stars around your head',
    zIndex: 35,
  },

  // 6 POINT ITEMS (8 items)
  {
    id: 'graduation-cap',
    name: 'Graduation Cap',
    category: 'head',
    price: 6,
    description: 'You earned it! A classic mortarboard',
    zIndex: 28,
  },
  {
    id: 'lab-coat',
    name: 'Lab Coat',
    category: 'body',
    price: 6,
    description: 'Official scientist attire',
    zIndex: 2,
  },
  {
    id: 'calculator-held',
    name: 'Calculator (Held)',
    category: 'body',
    price: 6,
    description: 'Your trusty computing companion',
    zIndex: 8,
  },
  {
    id: 'safety-goggles',
    name: 'Safety Goggles',
    category: 'face',
    price: 6,
    description: 'Science is fun, but safety first!',
    zIndex: 16,
  },
  {
    id: 'backpack',
    name: 'Backpack',
    category: 'body',
    price: 6,
    description: 'Carry all your knowledge',
    zIndex: -5,
  },
  {
    id: 'medal',
    name: 'Medal',
    category: 'body',
    price: 6,
    description: 'A shiny medal for excellence',
    zIndex: 6,
  },
  {
    id: 'pi-shirt',
    name: 'Pi Shirt',
    category: 'body',
    price: 6,
    description: 'Show your love for 3.14159...',
    zIndex: 4,
  },
  {
    id: 'sparkle-trail',
    name: 'Sparkle Trail',
    category: 'effects',
    price: 6,
    description: 'Leave a trail of mathematical magic',
    zIndex: 32,
  },

  // 9 POINT ITEMS (5 items)
  {
    id: 'einstein-hair',
    name: 'Einstein Hair',
    category: 'head',
    price: 9,
    description: 'Wild genius hair for wild genius ideas',
    zIndex: 26,
  },
  {
    id: 'superhero-cape',
    name: 'Superhero Cape',
    category: 'body',
    price: 9,
    description: 'Math is your superpower!',
    zIndex: -8,
  },
  {
    id: 'propeller-beanie',
    name: 'Propeller Beanie',
    category: 'head',
    price: 9,
    description: 'A spinning propeller cap for brainy fun',
    zIndex: 29,
  },
  {
    id: 'floating-formulas',
    name: 'Floating Formulas',
    category: 'effects',
    price: 9,
    description: 'Mathematical symbols orbit around you',
    zIndex: 38,
  },
  {
    id: 'monocle',
    name: 'Monocle',
    category: 'face',
    price: 9,
    description: 'For examining equations closely',
    zIndex: 17,
  },

  // 15 POINT ITEMS (2 items)
  {
    id: 'genius-aura',
    name: 'Genius Aura',
    category: 'effects',
    price: 15,
    description: 'A radiant glow of pure intellect',
    zIndex: -10,
  },
  {
    id: 'wizard-hat',
    name: 'Math Wizard Hat',
    category: 'head',
    price: 15,
    description: 'Master of mathematical sorcery',
    zIndex: 30,
  },
];

// Helper functions
export function getItemById(itemId: string): AvatarItem | undefined {
  return avatarItems.find(item => item.id === itemId);
}

export function getItemsByCategory(category: AvatarItemCategory): AvatarItem[] {
  return avatarItems.filter(item => item.category === category);
}

export function getItemsByPrice(price: number): AvatarItem[] {
  return avatarItems.filter(item => item.price === price);
}

export function getAllCategories(): AvatarItemCategory[] {
  return ['head', 'face', 'body', 'effects'];
}

export function getCategoryLabel(category: AvatarItemCategory): string {
  const labels: Record<AvatarItemCategory, string> = {
    head: 'Head',
    face: 'Face',
    body: 'Body',
    effects: 'Effects',
  };
  return labels[category];
}

// Calculate total cost of all items (for level up check)
export function getTotalItemsCost(): number {
  return avatarItems.reduce((sum, item) => sum + item.price, 0);
}

// Get cost of unpurchased items
export function getUnpurchasedItemsCost(purchasedIds: string[]): number {
  return avatarItems
    .filter(item => !purchasedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);
}
