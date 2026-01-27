import { Formula } from './gameTypes';

export const formulas: Formula[] = [
  // Unit 1: Linear Systems
  {
    id: 'formula-01',
    topicId: 'topic-01',
    name: 'Slope Formula',
    formula: 'm = (y₂ - y₁) / (x₂ - x₁)',
    description: 'Calculate the steepness of a line between two points. Rise over run.',
    variables: [
      { symbol: 'm', meaning: 'slope (steepness of the line)' },
      { symbol: '(x₁, y₁)', meaning: 'first point coordinates' },
      { symbol: '(x₂, y₂)', meaning: 'second point coordinates' },
    ],
  },
  {
    id: 'formula-02',
    topicId: 'topic-02',
    name: 'Slope-Intercept Form',
    formula: 'y = mx + b',
    description: 'The most common form for writing a linear equation. Shows slope and y-intercept directly.',
    variables: [
      { symbol: 'm', meaning: 'slope' },
      { symbol: 'b', meaning: 'y-intercept (where line crosses y-axis)' },
      { symbol: 'x, y', meaning: 'coordinates of any point on the line' },
    ],
  },
  {
    id: 'formula-02b',
    topicId: 'topic-02',
    name: 'Point-Slope Form',
    formula: 'y - y₁ = m(x - x₁)',
    description: 'Write a line equation when you know the slope and one point.',
    variables: [
      { symbol: 'm', meaning: 'slope' },
      { symbol: '(x₁, y₁)', meaning: 'a known point on the line' },
    ],
  },
  {
    id: 'formula-03',
    topicId: 'topic-03',
    name: 'Linear System Solution',
    formula: 'Point of intersection (x, y)',
    description: 'A linear system has a solution where two lines intersect. The solution satisfies both equations.',
    variables: [
      { symbol: '(x, y)', meaning: 'the point where both lines cross' },
    ],
  },
  {
    id: 'formula-04',
    topicId: 'topic-04',
    name: 'Substitution Method',
    formula: 'Solve one equation for a variable, substitute into the other',
    description: 'Isolate a variable in one equation, then plug it into the other to solve.',
    variables: [],
  },
  {
    id: 'formula-04b',
    topicId: 'topic-04',
    name: 'Elimination Method',
    formula: 'Add or subtract equations to eliminate a variable',
    description: 'Multiply equations so coefficients match, then add/subtract to eliminate one variable.',
    variables: [],
  },

  // Unit 2: Analytic Geometry
  {
    id: 'formula-05',
    topicId: 'topic-05',
    name: 'Midpoint Formula',
    formula: 'M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
    description: 'Find the exact middle point between two coordinates by averaging.',
    variables: [
      { symbol: 'M', meaning: 'midpoint' },
      { symbol: '(x₁, y₁)', meaning: 'first endpoint' },
      { symbol: '(x₂, y₂)', meaning: 'second endpoint' },
    ],
  },
  {
    id: 'formula-06',
    topicId: 'topic-06',
    name: 'Distance Formula',
    formula: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
    description: 'Calculate the length between two points using the Pythagorean theorem.',
    variables: [
      { symbol: 'd', meaning: 'distance between points' },
      { symbol: '(x₁, y₁)', meaning: 'first point' },
      { symbol: '(x₂, y₂)', meaning: 'second point' },
    ],
  },
  {
    id: 'formula-07',
    topicId: 'topic-07',
    name: 'Equation of a Circle',
    formula: '(x - h)² + (y - k)² = r²',
    description: 'Standard form of a circle with center (h, k) and radius r.',
    variables: [
      { symbol: '(h, k)', meaning: 'center of the circle' },
      { symbol: 'r', meaning: 'radius' },
      { symbol: '(x, y)', meaning: 'any point on the circle' },
    ],
  },
  {
    id: 'formula-08',
    topicId: 'topic-08',
    name: 'Perpendicular Slope',
    formula: 'm₁ × m₂ = -1',
    description: 'Perpendicular lines have slopes that are negative reciprocals.',
    variables: [
      { symbol: 'm₁', meaning: 'slope of first line' },
      { symbol: 'm₂', meaning: 'slope of perpendicular line' },
    ],
  },
  {
    id: 'formula-09',
    topicId: 'topic-09',
    name: 'Parallel Lines Property',
    formula: 'm₁ = m₂',
    description: 'Parallel lines have equal slopes but different y-intercepts.',
    variables: [
      { symbol: 'm₁, m₂', meaning: 'slopes of parallel lines' },
    ],
  },

  // Unit 3: Similar Triangles & Trigonometry
  {
    id: 'formula-10',
    topicId: 'topic-10',
    name: 'Similar Triangles Proportion',
    formula: 'a/A = b/B = c/C',
    description: 'Corresponding sides of similar triangles are proportional.',
    variables: [
      { symbol: 'a, b, c', meaning: 'sides of smaller triangle' },
      { symbol: 'A, B, C', meaning: 'corresponding sides of larger triangle' },
    ],
  },
  {
    id: 'formula-11',
    topicId: 'topic-11',
    name: 'SOH CAH TOA',
    formula: 'sin θ = O/H, cos θ = A/H, tan θ = O/A',
    description: 'The three primary trig ratios for right triangles.',
    variables: [
      { symbol: 'θ', meaning: 'angle' },
      { symbol: 'O', meaning: 'opposite side' },
      { symbol: 'A', meaning: 'adjacent side' },
      { symbol: 'H', meaning: 'hypotenuse' },
    ],
  },
  {
    id: 'formula-12',
    topicId: 'topic-12',
    name: 'Sine Law',
    formula: 'a/sin A = b/sin B = c/sin C',
    description: 'Relates sides to their opposite angles in any triangle.',
    variables: [
      { symbol: 'a, b, c', meaning: 'sides of triangle' },
      { symbol: 'A, B, C', meaning: 'angles opposite to sides a, b, c' },
    ],
  },
  {
    id: 'formula-13',
    topicId: 'topic-13',
    name: 'Cosine Law',
    formula: 'c² = a² + b² - 2ab·cos C',
    description: 'Find a side when you know two sides and the included angle, or find an angle when you know all three sides.',
    variables: [
      { symbol: 'a, b, c', meaning: 'sides of triangle' },
      { symbol: 'C', meaning: 'angle opposite to side c' },
    ],
  },
  {
    id: 'formula-14',
    topicId: 'topic-14',
    name: 'Angle of Elevation/Depression',
    formula: 'tan θ = opposite/adjacent',
    description: 'Use tangent ratio for problems involving heights and distances.',
    variables: [
      { symbol: 'θ', meaning: 'angle of elevation or depression' },
    ],
  },

  // Unit 4: Quadratic Expressions
  {
    id: 'formula-15',
    topicId: 'topic-15',
    name: 'Exponent Laws',
    formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ',
    description: 'Rules for multiplying, dividing, and raising powers with the same base.',
    variables: [
      { symbol: 'a', meaning: 'base' },
      { symbol: 'm, n', meaning: 'exponents' },
    ],
  },
  {
    id: 'formula-15b',
    topicId: 'topic-15',
    name: 'Zero and Negative Exponents',
    formula: 'a⁰ = 1, a⁻ⁿ = 1/aⁿ',
    description: 'Any number to the power of 0 is 1. Negative exponents flip to denominators.',
    variables: [
      { symbol: 'a', meaning: 'base (a ≠ 0)' },
      { symbol: 'n', meaning: 'exponent' },
    ],
  },
  {
    id: 'formula-16',
    topicId: 'topic-16',
    name: 'FOIL Method',
    formula: '(a + b)(c + d) = ac + ad + bc + bd',
    description: 'Multiply two binomials by multiplying First, Outer, Inner, Last terms.',
    variables: [
      { symbol: 'a, b, c, d', meaning: 'terms in the binomials' },
    ],
  },
  {
    id: 'formula-17',
    topicId: 'topic-17',
    name: 'Greatest Common Factor',
    formula: 'ab + ac = a(b + c)',
    description: 'Factor out the largest expression that divides all terms evenly.',
    variables: [
      { symbol: 'a', meaning: 'the GCF' },
      { symbol: 'b, c', meaning: 'remaining factors' },
    ],
  },
  {
    id: 'formula-18',
    topicId: 'topic-18',
    name: 'Factoring Trinomials',
    formula: 'x² + bx + c = (x + p)(x + q) where p + q = b and p × q = c',
    description: 'Find two numbers that add to b and multiply to c.',
    variables: [
      { symbol: 'b', meaning: 'coefficient of x' },
      { symbol: 'c', meaning: 'constant term' },
      { symbol: 'p, q', meaning: 'numbers that satisfy both conditions' },
    ],
  },
  {
    id: 'formula-19',
    topicId: 'topic-19',
    name: 'Perfect Square Trinomial',
    formula: 'a² + 2ab + b² = (a + b)², a² - 2ab + b² = (a - b)²',
    description: 'Recognize when a trinomial is a perfect square.',
    variables: [
      { symbol: 'a, b', meaning: 'terms being squared' },
    ],
  },
  {
    id: 'formula-19b',
    topicId: 'topic-19',
    name: 'Difference of Squares',
    formula: 'a² - b² = (a + b)(a - b)',
    description: 'Factor the difference of two perfect squares.',
    variables: [
      { symbol: 'a, b', meaning: 'square root of each term' },
    ],
  },

  // Unit 5: Quadratic Equations Part I
  {
    id: 'formula-20',
    topicId: 'topic-20',
    name: 'Standard Form of Quadratic',
    formula: 'y = ax² + bx + c',
    description: 'The general form of a quadratic function. The sign of "a" determines if it opens up or down.',
    variables: [
      { symbol: 'a', meaning: 'determines width and direction' },
      { symbol: 'b', meaning: 'affects position of vertex' },
      { symbol: 'c', meaning: 'y-intercept' },
    ],
  },
  {
    id: 'formula-21',
    topicId: 'topic-21',
    name: 'Vertex Form',
    formula: 'y = a(x - h)² + k',
    description: 'Shows the vertex directly. Perfect for graphing parabolas.',
    variables: [
      { symbol: 'a', meaning: 'stretch/compression and direction' },
      { symbol: '(h, k)', meaning: 'vertex of the parabola' },
    ],
  },
  {
    id: 'formula-22',
    topicId: 'topic-22',
    name: 'Completing the Square',
    formula: 'x² + bx + (b/2)² = (x + b/2)²',
    description: 'Add the square of half the coefficient of x to create a perfect square.',
    variables: [
      { symbol: 'b', meaning: 'coefficient of x' },
      { symbol: 'b/2', meaning: 'half the coefficient, used in the factored form' },
    ],
  },

  // Unit 6: Quadratic Equations Part II
  {
    id: 'formula-23',
    topicId: 'topic-23',
    name: 'Factored Form',
    formula: 'y = a(x - r)(x - s)',
    description: 'Shows the x-intercepts (roots) directly. r and s are where the parabola crosses the x-axis.',
    variables: [
      { symbol: 'a', meaning: 'stretch/compression and direction' },
      { symbol: 'r, s', meaning: 'x-intercepts (roots/zeros)' },
    ],
  },
  {
    id: 'formula-24',
    topicId: 'topic-24',
    name: 'Quadratic Formula',
    formula: 'x = (-b ± √(b² - 4ac)) / 2a',
    description: 'Solves any quadratic equation ax² + bx + c = 0. Works even when factoring fails.',
    variables: [
      { symbol: 'a, b, c', meaning: 'coefficients from standard form' },
      { symbol: '±', meaning: 'gives two solutions (add and subtract)' },
    ],
  },
  {
    id: 'formula-24b',
    topicId: 'topic-24',
    name: 'Discriminant',
    formula: 'D = b² - 4ac',
    description: 'Determines the number of solutions: D > 0 (two), D = 0 (one), D < 0 (none).',
    variables: [
      { symbol: 'D', meaning: 'discriminant' },
      { symbol: 'a, b, c', meaning: 'coefficients from standard form' },
    ],
  },
  {
    id: 'formula-25',
    topicId: 'topic-25',
    name: 'Axis of Symmetry',
    formula: 'x = -b / 2a',
    description: 'The x-coordinate of the vertex. Use this to find maximum or minimum values.',
    variables: [
      { symbol: 'x', meaning: 'x-coordinate of vertex' },
      { symbol: 'a, b', meaning: 'coefficients from standard form' },
    ],
  },
];

export function getFormulasByTopicId(topicId: string): Formula[] {
  return formulas.filter(f => f.topicId === topicId);
}

export function getFormulaById(formulaId: string): Formula | undefined {
  return formulas.find(f => f.id === formulaId);
}
