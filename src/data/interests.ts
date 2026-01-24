import { Interest } from './types';

export const interests: Interest[] = [
  {
    id: 'economics',
    name: 'Economics',
    description: 'See how math powers business decisions, market analysis, and financial modeling',
    icon: 'TrendingUp',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Discover the mathematical laws that govern motion, forces, and the universe',
    icon: 'Atom',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'neural-networks',
    name: 'Neural Networks',
    description: 'Explore how AI and machine learning use math to learn and make predictions',
    icon: 'Brain',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export const getInterestById = (id: string): Interest | undefined => {
  return interests.find(i => i.id === id);
};
