import { GameTopic } from './gameTypes';

export const gameTopics: GameTopic[] = [
  // Unit 1: Linear Systems (4 topics)
  {
    id: 'topic-01',
    unitId: 'unit-1',
    number: 1,
    name: 'Slope of a Line',
    shortName: 'Slope',
    description: 'Understand rise over run and how to calculate slope between two points',
    lessonsCovered: 'L1: Introduction to Slope',
  },
  {
    id: 'topic-02',
    unitId: 'unit-1',
    number: 2,
    name: 'Equations of Lines',
    shortName: 'Line Equations',
    description: 'Write equations in slope-intercept, point-slope, and standard form',
    lessonsCovered: 'L2-L3: Writing Equations, Other Forms',
  },
  {
    id: 'topic-03',
    unitId: 'unit-1',
    number: 3,
    name: 'Solving Linear Systems',
    shortName: 'Linear Systems',
    description: 'Find where two lines intersect using graphical methods',
    lessonsCovered: 'L4: Solutions to Linear Systems',
  },
  {
    id: 'topic-04',
    unitId: 'unit-1',
    number: 4,
    name: 'Substitution & Elimination Methods',
    shortName: 'Sub & Elim',
    description: 'Solve systems algebraically using substitution and elimination',
    lessonsCovered: 'L5-L7: Methods + Word Problems',
  },

  // Unit 2: Analytic Geometry (5 topics)
  {
    id: 'topic-05',
    unitId: 'unit-2',
    number: 5,
    name: 'Midpoint of a Line Segment',
    shortName: 'Midpoint',
    description: 'Find the middle point between two coordinates',
    lessonsCovered: 'L1: Midpoint',
  },
  {
    id: 'topic-06',
    unitId: 'unit-2',
    number: 6,
    name: 'Length of a Line Segment',
    shortName: 'Distance',
    description: 'Calculate the distance between two points using the distance formula',
    lessonsCovered: 'L2: Distance Formula',
  },
  {
    id: 'topic-07',
    unitId: 'unit-2',
    number: 7,
    name: 'Equation of a Circle',
    shortName: 'Circles',
    description: 'Write and interpret the equation of a circle',
    lessonsCovered: 'L3: Circle Equations',
  },
  {
    id: 'topic-08',
    unitId: 'unit-2',
    number: 8,
    name: 'Medians, Altitudes & Bisectors',
    shortName: 'Triangle Lines',
    description: 'Understand special lines in triangles and their properties',
    lessonsCovered: 'L4: Perpendicular Bisectors, Medians, Altitudes',
  },
  {
    id: 'topic-09',
    unitId: 'unit-2',
    number: 9,
    name: 'Classifying Shapes',
    shortName: 'Classification',
    description: 'Use geometric properties to classify triangles and quadrilaterals',
    lessonsCovered: 'L5: Classifying by Geometric Properties',
  },

  // Unit 3: Similar Triangles & Trigonometry (5 topics)
  {
    id: 'topic-10',
    unitId: 'unit-3',
    number: 10,
    name: 'Similar Triangles',
    shortName: 'Similarity',
    description: 'Identify similar triangles and solve for unknown sides',
    lessonsCovered: 'L1: Similar Triangles',
  },
  {
    id: 'topic-11',
    unitId: 'unit-3',
    number: 11,
    name: 'Primary Trigonometric Ratios',
    shortName: 'SOH CAH TOA',
    description: 'Use sine, cosine, and tangent to find missing sides and angles',
    lessonsCovered: 'L2: SOHCAHTOA',
  },
  {
    id: 'topic-12',
    unitId: 'unit-3',
    number: 12,
    name: 'The Sine Law',
    shortName: 'Sine Law',
    description: 'Apply the sine law to non-right triangles',
    lessonsCovered: 'L3: Sine Law',
  },
  {
    id: 'topic-13',
    unitId: 'unit-3',
    number: 13,
    name: 'The Cosine Law',
    shortName: 'Cosine Law',
    description: 'Apply the cosine law to find missing sides and angles',
    lessonsCovered: 'L4: Cosine Law',
  },
  {
    id: 'topic-14',
    unitId: 'unit-3',
    number: 14,
    name: 'Applications of Trigonometry',
    shortName: 'Trig Apps',
    description: 'Solve real-world problems using trigonometry',
    lessonsCovered: 'L5: Real-world Trig Problems',
  },

  // Unit 4: Quadratic Expressions (5 topics)
  {
    id: 'topic-15',
    unitId: 'unit-4',
    number: 15,
    name: 'Exponent Laws',
    shortName: 'Exponents',
    description: 'Master the rules for multiplying, dividing, and raising powers',
    lessonsCovered: 'L1: Exponent Laws',
  },
  {
    id: 'topic-16',
    unitId: 'unit-4',
    number: 16,
    name: 'Multiplying Binomials',
    shortName: 'FOIL',
    description: 'Expand products of binomials using FOIL and distribution',
    lessonsCovered: 'L2: Expanding Binomials',
  },
  {
    id: 'topic-17',
    unitId: 'unit-4',
    number: 17,
    name: 'Common Factoring',
    shortName: 'GCF Factor',
    description: 'Factor out the greatest common factor from expressions',
    lessonsCovered: 'L3: GCF Factoring',
  },
  {
    id: 'topic-18',
    unitId: 'unit-4',
    number: 18,
    name: 'Factoring Trinomials',
    shortName: 'Trinomials',
    description: 'Factor quadratic trinomials of the form ax² + bx + c',
    lessonsCovered: 'L4: Trinomial Factoring',
  },
  {
    id: 'topic-19',
    unitId: 'unit-4',
    number: 19,
    name: 'Perfect Squares & Difference of Squares',
    shortName: 'Special Products',
    description: 'Recognize and factor special quadratic patterns',
    lessonsCovered: 'L5-L6: Special Products + Strategies',
  },

  // Unit 5: Quadratic Equations Part I (3 topics)
  {
    id: 'topic-20',
    unitId: 'unit-5',
    number: 20,
    name: 'Introduction to Quadratics & Transformations',
    shortName: 'Quad Intro',
    description: 'Understand the parabola and how parameters affect its shape',
    lessonsCovered: 'L1-L3: Intro, Value of a, Translations',
  },
  {
    id: 'topic-21',
    unitId: 'unit-5',
    number: 21,
    name: 'Graphing Parabolas in Vertex Form',
    shortName: 'Vertex Form',
    description: 'Graph quadratics using vertex form y = a(x - h)² + k',
    lessonsCovered: 'L4: Vertex Form Graphing',
  },
  {
    id: 'topic-22',
    unitId: 'unit-5',
    number: 22,
    name: 'Completing the Square',
    shortName: 'Complete Square',
    description: 'Convert standard form to vertex form by completing the square',
    lessonsCovered: 'L5: Completing the Square',
  },

  // Unit 6: Quadratic Equations Part II (3 topics)
  {
    id: 'topic-23',
    unitId: 'unit-6',
    number: 23,
    name: 'Factored Form & Comparing Forms',
    shortName: 'Factored Form',
    description: 'Understand factored form and compare all three quadratic forms',
    lessonsCovered: 'L1-L2: Factored Form, Comparing All Forms',
  },
  {
    id: 'topic-24',
    unitId: 'unit-6',
    number: 24,
    name: 'Solving Quadratic Equations',
    shortName: 'Quad Formula',
    description: 'Solve quadratics using factoring, completing the square, and the quadratic formula',
    lessonsCovered: 'L3: Quadratic Formula & Methods',
  },
  {
    id: 'topic-25',
    unitId: 'unit-6',
    number: 25,
    name: 'Maximum/Minimum Applications',
    shortName: 'Max/Min',
    description: 'Use quadratics to solve optimization problems',
    lessonsCovered: 'L4: Optimization Problems',
  },
];

export function getTopicById(topicId: string): GameTopic | undefined {
  return gameTopics.find(t => t.id === topicId);
}

export function getTopicsByUnitId(unitId: string): GameTopic[] {
  return gameTopics.filter(t => t.unitId === unitId);
}

export function getNextTopic(currentTopicId: string): GameTopic | undefined {
  const currentIndex = gameTopics.findIndex(t => t.id === currentTopicId);
  if (currentIndex === -1 || currentIndex === gameTopics.length - 1) {
    return undefined;
  }
  return gameTopics[currentIndex + 1];
}

export function getPreviousTopic(currentTopicId: string): GameTopic | undefined {
  const currentIndex = gameTopics.findIndex(t => t.id === currentTopicId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return gameTopics[currentIndex - 1];
}
