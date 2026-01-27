import { GameUnit } from './gameTypes';

export const gameUnits: GameUnit[] = [
  {
    id: 'unit-1',
    number: 1,
    name: 'Linear Systems',
    shortName: 'Linear',
    description: 'Master equations of lines and systems of linear equations',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    topicIds: ['topic-01', 'topic-02', 'topic-03', 'topic-04'],
  },
  {
    id: 'unit-2',
    number: 2,
    name: 'Analytic Geometry',
    shortName: 'Geometry',
    description: 'Explore coordinate geometry and geometric properties',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    topicIds: ['topic-05', 'topic-06', 'topic-07', 'topic-08', 'topic-09'],
  },
  {
    id: 'unit-3',
    number: 3,
    name: 'Similar Triangles & Trigonometry',
    shortName: 'Trig',
    description: 'Learn triangle similarity and trigonometric ratios',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    topicIds: ['topic-10', 'topic-11', 'topic-12', 'topic-13', 'topic-14'],
  },
  {
    id: 'unit-4',
    number: 4,
    name: 'Quadratic Expressions',
    shortName: 'Expressions',
    description: 'Master exponents, expanding, and factoring polynomials',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    topicIds: ['topic-15', 'topic-16', 'topic-17', 'topic-18', 'topic-19'],
  },
  {
    id: 'unit-5',
    number: 5,
    name: 'Quadratic Equations Part I',
    shortName: 'Quadratics I',
    description: 'Understand parabolas, transformations, and vertex form',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    topicIds: ['topic-20', 'topic-21', 'topic-22'],
  },
  {
    id: 'unit-6',
    number: 6,
    name: 'Quadratic Equations Part II',
    shortName: 'Quadratics II',
    description: 'Solve quadratics and apply them to real-world problems',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    topicIds: ['topic-23', 'topic-24', 'topic-25'],
  },
];

export function getUnitById(unitId: string): GameUnit | undefined {
  return gameUnits.find(u => u.id === unitId);
}

export function getUnitByTopicId(topicId: string): GameUnit | undefined {
  return gameUnits.find(u => u.topicIds.includes(topicId));
}
