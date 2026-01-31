// Exam Review Questions with Concept Explanations (no solutions)

export interface StudyQuestion {
  id: string;
  partId: string;
  number: string;
  title: string;
  questionText: string;
  conceptExplanation: string[];
  keyFormulas?: string[];
  tips?: string[];
}

export interface StudyPart {
  id: string;
  number: number;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export const studyParts: StudyPart[] = [
  {
    id: 'part1',
    number: 1,
    title: 'Equations and Linear Systems',
    description: 'Linear equations, systems of equations, substitution, elimination, and graphing',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'part2',
    number: 2,
    title: 'Analytic Geometry',
    description: 'Circles, lines, slopes, midpoints, distances, and triangle properties',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'part3',
    number: 3,
    title: 'Quadratics',
    description: 'Parabolas, vertex form, factoring, completing the square, and applications',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'part4',
    number: 4,
    title: 'Similarity and Trigonometry',
    description: 'Trigonometric ratios, sine law, cosine law, and similar triangles',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export const studyQuestions: StudyQuestion[] = [
  // PART 1: Equations and Linear Systems
  {
    id: 'p1q1',
    partId: 'part1',
    number: '1',
    title: 'Slope-Intercept Form',
    questionText: 'The line y = -5/8 x + 7 has a slope ___ and a y-intercept ___.',
    conceptExplanation: [
      'This question tests your understanding of the slope-intercept form of a linear equation.',
      'The slope-intercept form is written as: y = mx + b',
      'In this form, m represents the slope of the line - it tells you how steep the line is and whether it goes up or down.',
      'The value b represents the y-intercept - this is where the line crosses the y-axis (when x = 0).',
      'To identify the slope and y-intercept, simply compare the given equation to y = mx + b and identify which number is in each position.',
    ],
    keyFormulas: ['y = mx + b', 'm = slope', 'b = y-intercept'],
    tips: [
      'The coefficient of x is always the slope',
      'The constant term (number by itself) is the y-intercept',
      'A negative slope means the line goes down from left to right',
    ],
  },
  {
    id: 'p1q2',
    partId: 'part1',
    number: '2',
    title: 'Parallel Lines (No Intersection)',
    questionText: 'Create a linear system that has two equations for lines that do not intersect. Please use y = mx + b form.',
    conceptExplanation: [
      'This question tests your understanding of when linear systems have no solution.',
      'Two lines do not intersect when they are parallel to each other.',
      'Parallel lines have the SAME slope but DIFFERENT y-intercepts.',
      'If two lines had the same slope AND the same y-intercept, they would be the same line (infinite solutions).',
      'To create parallel lines, choose any slope value, then use that same slope with two different y-intercept values.',
    ],
    keyFormulas: ['Parallel lines: m₁ = m₂ (same slope)', 'No solution: same slope, different y-intercepts'],
    tips: [
      'Example: y = 2x + 3 and y = 2x - 1 are parallel (both have slope 2)',
      'The lines will never meet because they rise at the same rate',
    ],
  },
  {
    id: 'p1q3',
    partId: 'part1',
    number: '3',
    title: 'Verifying a Solution',
    questionText: 'Is the point (-4, 5) the solution to the system y = -3x - 7 and 2x - 3y = -23? Explain.',
    conceptExplanation: [
      'A point is a solution to a system of equations if it satisfies ALL equations in the system.',
      'To verify, substitute the x-value and y-value into each equation separately.',
      'If both equations produce true statements, the point IS a solution.',
      'If even ONE equation produces a false statement, the point is NOT a solution.',
      'This is called "checking" or "verifying" a solution - an important skill for confirming your answers.',
    ],
    keyFormulas: ['Substitute (x, y) into each equation', 'Check: Left Side = Right Side for both equations'],
    tips: [
      'Always substitute into BOTH equations',
      'Show your work clearly: write LS = ___ and RS = ___',
      'The point must work in ALL equations to be a solution',
    ],
  },
  {
    id: 'p1q4',
    partId: 'part1',
    number: '4',
    title: 'Solving by Substitution or Elimination',
    questionText: 'Solve the system x + 8y = -2 and 2x + 5y = 7 by either substitution or elimination.',
    conceptExplanation: [
      'There are two algebraic methods for solving linear systems: substitution and elimination.',
      'SUBSTITUTION METHOD: Isolate one variable in one equation, then substitute that expression into the other equation.',
      'ELIMINATION METHOD: Add or subtract equations (sometimes after multiplying) to eliminate one variable.',
      'For elimination, you may need to multiply one or both equations by constants to make coefficients match.',
      'After finding one variable, substitute back to find the other. Always verify your solution!',
    ],
    keyFormulas: [
      'Substitution: Isolate one variable, substitute into other equation',
      'Elimination: Make coefficients opposite, add equations',
    ],
    tips: [
      'Choose substitution when one variable is easy to isolate (coefficient of 1)',
      'Choose elimination when coefficients are already close to matching',
      'Always check your answer in both original equations',
    ],
  },
  {
    id: 'p1q5',
    partId: 'part1',
    number: '5',
    title: 'Solving by Graphing',
    questionText: 'Solve by graphing: 2x - 3y = 15 and x + y = 5. Please show a check for your solution.',
    conceptExplanation: [
      'Graphing is a visual method for solving linear systems.',
      'To graph each line, you can convert to slope-intercept form (y = mx + b) or find two points on each line.',
      'The solution is the point where the two lines INTERSECT (cross each other).',
      'Read the coordinates of the intersection point carefully from the graph.',
      'Always verify by substituting the intersection point into both original equations.',
    ],
    keyFormulas: [
      'Convert to y = mx + b for easier graphing',
      'Or use x-intercept (set y=0) and y-intercept (set x=0)',
    ],
    tips: [
      'Use a ruler for accurate lines',
      'Plot at least 2-3 points per line for accuracy',
      'The check step is essential - graphing can be imprecise',
    ],
  },
  {
    id: 'p1q6',
    partId: 'part1',
    number: '6',
    title: 'Number of Solutions',
    questionText: 'How many solutions does the system y = 2x - 5 and 4x + 2y + 20 = 0 have? (none, infinite, or one) Explain.',
    conceptExplanation: [
      'A linear system can have exactly ONE solution, NO solutions, or INFINITE solutions.',
      'ONE SOLUTION: Lines intersect at exactly one point (different slopes).',
      'NO SOLUTIONS: Lines are parallel (same slope, different y-intercepts).',
      'INFINITE SOLUTIONS: Lines are identical/coincident (same slope AND same y-intercept).',
      'To determine which case, convert both equations to slope-intercept form and compare slopes and y-intercepts.',
    ],
    keyFormulas: [
      'One solution: m₁ ≠ m₂',
      'No solution: m₁ = m₂, b₁ ≠ b₂',
      'Infinite solutions: m₁ = m₂, b₁ = b₂',
    ],
    tips: [
      'Always convert to y = mx + b form first',
      'Compare the slopes first, then the y-intercepts if needed',
      'Simplify equations fully before comparing',
    ],
  },
  {
    id: 'p1q7',
    partId: 'part1',
    number: '7',
    title: 'Setting Up Linear Systems (Word Problems)',
    questionText: 'Define variables and set up the linear system. Do not solve. (a) Banquet hall dinners problem (b) Coins problem',
    conceptExplanation: [
      'Word problems require translating English into mathematical equations.',
      'Step 1: Define your variables clearly - what does x represent? what does y represent?',
      'Step 2: Identify the constraints/conditions given in the problem.',
      'Step 3: Write one equation for each condition.',
      'Common patterns: total quantity equation AND total value/cost equation.',
    ],
    keyFormulas: [
      'Total items: x + y = total count',
      'Total value: (price₁)(x) + (price₂)(y) = total value',
    ],
    tips: [
      'Read the problem twice before writing anything',
      'Define variables with units (e.g., x = number of chicken dinners)',
      'You usually need as many equations as you have unknowns',
    ],
  },
  {
    id: 'p1q8',
    partId: 'part1',
    number: '8',
    title: 'Solving Word Problems with Linear Systems',
    questionText: '(a) Looney and Ducky piggy bank problem (loonies and toonies) (b) Tennis club fee problem (initiation and monthly fees)',
    conceptExplanation: [
      'These problems combine setting up equations with solving them.',
      'For coin problems: one equation for total coins, one for total value.',
      'For fee problems: one equation per data point given (e.g., total after 1 month, total after 6 months).',
      'Remember: loonies are worth $1, toonies are worth $2, quarters are worth $0.25.',
      'After solving, always check that your answer makes sense in context (no negative coins, etc.).',
    ],
    keyFormulas: [
      'Coins: x + y = total coins',
      'Value: 1x + 2y = total dollars (for loonies and toonies)',
      'Fees: initiation + (months)(monthly fee) = total paid',
    ],
    tips: [
      'Define variables first, then set up equations',
      'Use substitution or elimination to solve',
      'State your final answer in a complete sentence with units',
    ],
  },

  // PART 2: Analytic Geometry
  {
    id: 'p2q1',
    partId: 'part2',
    number: '1',
    title: 'Circle Equation',
    questionText: 'The circle x² + y² = 4 has centre ___ and radius ___.',
    conceptExplanation: [
      'The standard form of a circle centered at the origin is x² + y² = r².',
      'The center of this circle is at the origin (0, 0).',
      'The radius r is found by taking the square root of the number on the right side.',
      'If the equation were (x-h)² + (y-k)² = r², the center would be at (h, k).',
      'The radius is always positive.',
    ],
    keyFormulas: [
      'Circle at origin: x² + y² = r²',
      'Circle at (h,k): (x-h)² + (y-k)² = r²',
    ],
    tips: [
      'The radius is √(right side), not the right side itself',
      'For x² + y² = 4, the radius is √4 = 2, not 4',
    ],
  },
  {
    id: 'p2q2',
    partId: 'part2',
    number: '2',
    title: 'Perpendicular Bisector Formulas',
    questionText: 'The two formulas needed for finding a perpendicular bisector are ___ (for perpendicular) and ___ (for bisector).',
    conceptExplanation: [
      'A perpendicular bisector is a line that crosses another line segment at its midpoint AND at a 90° angle.',
      'To ensure the line is PERPENDICULAR, you need the slope formula. Perpendicular lines have negative reciprocal slopes.',
      'To ensure the line BISECTS (cuts in half), you need the midpoint formula to find where to cross.',
      'The midpoint formula gives you a point on the perpendicular bisector.',
      'Then use point-slope form with the perpendicular slope to write the equation.',
    ],
    keyFormulas: [
      'Midpoint: M = ((x₁+x₂)/2, (y₁+y₂)/2)',
      'Slope: m = (y₂-y₁)/(x₂-x₁)',
      'Perpendicular slope: m_perp = -1/m',
    ],
    tips: [
      'Bisector means "cuts in half" → midpoint',
      'Perpendicular means "90° angle" → negative reciprocal slope',
    ],
  },
  {
    id: 'p2q3',
    partId: 'part2',
    number: '3',
    title: 'Parallel Line Slopes',
    questionText: 'Parallel lines have slopes that are ___.',
    conceptExplanation: [
      'Parallel lines never intersect - they run in the same direction.',
      'For two lines to never intersect, they must have the SAME slope.',
      'If line 1 has slope m₁ and line 2 has slope m₂, then parallel means m₁ = m₂.',
      'The y-intercepts can be different (and usually are for distinct parallel lines).',
    ],
    keyFormulas: ['Parallel lines: m₁ = m₂'],
    tips: ['Same slope = same steepness = same direction = never meet'],
  },
  {
    id: 'p2q4',
    partId: 'part2',
    number: '4',
    title: 'Perpendicular Line Slopes',
    questionText: 'Perpendicular lines have slopes that are ___.',
    conceptExplanation: [
      'Perpendicular lines intersect at a 90° (right) angle.',
      'Their slopes are NEGATIVE RECIPROCALS of each other.',
      'This means: flip the fraction AND change the sign.',
      'If one slope is m, the perpendicular slope is -1/m.',
      'The product of perpendicular slopes is always -1: m₁ × m₂ = -1.',
    ],
    keyFormulas: [
      'Perpendicular slopes: m₁ × m₂ = -1',
      'Or: m₂ = -1/m₁',
    ],
    tips: [
      'Example: if m = 2/3, then perpendicular slope = -3/2',
      'Flip and negate!',
    ],
  },
  {
    id: 'p2q5',
    partId: 'part2',
    number: '5',
    title: 'Line Segment Calculations',
    questionText: 'For points A(9, -10) and B(-3, -2), find: (a) slope (b) midpoint (c) length (d) perpendicular slope (e) equation of line',
    conceptExplanation: [
      'This question tests all the fundamental analytic geometry formulas.',
      'SLOPE: Use rise over run: m = (y₂-y₁)/(x₂-x₁)',
      'MIDPOINT: Average the x-coordinates and average the y-coordinates.',
      'LENGTH/DISTANCE: Use the distance formula (based on Pythagorean theorem).',
      'PERPENDICULAR SLOPE: Take the negative reciprocal of the slope.',
      'EQUATION: Use point-slope form y - y₁ = m(x - x₁) with the slope and either point.',
    ],
    keyFormulas: [
      'Slope: m = (y₂-y₁)/(x₂-x₁)',
      'Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)',
      'Distance: d = √[(x₂-x₁)² + (y₂-y₁)²]',
      'Point-slope: y - y₁ = m(x - x₁)',
    ],
    tips: [
      'Be careful with negative signs when subtracting coordinates',
      'For the equation, you can use either point A or point B',
    ],
  },
  {
    id: 'p2q6',
    partId: 'part2',
    number: '6',
    title: 'Median vs Altitude',
    questionText: 'What is the difference between a median and an altitude in a triangle? Illustrate using the triangle shown.',
    conceptExplanation: [
      'Both medians and altitudes are special line segments in triangles, but they serve different purposes.',
      'MEDIAN: A line segment from a vertex to the MIDPOINT of the opposite side. It divides the opposite side in half.',
      'ALTITUDE: A line segment from a vertex PERPENDICULAR to the opposite side (or its extension). It forms a 90° angle.',
      'A median bisects a side; an altitude is perpendicular to a side.',
      'They are only the same line in special cases (like in an isosceles triangle from the apex).',
    ],
    keyFormulas: [
      'Median: connects vertex to midpoint of opposite side',
      'Altitude: connects vertex perpendicular to opposite side',
    ],
    tips: [
      'Draw both on the triangle to see the difference',
      'Median uses midpoint formula; Altitude uses perpendicular slope',
    ],
  },
  {
    id: 'p2q7',
    partId: 'part2',
    number: '7',
    title: 'Proving Triangle Properties',
    questionText: 'Explain how to prove that a triangle is a right-angled isosceles triangle. Identify which formulas would help.',
    conceptExplanation: [
      'A right-angled isosceles triangle has TWO properties to prove: right angle AND two equal sides.',
      'To prove ISOSCELES: Use the distance formula to show two sides have equal length.',
      'To prove RIGHT ANGLE: Use slopes to show two sides are perpendicular (negative reciprocal slopes).',
      'Alternative for right angle: Use Pythagorean theorem - if a² + b² = c² for the three sides, there is a right angle.',
      'You need both conditions to be satisfied for a right-angled isosceles triangle.',
    ],
    keyFormulas: [
      'Distance: d = √[(x₂-x₁)² + (y₂-y₁)²]',
      'Perpendicular test: m₁ × m₂ = -1',
      'Pythagorean: a² + b² = c²',
    ],
    tips: [
      'Calculate all three side lengths first',
      'Check which two sides are equal (isosceles)',
      'Check if two sides are perpendicular (right angle)',
    ],
  },
  {
    id: 'p2q8',
    partId: 'part2',
    number: '8',
    title: 'Triangle Proofs with Coordinates',
    questionText: 'Triangle ABC has vertices A(-5,4), B(3,-2), C(1,-4). (a) Show triangle is isosceles (b) Write equation for median from A to BC.',
    conceptExplanation: [
      '(a) ISOSCELES PROOF: Calculate the length of each side using the distance formula. Show that two sides are equal.',
      '(b) MEDIAN EQUATION: First find the midpoint of BC. Then find the slope from A to that midpoint. Finally, write the equation using point-slope form.',
      'For the median, you need: midpoint of BC, slope from A to midpoint, then use y - y₁ = m(x - x₁).',
      'Show all calculations clearly and state your conclusion.',
    ],
    keyFormulas: [
      'Distance: d = √[(x₂-x₁)² + (y₂-y₁)²]',
      'Midpoint: M = ((x₁+x₂)/2, (y₁+y₂)/2)',
      'Slope: m = (y₂-y₁)/(x₂-x₁)',
    ],
    tips: [
      'Label which sides you are calculating (AB, BC, AC)',
      'For the median, clearly identify the midpoint first',
    ],
  },
  {
    id: 'p2q9',
    partId: 'part2',
    number: '9',
    title: 'Distance from Point to Line',
    questionText: 'Determine the distance between the point (5, 2) and the line y = 3x - 2.',
    conceptExplanation: [
      'The distance from a point to a line is the PERPENDICULAR distance - the shortest path.',
      'Method: Find the equation of the line perpendicular to the given line that passes through the given point.',
      'Then find where this perpendicular line intersects the original line.',
      'Finally, use the distance formula between the given point and the intersection point.',
      'Alternative: Use the point-to-line distance formula directly.',
    ],
    keyFormulas: [
      'Point-to-line distance: d = |Ax₀ + By₀ + C| / √(A² + B²)',
      'Where line is Ax + By + C = 0 and point is (x₀, y₀)',
    ],
    tips: [
      'Convert y = 3x - 2 to standard form: 3x - y - 2 = 0',
      'Then A=3, B=-1, C=-2 for the formula',
    ],
  },

  // PART 3: Quadratics
  {
    id: 'p3q1',
    partId: 'part3',
    number: '1',
    title: 'Graphing Vertex Form',
    questionText: 'Graph y = -1/2(x-3)² + 8 and find: zeros, vertex, axis of symmetry, max/min, equation in zeros form.',
    conceptExplanation: [
      'This equation is in VERTEX FORM: y = a(x-h)² + k, where (h,k) is the vertex.',
      'The vertex is the highest or lowest point on the parabola.',
      'The axis of symmetry is a vertical line through the vertex: x = h.',
      'If a < 0, the parabola opens DOWN (maximum). If a > 0, it opens UP (minimum).',
      'ZEROS are x-intercepts where y = 0. Solve 0 = a(x-h)² + k for x.',
      'ZEROS FORM is y = a(x-r)(x-s) where r and s are the zeros.',
    ],
    keyFormulas: [
      'Vertex form: y = a(x-h)² + k',
      'Vertex: (h, k)',
      'Axis of symmetry: x = h',
      'Zeros form: y = a(x-r)(x-s)',
    ],
    tips: [
      'From y = -1/2(x-3)² + 8: vertex is (3, 8)',
      'a = -1/2 < 0, so parabola opens down (maximum)',
    ],
  },
  {
    id: 'p3q2',
    partId: 'part3',
    number: '2',
    title: 'Graphing Parabolas',
    questionText: 'State the vertex and graph: (a) y = x² (b) y = -1/2 x² - 7 (c) y = 2(x-7)² - 4',
    conceptExplanation: [
      'Each equation is a transformation of the basic parabola y = x².',
      '(a) y = x² is the basic parabola with vertex at (0,0), opens up.',
      '(b) y = -1/2 x² - 7: The -1/2 reflects and compresses, -7 shifts down. Vertex: (0, -7).',
      '(c) y = 2(x-7)² - 4: The 2 stretches, (x-7) shifts right 7, -4 shifts down 4. Vertex: (7, -4).',
      'The sign of "a" determines if it opens up (positive) or down (negative).',
    ],
    keyFormulas: [
      'y = x² has vertex (0,0)',
      'y = ax² + k has vertex (0, k)',
      'y = a(x-h)² + k has vertex (h, k)',
    ],
    tips: [
      'The number inside (x-h) gives horizontal shift (opposite sign!)',
      'The number outside gives vertical shift (same sign)',
    ],
  },
  {
    id: 'p3q3',
    partId: 'part3',
    number: '3',
    title: 'Transformations of Parabolas',
    questionText: 'List the transformations that make y = x² into y = 1/2(x+4)² - 3.',
    conceptExplanation: [
      'Transformations change the basic parabola y = x² into a new parabola.',
      'ORDER MATTERS: Do horizontal transformations first, then vertical.',
      'The coefficient 1/2: vertical compression by factor of 1/2 (wider parabola).',
      'The (x+4): horizontal shift LEFT by 4 units (opposite of the sign!).',
      'The -3: vertical shift DOWN by 3 units.',
    ],
    keyFormulas: [
      'a > 1: vertical stretch',
      '0 < a < 1: vertical compression',
      'a < 0: reflection in x-axis',
      '(x-h): shift right h units',
      '(x+h): shift left h units',
      '+k: shift up k units',
      '-k: shift down k units',
    ],
    tips: [
      'Horizontal shifts are OPPOSITE the sign you see',
      'List transformations in order: stretches/compressions, then shifts',
    ],
  },
  {
    id: 'p3q4',
    partId: 'part3',
    number: '4',
    title: 'Factoring Quadratics',
    questionText: 'Factor: (a) 4x²-10x (b) x²-16 (c) x²+9x+20 (d) 9x²-30x+25 (e) 3x²+14x-5 (f) 7x²+35x+42',
    conceptExplanation: [
      'Different factoring methods for different forms:',
      '(a) COMMON FACTOR: Factor out the GCF (greatest common factor) from all terms.',
      '(b) DIFFERENCE OF SQUARES: a² - b² = (a+b)(a-b). Only works for subtraction of perfect squares.',
      '(c) SIMPLE TRINOMIAL: x² + bx + c = (x+p)(x+q) where p+q=b and pq=c.',
      '(d) PERFECT SQUARE TRINOMIAL: a² ± 2ab + b² = (a±b)².',
      '(e) COMPLEX TRINOMIAL: ax² + bx + c where a≠1. Use decomposition or trial and error.',
      '(f) FACTOR BY GROUPING: First take out GCF, then factor the remaining trinomial.',
    ],
    keyFormulas: [
      'GCF: ab + ac = a(b+c)',
      'Difference of squares: a²-b² = (a+b)(a-b)',
      'Perfect square: a²+2ab+b² = (a+b)²',
    ],
    tips: [
      'Always look for a common factor FIRST',
      'Check your factoring by expanding (FOIL)',
    ],
  },
  {
    id: 'p3q5',
    partId: 'part3',
    number: '5',
    title: 'Expanding and Simplifying',
    questionText: 'Expand and simplify: (a) 2(x+5)(x-4) + (x-3)² (b) (x-3)(x-9)',
    conceptExplanation: [
      'EXPANDING means multiplying out brackets to get a polynomial.',
      'Use FOIL for binomial × binomial: First, Outside, Inside, Last.',
      'For (x-3)²: This is (x-3)(x-3), use FOIL or the perfect square pattern.',
      'After expanding all parts, SIMPLIFY by collecting like terms.',
      'Remember to distribute any coefficients outside brackets (like the 2 in part a).',
    ],
    keyFormulas: [
      'FOIL: (a+b)(c+d) = ac + ad + bc + bd',
      '(a-b)² = a² - 2ab + b²',
      '(a+b)² = a² + 2ab + b²',
    ],
    tips: [
      'Expand each part separately first',
      'Then combine like terms',
      'Double-check signs carefully!',
    ],
  },
  {
    id: 'p3q6',
    partId: 'part3',
    number: '6',
    title: 'Evaluating Expressions with Exponents',
    questionText: 'Evaluate (no decimals): 7⁰ + 3⁻¹ - (1/3)²',
    conceptExplanation: [
      'This tests your knowledge of exponent rules.',
      'ZERO EXPONENT: Any non-zero number to the power of 0 equals 1. So a⁰ = 1.',
      'NEGATIVE EXPONENT: a⁻ⁿ = 1/aⁿ. It means "take the reciprocal."',
      'FRACTIONAL BASE: (a/b)ⁿ = aⁿ/bⁿ. Apply the exponent to both numerator and denominator.',
      'Evaluate each term separately, then combine.',
    ],
    keyFormulas: [
      'a⁰ = 1 (for a ≠ 0)',
      'a⁻ⁿ = 1/aⁿ',
      '(a/b)ⁿ = aⁿ/bⁿ',
    ],
    tips: [
      '7⁰ = 1',
      '3⁻¹ = 1/3',
      '(1/3)² = 1/9',
      'Find common denominator to combine fractions',
    ],
  },
  {
    id: 'p3q7',
    partId: 'part3',
    number: '7',
    title: 'Analyzing Standard Form Parabolas',
    questionText: 'For y = x² - 8x - 9: (a) find zeros, axis of symmetry, vertex (b) Is vertex max or min?',
    conceptExplanation: [
      'This parabola is in STANDARD FORM: y = ax² + bx + c.',
      'ZEROS: Set y = 0 and solve. Factor: x² - 8x - 9 = 0, or use quadratic formula.',
      'AXIS OF SYMMETRY: x = -b/(2a). This is the x-coordinate of the vertex.',
      'VERTEX: Substitute the axis of symmetry x-value back into the equation to find y.',
      'MAX or MIN: If a > 0, parabola opens up (minimum). If a < 0, opens down (maximum).',
    ],
    keyFormulas: [
      'Axis of symmetry: x = -b/(2a)',
      'Quadratic formula: x = (-b ± √(b²-4ac))/(2a)',
      'a > 0: minimum, a < 0: maximum',
    ],
    tips: [
      'For y = x² - 8x - 9: a=1, b=-8, c=-9',
      'Try factoring first: find two numbers that multiply to -9 and add to -8',
    ],
  },
  {
    id: 'p3q8',
    partId: 'part3',
    number: '8',
    title: 'Completing the Square',
    questionText: 'Change y = 5x² - 30x + 18 to vertex form by completing the square.',
    conceptExplanation: [
      'Completing the square converts standard form to vertex form.',
      'STEP 1: Factor out the coefficient of x² from the first two terms.',
      'STEP 2: Take half of the x-coefficient, square it, add AND subtract inside.',
      'STEP 3: Factor the perfect square trinomial.',
      'STEP 4: Simplify the constants.',
      'Result will be y = a(x-h)² + k.',
    ],
    keyFormulas: [
      'Standard: y = ax² + bx + c',
      'Vertex: y = a(x-h)² + k',
      'Add (b/2a)² inside, subtract a(b/2a)² outside',
    ],
    tips: [
      'Factor out the 5 first: y = 5(x² - 6x) + 18',
      'Half of -6 is -3, squared is 9',
      'Be careful with the coefficient when simplifying',
    ],
  },
  {
    id: 'p3q9',
    partId: 'part3',
    number: '9',
    title: 'Quadratic Applications - Projectile',
    questionText: 'Textbook launched: h = -t² + 8t + 9. (a) Initial height? (b) When does it land? (c) Maximum height and when?',
    conceptExplanation: [
      'This is a projectile motion problem modeled by a quadratic.',
      '(a) INITIAL HEIGHT: The height when t = 0. Substitute t = 0 into the equation.',
      '(b) LANDING TIME: When the object hits the ground, h = 0. Solve -t² + 8t + 9 = 0.',
      '(c) MAXIMUM HEIGHT: The vertex of the parabola. Since a < 0, the parabola opens down, so the vertex is the maximum.',
      'Find the vertex using t = -b/(2a), then substitute to find h.',
    ],
    keyFormulas: [
      'Initial value: substitute t = 0',
      'Zeros: solve h = 0',
      'Maximum: vertex at t = -b/(2a)',
    ],
    tips: [
      'Time must be positive (ignore negative solutions)',
      'Factor or use quadratic formula to find zeros',
    ],
  },
  {
    id: 'p3q10',
    partId: 'part3',
    number: '10',
    title: 'Quadratic Applications - Bridge Arch',
    questionText: 'Bridge arch: 18m wide, 10m high at center. (a) Write equation (b) Can 8m mast pass at 3m from center?',
    conceptExplanation: [
      'Model the arch as a parabola opening downward with vertex at the top.',
      '(a) Place the vertex at (0, 10) - center of arch, 10m high. The arch touches water at (-9, 0) and (9, 0).',
      'Use vertex form: y = a(x-h)² + k with vertex (0, 10).',
      'Substitute one zero point to find "a".',
      '(b) Substitute x = 3 into your equation to find the height at that point.',
      'If height > 8m, the boat can pass safely.',
    ],
    keyFormulas: [
      'Vertex form: y = a(x-h)² + k',
      'Set up with vertex at (0, 10)',
      'Zeros at x = ±9',
    ],
    tips: [
      'Draw a diagram with origin at center of arch',
      'Since arch is symmetric, zeros are at ±(width/2)',
    ],
  },

  // PART 4: Similarity and Trigonometry
  {
    id: 'p4q1',
    partId: 'part4',
    number: '1',
    title: 'Trigonometric Ratios',
    questionText: 'For the triangle with reference angle C (sides 3, 4, 5 cm), write sin C, cos C, tan C.',
    conceptExplanation: [
      'The three primary trigonometric ratios relate angles to side lengths in RIGHT triangles.',
      'SOH-CAH-TOA is the memory aid:',
      'SIN = Opposite / Hypotenuse',
      'COS = Adjacent / Hypotenuse',
      'TAN = Opposite / Adjacent',
      '"Opposite" and "Adjacent" are relative to the reference angle you are using.',
      'The hypotenuse is always the longest side (opposite the right angle).',
    ],
    keyFormulas: [
      'sin θ = opposite/hypotenuse',
      'cos θ = adjacent/hypotenuse',
      'tan θ = opposite/adjacent',
    ],
    tips: [
      'Identify which side is opposite to angle C',
      'Identify which side is adjacent to angle C (not the hypotenuse)',
      'The 5 cm side is the hypotenuse (longest)',
    ],
  },
  {
    id: 'p4q2',
    partId: 'part4',
    number: '2',
    title: 'Inverse Trigonometry',
    questionText: 'If tan A = 7/25, find the measure of angle A to the nearest degree.',
    conceptExplanation: [
      'When you know a trig ratio and need to find the angle, use the INVERSE function.',
      'tan A = 7/25 means A = tan⁻¹(7/25) or A = arctan(7/25).',
      'On your calculator, use the tan⁻¹ or arctan button.',
      'Make sure your calculator is in DEGREE mode, not radians!',
      'Round to the nearest degree as requested.',
    ],
    keyFormulas: [
      'If sin θ = x, then θ = sin⁻¹(x)',
      'If cos θ = x, then θ = cos⁻¹(x)',
      'If tan θ = x, then θ = tan⁻¹(x)',
    ],
    tips: [
      'Check calculator is in degree mode',
      'tan⁻¹(7/25) gives the angle in degrees',
    ],
  },
  {
    id: 'p4q3',
    partId: 'part4',
    number: '3',
    title: 'Solving Trig Equations',
    questionText: 'Calculate x: (a) sin 65° = x/13 (b) cos 31° = 15/x',
    conceptExplanation: [
      'These are equations where you need to solve for an unknown side.',
      '(a) sin 65° = x/13: Multiply both sides by 13 to isolate x. x = 13 × sin 65°.',
      '(b) cos 31° = 15/x: This means x × cos 31° = 15, so x = 15/cos 31°.',
      'Use your calculator to evaluate the trig functions.',
      'Round to one decimal place as specified.',
    ],
    keyFormulas: [
      'If sin θ = a/b, then a = b × sin θ',
      'If cos θ = a/b, then b = a/cos θ',
    ],
    tips: [
      'Isolate the variable first',
      'Make sure calculator is in degree mode',
    ],
  },
  {
    id: 'p4q4',
    partId: 'part4',
    number: '4',
    title: 'Primary Trig Functions Limitations',
    questionText: 'Can you use primary trig functions to solve all types of triangles? Explain.',
    conceptExplanation: [
      'PRIMARY trig functions (sin, cos, tan) only work directly in RIGHT triangles.',
      'For non-right triangles, you need the SINE LAW or COSINE LAW.',
      'Sine Law: a/sin A = b/sin B = c/sin C. Use when you have angle-side pairs.',
      'Cosine Law: c² = a² + b² - 2ab cos C. Use when you have SAS or SSS.',
      'So the answer is NO - primary trig alone cannot solve all triangles.',
    ],
    keyFormulas: [
      'SOH-CAH-TOA: only for right triangles',
      'Sine Law: a/sin A = b/sin B = c/sin C',
      'Cosine Law: c² = a² + b² - 2ab cos C',
    ],
    tips: [
      'Right triangle → use SOH-CAH-TOA',
      'Non-right triangle → use Sine Law or Cosine Law',
    ],
  },
  {
    id: 'p4q5',
    partId: 'part4',
    number: '5',
    title: 'Similar Triangles Application',
    questionText: 'Larry uses a mirror to find tree height. Larry is 1.2m tall, 0.9m from mirror, mirror is 20m from tree. Find tree height.',
    conceptExplanation: [
      'This is a SIMILAR TRIANGLES problem using reflection.',
      'When light reflects off a mirror, the angle of incidence equals the angle of reflection.',
      'This creates two similar triangles: one with Larry, one with the tree.',
      'Similar triangles have proportional sides.',
      'Set up a proportion: Larry\'s height/Larry\'s distance = Tree height/Tree\'s distance.',
    ],
    keyFormulas: [
      'Similar triangles: corresponding sides are proportional',
      'height₁/distance₁ = height₂/distance₂',
    ],
    tips: [
      'Draw a diagram showing both triangles',
      'Label all known measurements',
      '1.2/0.9 = tree height/20',
    ],
  },
  {
    id: 'p4q6',
    partId: 'part4',
    number: '6',
    title: 'Ladder Safety Problem',
    questionText: 'Ladder is 3.5m from wall base, reaches 8.4m up wall. Is it safe? (Safe angle: 70° to 80°)',
    conceptExplanation: [
      'This is a RIGHT TRIANGLE problem - the wall, ground, and ladder form a right triangle.',
      'You need to find the angle the ladder makes with the ground.',
      'You know the ADJACENT side (3.5m from wall) and the OPPOSITE side (8.4m up wall).',
      'Use TAN because you have opposite and adjacent: tan θ = opposite/adjacent.',
      'Then use inverse tan to find the angle and check if it is between 70° and 80°.',
    ],
    keyFormulas: [
      'tan θ = opposite/adjacent',
      'θ = tan⁻¹(opposite/adjacent)',
    ],
    tips: [
      'tan θ = 8.4/3.5',
      'Find θ using inverse tan',
      'Compare to the safe range 70°-80°',
    ],
  },
  {
    id: 'p4q7',
    partId: 'part4',
    number: '7',
    title: 'Solving Triangles',
    questionText: 'Solve for missing measures in various triangles: (a) right triangle (b) oblique with cosine law (c) oblique with sine law (d) given two angles and one side',
    conceptExplanation: [
      '(a) RIGHT TRIANGLE: Use SOH-CAH-TOA and Pythagorean theorem.',
      '(b) COSINE LAW case: Use when you have SAS (two sides and included angle) or SSS (three sides).',
      '(c) SINE LAW case: Use when you have AAS, ASA, or SSA (angle-side pairs).',
      '(d) TWO ANGLES GIVEN: Find the third angle (angles sum to 180°), then use Sine Law.',
      'Always identify what type of information you have before choosing a method.',
    ],
    keyFormulas: [
      'Pythagorean: a² + b² = c²',
      'Sine Law: a/sin A = b/sin B = c/sin C',
      'Cosine Law: c² = a² + b² - 2ab cos C',
      'Angles in triangle: A + B + C = 180°',
    ],
    tips: [
      'Draw the triangle and label all known values',
      'Identify if it is a right triangle first',
      'Choose the appropriate law based on given information',
    ],
  },
  {
    id: 'p4q8',
    partId: 'part4',
    number: '8',
    title: 'Similar Triangles Calculation',
    questionText: 'Solve for x and y in the similar triangles diagram (sides 3, 5, 12, 15, x, y cm).',
    conceptExplanation: [
      'Similar triangles have equal angles and proportional sides.',
      'First, identify which sides correspond to each other in the two triangles.',
      'Set up proportions using corresponding sides.',
      'The scale factor between similar triangles is the same for all corresponding pairs.',
      'Solve each proportion for the unknown.',
    ],
    keyFormulas: [
      'Corresponding sides: a₁/a₂ = b₁/b₂ = c₁/c₂',
      'Scale factor k: each side of larger = k × corresponding side of smaller',
    ],
    tips: [
      'Match corresponding sides carefully',
      'Find the scale factor first if possible',
      'Cross-multiply to solve proportions',
    ],
  },
  {
    id: 'p4q9',
    partId: 'part4',
    number: '9',
    title: 'Cosine Law Application',
    questionText: 'Measure distance across pond: from point A, distances to ends are 500m and 440m, angle between is 55°. Find pond width.',
    conceptExplanation: [
      'This is a classic COSINE LAW problem.',
      'You have two sides (500m and 440m) and the INCLUDED angle (55°).',
      'The distance across the pond is the third side of the triangle.',
      'Cosine Law: c² = a² + b² - 2ab cos C',
      'Substitute your values and solve for c (the pond width).',
    ],
    keyFormulas: [
      'Cosine Law: c² = a² + b² - 2ab cos C',
      'c = √(a² + b² - 2ab cos C)',
    ],
    tips: [
      'Draw the triangle with point A at the vertex of the 55° angle',
      'The pond width is opposite to the 55° angle',
      'c² = 500² + 440² - 2(500)(440)cos(55°)',
    ],
  },
];

export function getQuestionsByPart(partId: string): StudyQuestion[] {
  return studyQuestions.filter(q => q.partId === partId);
}

export function getPartById(partId: string): StudyPart | undefined {
  return studyParts.find(p => p.id === partId);
}
