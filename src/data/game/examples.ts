import { WorkedExample } from './gameTypes';

export const examples: WorkedExample[] = [
  // Unit 1: Linear Systems
  {
    id: 'example-01',
    topicId: 'topic-01',
    title: 'Finding Slope Between Two Points',
    problem: 'Find the slope of the line through points (2, 3) and (6, 11).',
    steps: [
      'Identify the coordinates: (x₁, y₁) = (2, 3) and (x₂, y₂) = (6, 11)',
      'Apply the slope formula: m = (y₂ - y₁) / (x₂ - x₁)',
      'Substitute values: m = (11 - 3) / (6 - 2)',
      'Calculate: m = 8 / 4 = 2',
    ],
    answer: 'The slope is m = 2',
  },
  {
    id: 'example-02',
    topicId: 'topic-02',
    title: 'Writing an Equation in Slope-Intercept Form',
    problem: 'Write the equation of a line with slope 3 passing through point (2, 5).',
    steps: [
      'Start with slope-intercept form: y = mx + b',
      'We know m = 3, so: y = 3x + b',
      'Substitute the point (2, 5): 5 = 3(2) + b',
      'Solve for b: 5 = 6 + b, so b = -1',
      'Write final equation: y = 3x - 1',
    ],
    answer: 'y = 3x - 1',
  },
  {
    id: 'example-03',
    topicId: 'topic-03',
    title: 'Finding the Intersection Point',
    problem: 'Find where y = 2x + 1 and y = -x + 7 intersect.',
    steps: [
      'Set the equations equal (since both equal y): 2x + 1 = -x + 7',
      'Add x to both sides: 3x + 1 = 7',
      'Subtract 1: 3x = 6',
      'Divide by 3: x = 2',
      'Substitute x = 2 into either equation: y = 2(2) + 1 = 5',
    ],
    answer: 'The lines intersect at (2, 5)',
  },
  {
    id: 'example-04',
    topicId: 'topic-04',
    title: 'Solving by Elimination',
    problem: 'Solve the system: 2x + 3y = 12 and 4x - 3y = 6',
    steps: [
      'Notice the y coefficients are opposites (3y and -3y)',
      'Add the equations: (2x + 3y) + (4x - 3y) = 12 + 6',
      'Simplify: 6x = 18, so x = 3',
      'Substitute x = 3 into first equation: 2(3) + 3y = 12',
      'Solve: 6 + 3y = 12, 3y = 6, y = 2',
    ],
    answer: 'x = 3, y = 2 or (3, 2)',
  },

  // Unit 2: Analytic Geometry
  {
    id: 'example-05',
    topicId: 'topic-05',
    title: 'Finding the Midpoint',
    problem: 'Find the midpoint of the segment connecting A(1, 4) and B(7, 10).',
    steps: [
      'Use the midpoint formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
      'Substitute: M = ((1 + 7)/2, (4 + 10)/2)',
      'Calculate: M = (8/2, 14/2)',
      'Simplify: M = (4, 7)',
    ],
    answer: 'The midpoint is (4, 7)',
  },
  {
    id: 'example-06',
    topicId: 'topic-06',
    title: 'Finding Distance Between Points',
    problem: 'Find the distance between P(1, 2) and Q(4, 6).',
    steps: [
      'Use distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]',
      'Substitute: d = √[(4 - 1)² + (6 - 2)²]',
      'Calculate: d = √[3² + 4²] = √[9 + 16]',
      'Simplify: d = √25 = 5',
    ],
    answer: 'The distance is 5 units',
  },
  {
    id: 'example-07',
    topicId: 'topic-07',
    title: 'Writing the Equation of a Circle',
    problem: 'Write the equation of a circle with center (3, -2) and radius 5.',
    steps: [
      'Use standard form: (x - h)² + (y - k)² = r²',
      'Identify: h = 3, k = -2, r = 5',
      'Substitute: (x - 3)² + (y - (-2))² = 5²',
      'Simplify: (x - 3)² + (y + 2)² = 25',
    ],
    answer: '(x - 3)² + (y + 2)² = 25',
  },
  {
    id: 'example-08',
    topicId: 'topic-08',
    title: 'Finding a Perpendicular Bisector',
    problem: 'Find the perpendicular bisector of segment AB where A(2, 4) and B(6, 8).',
    steps: [
      'Find midpoint: M = ((2+6)/2, (4+8)/2) = (4, 6)',
      'Find slope of AB: m = (8-4)/(6-2) = 4/4 = 1',
      'Perpendicular slope: m⊥ = -1/1 = -1',
      'Use point-slope with M(4, 6): y - 6 = -1(x - 4)',
      'Simplify: y = -x + 10',
    ],
    answer: 'The perpendicular bisector is y = -x + 10',
  },
  {
    id: 'example-09',
    topicId: 'topic-09',
    title: 'Classifying a Quadrilateral',
    problem: 'Determine if ABCD with A(0,0), B(4,0), C(5,3), D(1,3) is a parallelogram.',
    steps: [
      'Find slope of AB: (0-0)/(4-0) = 0',
      'Find slope of DC: (3-3)/(5-1) = 0',
      'AB || DC (same slope)',
      'Find slope of AD: (3-0)/(1-0) = 3',
      'Find slope of BC: (3-0)/(5-4) = 3',
      'AD || BC (same slope)',
    ],
    answer: 'Yes, ABCD is a parallelogram (opposite sides are parallel)',
  },

  // Unit 3: Similar Triangles & Trigonometry
  {
    id: 'example-10',
    topicId: 'topic-10',
    title: 'Finding Missing Side in Similar Triangles',
    problem: 'Triangle ABC ~ Triangle DEF. If AB = 6, DE = 9, and BC = 8, find EF.',
    steps: [
      'Set up proportion using corresponding sides: AB/DE = BC/EF',
      'Substitute known values: 6/9 = 8/EF',
      'Cross multiply: 6 × EF = 9 × 8',
      'Solve: 6 × EF = 72, so EF = 72/6 = 12',
    ],
    answer: 'EF = 12',
  },
  {
    id: 'example-11',
    topicId: 'topic-11',
    title: 'Using SOHCAHTOA to Find a Side',
    problem: 'In a right triangle, angle A = 35° and the hypotenuse is 10. Find the opposite side.',
    steps: [
      'We have angle and hypotenuse, need opposite → use Sine',
      'sin A = Opposite/Hypotenuse',
      'sin 35° = x/10',
      'x = 10 × sin 35°',
      'x = 10 × 0.574 ≈ 5.74',
    ],
    answer: 'The opposite side is approximately 5.74 units',
  },
  {
    id: 'example-12',
    topicId: 'topic-12',
    title: 'Using Sine Law',
    problem: 'In triangle ABC, angle A = 40°, angle B = 60°, and side a = 8. Find side b.',
    steps: [
      'Set up Sine Law: a/sin A = b/sin B',
      'Substitute: 8/sin 40° = b/sin 60°',
      'Cross multiply: b × sin 40° = 8 × sin 60°',
      'Solve: b = (8 × sin 60°)/sin 40°',
      'Calculate: b = (8 × 0.866)/0.643 ≈ 10.78',
    ],
    answer: 'Side b ≈ 10.78 units',
  },
  {
    id: 'example-13',
    topicId: 'topic-13',
    title: 'Using Cosine Law to Find a Side',
    problem: 'In triangle ABC, a = 5, b = 7, and angle C = 60°. Find side c.',
    steps: [
      'Use Cosine Law: c² = a² + b² - 2ab·cos C',
      'Substitute: c² = 5² + 7² - 2(5)(7)·cos 60°',
      'Calculate: c² = 25 + 49 - 70(0.5)',
      'Simplify: c² = 74 - 35 = 39',
      'Take square root: c = √39 ≈ 6.24',
    ],
    answer: 'Side c ≈ 6.24 units',
  },
  {
    id: 'example-14',
    topicId: 'topic-14',
    title: 'Angle of Elevation Problem',
    problem: 'A person stands 50m from a building. The angle of elevation to the top is 32°. How tall is the building?',
    steps: [
      'Draw diagram: angle at ground, opposite = height, adjacent = 50m',
      'Use tangent: tan 32° = height/50',
      'Solve for height: height = 50 × tan 32°',
      'Calculate: height = 50 × 0.625 ≈ 31.24',
    ],
    answer: 'The building is approximately 31.24 meters tall',
  },

  // Unit 4: Quadratic Expressions
  {
    id: 'example-15',
    topicId: 'topic-15',
    title: 'Simplifying with Exponent Laws',
    problem: 'Simplify: (2x³)² × x⁴',
    steps: [
      'Apply power to each factor in parentheses: (2)² × (x³)² × x⁴',
      'Calculate: 4 × x⁶ × x⁴',
      'Apply multiplication rule (add exponents): 4x⁶⁺⁴',
      'Simplify: 4x¹⁰',
    ],
    answer: '4x¹⁰',
  },
  {
    id: 'example-16',
    topicId: 'topic-16',
    title: 'Expanding Using FOIL',
    problem: 'Expand: (2x + 3)(x - 4)',
    steps: [
      'First: 2x × x = 2x²',
      'Outer: 2x × (-4) = -8x',
      'Inner: 3 × x = 3x',
      'Last: 3 × (-4) = -12',
      'Combine like terms: 2x² - 8x + 3x - 12 = 2x² - 5x - 12',
    ],
    answer: '2x² - 5x - 12',
  },
  {
    id: 'example-17',
    topicId: 'topic-17',
    title: 'Factoring Out the GCF',
    problem: 'Factor: 6x³ + 9x² - 3x',
    steps: [
      'Find GCF of coefficients: GCF(6, 9, 3) = 3',
      'Find GCF of variables: all terms have at least x¹',
      'GCF = 3x',
      'Factor out 3x: 3x(2x² + 3x - 1)',
      'Check by distributing: 3x(2x²) + 3x(3x) + 3x(-1) = 6x³ + 9x² - 3x ✓',
    ],
    answer: '3x(2x² + 3x - 1)',
  },
  {
    id: 'example-18',
    topicId: 'topic-18',
    title: 'Factoring a Trinomial',
    problem: 'Factor: x² + 5x + 6',
    steps: [
      'Find two numbers that multiply to 6 and add to 5',
      'Factors of 6: 1×6, 2×3',
      'Check sums: 1+6=7 (no), 2+3=5 (yes!)',
      'Write as product: (x + 2)(x + 3)',
      'Verify: (x+2)(x+3) = x² + 3x + 2x + 6 = x² + 5x + 6 ✓',
    ],
    answer: '(x + 2)(x + 3)',
  },
  {
    id: 'example-19',
    topicId: 'topic-19',
    title: 'Factoring Difference of Squares',
    problem: 'Factor: 9x² - 16',
    steps: [
      'Recognize pattern: a² - b²',
      'Identify perfect squares: 9x² = (3x)² and 16 = 4²',
      'Apply formula: a² - b² = (a + b)(a - b)',
      'Substitute: (3x + 4)(3x - 4)',
    ],
    answer: '(3x + 4)(3x - 4)',
  },

  // Unit 5: Quadratic Equations Part I
  {
    id: 'example-20',
    topicId: 'topic-20',
    title: 'Identifying Transformations',
    problem: 'Describe the transformations from y = x² to y = -2(x - 3)² + 5',
    steps: [
      'a = -2: vertical stretch by factor 2, opens downward (reflection)',
      'h = 3: horizontal shift 3 units right',
      'k = 5: vertical shift 5 units up',
      'Vertex is at (3, 5)',
    ],
    answer: 'Reflected, stretched by 2, shifted right 3 and up 5. Vertex: (3, 5)',
  },
  {
    id: 'example-21',
    topicId: 'topic-21',
    title: 'Graphing from Vertex Form',
    problem: 'Graph y = 2(x - 1)² - 3. Find vertex, axis of symmetry, and direction.',
    steps: [
      'Vertex form: y = a(x - h)² + k, so h = 1, k = -3',
      'Vertex: (1, -3)',
      'Axis of symmetry: x = 1',
      'a = 2 > 0: parabola opens upward',
      'a = 2: narrower than y = x² (stretched)',
    ],
    answer: 'Vertex: (1, -3), Axis: x = 1, Opens up (narrow)',
  },
  {
    id: 'example-22',
    topicId: 'topic-22',
    title: 'Completing the Square',
    problem: 'Convert y = x² + 6x + 5 to vertex form.',
    steps: [
      'Group x terms: y = (x² + 6x) + 5',
      'Half of 6 is 3, square it: 3² = 9',
      'Add and subtract 9 inside: y = (x² + 6x + 9 - 9) + 5',
      'Factor perfect square: y = (x + 3)² - 9 + 5',
      'Simplify: y = (x + 3)² - 4',
    ],
    answer: 'y = (x + 3)² - 4, Vertex: (-3, -4)',
  },

  // Unit 6: Quadratic Equations Part II
  {
    id: 'example-23',
    topicId: 'topic-23',
    title: 'Converting to Factored Form',
    problem: 'Write y = x² - 5x + 6 in factored form and find the x-intercepts.',
    steps: [
      'Factor the trinomial: find two numbers that multiply to 6 and add to -5',
      'Numbers are -2 and -3: (-2)(-3) = 6, (-2)+(-3) = -5',
      'Factored form: y = (x - 2)(x - 3)',
      'x-intercepts: set y = 0, so x - 2 = 0 or x - 3 = 0',
      'x = 2 or x = 3',
    ],
    answer: 'y = (x - 2)(x - 3), x-intercepts: (2, 0) and (3, 0)',
  },
  {
    id: 'example-24',
    topicId: 'topic-24',
    title: 'Using the Quadratic Formula',
    problem: 'Solve: 2x² + 5x - 3 = 0',
    steps: [
      'Identify a = 2, b = 5, c = -3',
      'Apply formula: x = (-b ± √(b² - 4ac)) / 2a',
      'Calculate discriminant: b² - 4ac = 25 - 4(2)(-3) = 25 + 24 = 49',
      'Substitute: x = (-5 ± √49) / 4 = (-5 ± 7) / 4',
      'Two solutions: x = (-5 + 7)/4 = 1/2 or x = (-5 - 7)/4 = -3',
    ],
    answer: 'x = 1/2 or x = -3',
  },
  {
    id: 'example-25',
    topicId: 'topic-25',
    title: 'Finding Maximum Revenue',
    problem: 'Revenue R = -5x² + 200x, where x is price. Find the price that maximizes revenue.',
    steps: [
      'This is a downward parabola (a = -5 < 0), so vertex is maximum',
      'Use axis of symmetry: x = -b / 2a',
      'Substitute: x = -200 / 2(-5) = -200 / -10 = 20',
      'Maximum revenue: R = -5(20)² + 200(20) = -2000 + 4000 = 2000',
    ],
    answer: 'Price of $20 maximizes revenue at $2000',
  },
];

export function getExamplesByTopicId(topicId: string): WorkedExample[] {
  return examples.filter(e => e.topicId === topicId);
}

export function getExampleById(exampleId: string): WorkedExample | undefined {
  return examples.find(e => e.id === exampleId);
}
