import { Topic } from './types';

export const topics: Topic[] = [
  {
    id: '01-linear-equations',
    number: 1,
    name: 'Linear Equations & Slope',
    shortName: 'Linear Equations',
    description: 'Understanding the relationship between slope and y-intercept in linear equations',
    slug: 'linear-equations',
  },
  {
    id: '02-linear-systems',
    number: 2,
    name: 'Linear Systems',
    shortName: 'Linear Systems',
    description: 'Solving systems of two or more linear equations simultaneously',
    slug: 'linear-systems',
  },
  {
    id: '03-midpoint-distance',
    number: 3,
    name: 'Midpoint and Distance',
    shortName: 'Midpoint & Distance',
    description: 'Finding midpoints and calculating distances between points on a coordinate plane',
    slug: 'midpoint-distance',
  },
  {
    id: '04-equation-circle',
    number: 4,
    name: 'Equation of a Circle',
    shortName: 'Circle Equations',
    description: 'Understanding the standard form of circle equations and their properties',
    slug: 'equation-circle',
  },
  {
    id: '05-medians-altitudes',
    number: 5,
    name: 'Medians and Altitudes',
    shortName: 'Medians & Altitudes',
    description: 'Exploring special lines within triangles and their intersection points',
    slug: 'medians-altitudes',
  },
  {
    id: '06-triangle-centers',
    number: 6,
    name: 'Triangle Centers',
    shortName: 'Triangle Centers',
    description: 'Discovering the centroid, orthocenter, incenter, and circumcenter of triangles',
    slug: 'triangle-centers',
  },
  {
    id: '07-classifying-shapes',
    number: 7,
    name: 'Classifying Shapes',
    shortName: 'Shape Classification',
    description: 'Identifying and categorizing geometric shapes by their properties',
    slug: 'classifying-shapes',
  },
  {
    id: '08-congruence-similarity',
    number: 8,
    name: 'Congruence and Similarity',
    shortName: 'Congruence & Similarity',
    description: 'Understanding when shapes are identical or proportionally scaled',
    slug: 'congruence-similarity',
  },
  {
    id: '09-right-triangle-ratios',
    number: 9,
    name: 'Right Triangle Ratios (Trig)',
    shortName: 'Trig Ratios',
    description: 'Using sine, cosine, and tangent to solve right triangle problems',
    slug: 'right-triangle-ratios',
  },
  {
    id: '10-non-right-trig',
    number: 10,
    name: 'Non-Right Angle Trig',
    shortName: 'Non-Right Trig',
    description: 'Applying the Law of Sines and Law of Cosines to any triangle',
    slug: 'non-right-trig',
  },
  {
    id: '11-exponent-laws',
    number: 11,
    name: 'Exponent Laws',
    shortName: 'Exponent Laws',
    description: 'Mastering the rules for multiplying, dividing, and raising powers',
    slug: 'exponent-laws',
  },
  {
    id: '12-expanding-factoring',
    number: 12,
    name: 'Expanding and Factoring',
    shortName: 'Expand & Factor',
    description: 'Distributing and factoring polynomial expressions',
    slug: 'expanding-factoring',
  },
  {
    id: '13-factoring-trinomials',
    number: 13,
    name: 'Factoring Trinomials',
    shortName: 'Factor Trinomials',
    description: 'Breaking down quadratic expressions into binomial factors',
    slug: 'factoring-trinomials',
  },
  {
    id: '14-difference-of-squares',
    number: 14,
    name: 'Difference of Squares',
    shortName: 'Difference of Squares',
    description: 'Recognizing and factoring expressions in the form a² - b²',
    slug: 'difference-of-squares',
  },
  {
    id: '15-quadratics-vertex',
    number: 15,
    name: 'Quadratics Vertex Form',
    shortName: 'Vertex Form',
    description: 'Understanding parabolas through the vertex form of quadratic equations',
    slug: 'quadratics-vertex',
  },
  {
    id: '16-completing-the-square',
    number: 16,
    name: 'Completing the Square',
    shortName: 'Complete the Square',
    description: 'Transforming quadratic equations to find the vertex',
    slug: 'completing-the-square',
  },
  {
    id: '17-quadratic-formula',
    number: 17,
    name: 'Quadratic Formula',
    shortName: 'Quadratic Formula',
    description: 'Using the universal formula to solve any quadratic equation',
    slug: 'quadratic-formula',
  },
];

export const getTopicById = (id: string): Topic | undefined => {
  return topics.find(t => t.id === id);
};

export const getTopicBySlug = (slug: string): Topic | undefined => {
  return topics.find(t => t.slug === slug);
};
