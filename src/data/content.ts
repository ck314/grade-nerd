import { TopicContent, ELI5Content } from './types';

// Helper to get image path
const getImagePath = (topicSlug: string, interest: string): string => {
  return `/grade-nerd/images/topics/${topicSlug}-${interest}.png`;
};

// All topic content organized by topic ID and interest ID
export const topicContent: Record<string, Record<string, TopicContent>> = {
  '01-linear-equations': {
    economics: {
      topicId: '01-linear-equations',
      interestId: 'economics',
      title: 'Economics (Cost Functions)',
      sections: [
        {
          type: 'paragraph',
          content: 'In business, the total cost of producing goods can be modeled with a linear equation. There is a fixed cost (like rent for the factory) that you must pay even if you produce nothing. This is the y-intercept (b). There is also a variable cost (like materials for one item) that increases with every item you make. This is the slope (m), or the rate of change of cost.',
        },
        {
          type: 'formula',
          content: 'Total Cost (C) = (Variable Cost per Item) × (Number of Items) + Fixed Costs\nC(x) = mx + b',
        },
        {
          type: 'example',
          content: 'A company starts a new clothing line. The machinery and design cost a one-time fee of $5,000. Each t-shirt costs an additional $8 in materials and labor to produce. Write the linear equation for the total production cost and calculate the cost of producing the first 200 t-shirts.',
        },
        {
          type: 'calculation',
          content: 'Identify variables: The slope (m) is the cost per shirt, so m = 8. The y-intercept (b) is the fixed cost, so b = 5000.',
          steps: [
            'Write the equation: C(x) = 8x + 5000',
            'Solve for x = 200: C(200) = 8(200) + 5000',
            'C(200) = 1600 + 5000 = 6600',
          ],
        },
        {
          type: 'conclusion',
          content: 'The total cost to produce 200 t-shirts is $6,600.',
        },
      ],
      imagePath: getImagePath('01-linear-equations', 'economics'),
    },
    physics: {
      topicId: '01-linear-equations',
      interestId: 'physics',
      title: 'Physics (Constant Velocity Motion)',
      sections: [
        {
          type: 'paragraph',
          content: "An object moving at a constant speed has a position that can be described by a linear equation. The object's velocity (speed in a certain direction) is the slope (m), representing the rate at which its position changes over time. Its initial position is the y-intercept (b).",
        },
        {
          type: 'formula',
          content: 'Position (d) = Velocity × time + Initial Position\nd(t) = vt + d₀',
        },
        {
          type: 'example',
          content: "A train leaves a station and travels down a straight track at a constant velocity of 120 km/h. The station is located 50 km away from the central city hub. Write a linear equation to model the train's distance from the city hub and find its distance after 2.5 hours.",
        },
        {
          type: 'calculation',
          content: 'Identify variables: The slope (v) is the velocity, so v = 120. The y-intercept (d₀) is the starting distance, so d₀ = 50.',
          steps: [
            'Write the equation: d(t) = 120t + 50',
            'Solve for t = 2.5: d(2.5) = 120(2.5) + 50',
            'd(2.5) = 300 + 50 = 350',
          ],
        },
        {
          type: 'conclusion',
          content: 'After 2.5 hours, the train is 350 km away from the city hub.',
        },
      ],
      imagePath: getImagePath('01-linear-equations', 'physics'),
    },
    'neural-networks': {
      topicId: '01-linear-equations',
      interestId: 'neural-networks',
      title: 'Neural Networks (A Simple Neuron)',
      sections: [
        {
          type: 'paragraph',
          content: 'The most basic component of a neural network is a neuron. In its simplest form, a neuron takes a single input number, multiplies it by a weight, and adds a bias. This is a perfect linear equation. The weight acts as the slope (m), determining how influential the input is. The bias acts as the y-intercept (b), shifting the output up or down.',
        },
        {
          type: 'formula',
          content: 'Output (y) = weight × input + bias\ny = wx + b',
        },
        {
          type: 'example',
          content: "Imagine a very simple neural network designed to convert Celsius to Fahrenheit. A neuron in this network takes a temperature in Celsius as its input (x). It has a learned weight (w) of 1.7 and a bias (b) of 30. If the input temperature is 25°C, what is the neuron's output?",
        },
        {
          type: 'calculation',
          content: 'Identify variables: The weight (w) is the slope, so w = 1.7. The bias (b) is the y-intercept, so b = 30.',
          steps: [
            'Write the equation: y = 1.7x + 30',
            'Solve for x = 25: y = 1.7(25) + 30',
            'y = 42.5 + 30 = 72.5',
          ],
        },
        {
          type: 'conclusion',
          content: "The neuron's output is 72.5. (Note: The actual formula is F = 1.8C + 32, so this neuron is close but not perfect, and the network would continue learning to adjust its weight and bias).",
        },
      ],
      imagePath: getImagePath('01-linear-equations', 'neural-networks'),
    },
  },
  '02-linear-systems': {
    economics: {
      topicId: '02-linear-systems',
      interestId: 'economics',
      title: 'Economics (Supply and Demand)',
      sections: [
        {
          type: 'paragraph',
          content: 'In economics, supply and demand curves are often modeled as linear equations. The point where they intersect is the equilibrium point - where the market naturally settles. Solving a system of linear equations helps find this balance point.',
        },
        {
          type: 'formula',
          content: 'Supply: Qs = ms × P + bs\nDemand: Qd = md × P + bd\nAt equilibrium: Qs = Qd',
        },
        {
          type: 'example',
          content: 'A market for widgets has supply equation Qs = 2P - 10 and demand equation Qd = -P + 50. Find the equilibrium price and quantity.',
        },
        {
          type: 'calculation',
          content: 'Set the equations equal to find where supply meets demand.',
          steps: [
            '2P - 10 = -P + 50',
            '3P = 60',
            'P = 20 (equilibrium price)',
            'Q = 2(20) - 10 = 30 (equilibrium quantity)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The market reaches equilibrium at a price of $20 with 30 widgets traded.',
        },
      ],
      imagePath: getImagePath('02-linear-systems', 'economics'),
    },
    physics: {
      topicId: '02-linear-systems',
      interestId: 'physics',
      title: 'Physics (Collision Points)',
      sections: [
        {
          type: 'paragraph',
          content: 'When two objects move in paths that can be described by linear equations, solving a system of equations helps find if and when they will meet. This is crucial for physics problems involving intersecting trajectories.',
        },
        {
          type: 'formula',
          content: 'Object 1: y = m₁x + b₁\nObject 2: y = m₂x + b₂\nIntersection: m₁x + b₁ = m₂x + b₂',
        },
        {
          type: 'example',
          content: 'A drone moves along path y = 2x + 3 and a bird follows path y = -x + 12. At what point will their paths cross?',
        },
        {
          type: 'calculation',
          content: 'Set the two path equations equal.',
          steps: [
            '2x + 3 = -x + 12',
            '3x = 9',
            'x = 3',
            'y = 2(3) + 3 = 9',
          ],
        },
        {
          type: 'conclusion',
          content: 'The paths intersect at point (3, 9).',
        },
      ],
      imagePath: getImagePath('02-linear-systems', 'physics'),
    },
    'neural-networks': {
      topicId: '02-linear-systems',
      interestId: 'neural-networks',
      title: 'Neural Networks (Multiple Neurons)',
      sections: [
        {
          type: 'paragraph',
          content: 'A neural network layer with multiple neurons processes inputs simultaneously. Each neuron creates a linear equation with its own weights and biases. Understanding how these systems work together is like solving a system of linear equations.',
        },
        {
          type: 'formula',
          content: 'Neuron 1: y₁ = w₁x + b₁\nNeuron 2: y₂ = w₂x + b₂\nCombined output depends on both neurons',
        },
        {
          type: 'example',
          content: 'Two neurons in a network process the same input x. Neuron 1 has equation y₁ = 3x + 1, and Neuron 2 has y₂ = x + 5. For what input value do both neurons produce the same output?',
        },
        {
          type: 'calculation',
          content: 'Set the neuron outputs equal.',
          steps: [
            '3x + 1 = x + 5',
            '2x = 4',
            'x = 2',
            'Both output: 3(2) + 1 = 7',
          ],
        },
        {
          type: 'conclusion',
          content: 'When the input is 2, both neurons output 7, demonstrating how different weight configurations can converge.',
        },
      ],
      imagePath: getImagePath('02-linear-systems', 'neural-networks'),
    },
  },
  '03-midpoint-distance': {
    economics: {
      topicId: '03-midpoint-distance',
      interestId: 'economics',
      title: 'Economics (Market Analysis)',
      sections: [
        {
          type: 'paragraph',
          content: 'In business location planning, the midpoint formula helps find optimal placement between two markets. The distance formula measures how far apart market conditions or economic indicators are.',
        },
        {
          type: 'formula',
          content: 'Midpoint: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)\nDistance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]',
        },
        {
          type: 'example',
          content: 'Two retail stores are located at coordinates (2, 3) and (8, 11) on a city map. Find the midpoint for a new distribution center and the distance between the stores.',
        },
        {
          type: 'calculation',
          content: 'Apply the midpoint and distance formulas.',
          steps: [
            'Midpoint: ((2+8)/2, (3+11)/2) = (5, 7)',
            'Distance: √[(8-2)² + (11-3)²]',
            'd = √[36 + 64] = √100 = 10 units',
          ],
        },
        {
          type: 'conclusion',
          content: 'The optimal location for the distribution center is (5, 7), with stores 10 units apart.',
        },
      ],
      imagePath: getImagePath('03-midpoint-distance', 'economics'),
    },
    physics: {
      topicId: '03-midpoint-distance',
      interestId: 'physics',
      title: 'Physics (Center of Mass)',
      sections: [
        {
          type: 'paragraph',
          content: 'In physics, the midpoint formula is used to find the center of mass between two objects of equal mass. The distance formula calculates the separation between particles or objects in space.',
        },
        {
          type: 'formula',
          content: 'Center of Mass (equal masses): M = ((x₁ + x₂)/2, (y₁ + y₂)/2)\nSeparation: d = √[(x₂ - x₁)² + (y₂ - y₁)²]',
        },
        {
          type: 'example',
          content: 'Two equal-mass particles are located at (1, 4) and (7, 12). Find their center of mass and the distance between them.',
        },
        {
          type: 'calculation',
          content: 'Apply the formulas for center of mass and distance.',
          steps: [
            'Center: ((1+7)/2, (4+12)/2) = (4, 8)',
            'Distance: √[(7-1)² + (12-4)²]',
            'd = √[36 + 64] = √100 = 10 units',
          ],
        },
        {
          type: 'conclusion',
          content: 'The center of mass is at (4, 8), with particles 10 units apart.',
        },
      ],
      imagePath: getImagePath('03-midpoint-distance', 'physics'),
    },
    'neural-networks': {
      topicId: '03-midpoint-distance',
      interestId: 'neural-networks',
      title: 'Neural Networks (Data Clustering)',
      sections: [
        {
          type: 'paragraph',
          content: 'In machine learning, distance calculations are fundamental for clustering algorithms. K-means clustering uses midpoints (centroids) to group similar data points together.',
        },
        {
          type: 'formula',
          content: 'Euclidean Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]\nCentroid: The average position of all points in a cluster',
        },
        {
          type: 'example',
          content: 'A neural network processes images represented as 2D feature vectors. Two images have features at (3, 5) and (9, 13). Calculate the distance between them and find the centroid.',
        },
        {
          type: 'calculation',
          content: 'Calculate distance and midpoint for the cluster center.',
          steps: [
            'Distance: √[(9-3)² + (13-5)²]',
            'd = √[36 + 64] = √100 = 10',
            'Centroid: ((3+9)/2, (5+13)/2) = (6, 9)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The images are 10 units apart in feature space, with their cluster centroid at (6, 9).',
        },
      ],
      imagePath: getImagePath('03-midpoint-distance', 'neural-networks'),
    },
  },
  '04-equation-circle': {
    economics: {
      topicId: '04-equation-circle',
      interestId: 'economics',
      title: 'Economics (Market Reach)',
      sections: [
        {
          type: 'paragraph',
          content: 'The equation of a circle helps businesses define their service area or market reach. A store at a central location with a certain delivery radius creates a circular coverage zone.',
        },
        {
          type: 'formula',
          content: 'Standard Form: (x - h)² + (y - k)² = r²\nCenter: (h, k), Radius: r',
        },
        {
          type: 'example',
          content: 'A pizza delivery service is centered at coordinates (5, 3) and delivers within a 7-mile radius. Write the equation representing their delivery zone.',
        },
        {
          type: 'calculation',
          content: 'Identify the center and radius, then write the equation.',
          steps: [
            'Center (h, k) = (5, 3)',
            'Radius r = 7',
            'Equation: (x - 5)² + (y - 3)² = 49',
          ],
        },
        {
          type: 'conclusion',
          content: 'Any address satisfying (x - 5)² + (y - 3)² ≤ 49 is within the delivery zone.',
        },
      ],
      imagePath: getImagePath('04-equation-circle', 'economics'),
    },
    physics: {
      topicId: '04-equation-circle',
      interestId: 'physics',
      title: 'Physics (Circular Motion)',
      sections: [
        {
          type: 'paragraph',
          content: 'Objects in circular motion, like planets or satellites, follow paths that can be described by circle equations. The center represents the orbit focus, and the radius represents the orbital distance.',
        },
        {
          type: 'formula',
          content: 'Orbital Path: (x - h)² + (y - k)² = r²\nCenter of orbit: (h, k), Orbital radius: r',
        },
        {
          type: 'example',
          content: 'A satellite orbits Earth in a circular path. If Earth is at coordinates (0, 0) and the satellite maintains an orbital radius of 10,000 km, write the equation of its orbit.',
        },
        {
          type: 'calculation',
          content: 'With Earth at the origin, the satellite orbit equation is straightforward.',
          steps: [
            'Center (h, k) = (0, 0)',
            'Radius r = 10,000',
            'Equation: x² + y² = 100,000,000',
          ],
        },
        {
          type: 'conclusion',
          content: 'The satellite follows the circular path x² + y² = 100,000,000 km².',
        },
      ],
      imagePath: getImagePath('04-equation-circle', 'physics'),
    },
    'neural-networks': {
      topicId: '04-equation-circle',
      interestId: 'neural-networks',
      title: 'Neural Networks (Decision Boundaries)',
      sections: [
        {
          type: 'paragraph',
          content: 'In classification, neural networks sometimes create circular decision boundaries to separate different classes of data. Points inside the circle belong to one class, points outside to another.',
        },
        {
          type: 'formula',
          content: 'Decision Boundary: (x - h)² + (y - k)² = r²\nInside (< r²): Class A, Outside (> r²): Class B',
        },
        {
          type: 'example',
          content: 'A neural network classifies data points. It learns a circular boundary centered at (2, 2) with radius 3. Determine if point (4, 4) is inside or outside this boundary.',
        },
        {
          type: 'calculation',
          content: 'Calculate the distance from the point to the center.',
          steps: [
            'Distance² = (4-2)² + (4-2)²',
            'Distance² = 4 + 4 = 8',
            'Compare: 8 < 9 (radius²)',
          ],
        },
        {
          type: 'conclusion',
          content: 'Since 8 < 9, the point (4, 4) is inside the circular boundary and classified as Class A.',
        },
      ],
      imagePath: getImagePath('04-equation-circle', 'neural-networks'),
    },
  },
  '05-medians-altitudes': {
    economics: {
      topicId: '05-medians-altitudes',
      interestId: 'economics',
      title: 'Economics (Resource Distribution)',
      sections: [
        {
          type: 'paragraph',
          content: 'Medians in triangles can represent optimal distribution paths to the center of a market region. The centroid (where medians meet) represents the most balanced distribution point.',
        },
        {
          type: 'formula',
          content: 'Centroid: G = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)\nMedian connects a vertex to the midpoint of the opposite side',
        },
        {
          type: 'example',
          content: 'Three warehouses form a triangle at coordinates A(0, 0), B(6, 0), and C(3, 6). Find the optimal central hub location (centroid).',
        },
        {
          type: 'calculation',
          content: 'Calculate the centroid using the average of coordinates.',
          steps: [
            'x-coordinate: (0 + 6 + 3)/3 = 3',
            'y-coordinate: (0 + 0 + 6)/3 = 2',
            'Centroid: (3, 2)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The optimal hub location is at (3, 2), minimizing total distribution distance.',
        },
      ],
      imagePath: getImagePath('05-medians-altitudes', 'economics'),
    },
    physics: {
      topicId: '05-medians-altitudes',
      interestId: 'physics',
      title: 'Physics (Center of Mass)',
      sections: [
        {
          type: 'paragraph',
          content: 'The centroid of a triangle represents the center of mass for a uniform triangular plate. This point is where the object would balance perfectly on a single point.',
        },
        {
          type: 'formula',
          content: 'Center of Mass: G = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)\nThe centroid divides each median in ratio 2:1',
        },
        {
          type: 'example',
          content: 'A triangular metal plate has vertices at A(0, 0), B(12, 0), and C(6, 9). Find its center of mass.',
        },
        {
          type: 'calculation',
          content: 'Apply the centroid formula.',
          steps: [
            'x-coordinate: (0 + 12 + 6)/3 = 6',
            'y-coordinate: (0 + 0 + 9)/3 = 3',
            'Center of mass: (6, 3)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The triangular plate would balance at point (6, 3).',
        },
      ],
      imagePath: getImagePath('05-medians-altitudes', 'physics'),
    },
    'neural-networks': {
      topicId: '05-medians-altitudes',
      interestId: 'neural-networks',
      title: 'Neural Networks (Feature Averaging)',
      sections: [
        {
          type: 'paragraph',
          content: 'When processing triangular data structures in neural networks, finding the centroid helps create representative feature vectors. This is similar to pooling operations that reduce data dimensions.',
        },
        {
          type: 'formula',
          content: 'Feature Centroid: F = ((f₁+f₂+f₃)/3)\nRepresentative point for a cluster of three features',
        },
        {
          type: 'example',
          content: 'Three data points in feature space are located at (1, 2), (4, 5), and (7, 2). Find their representative centroid feature.',
        },
        {
          type: 'calculation',
          content: 'Average the coordinates of all three points.',
          steps: [
            'x-coordinate: (1 + 4 + 7)/3 = 4',
            'y-coordinate: (2 + 5 + 2)/3 = 3',
            'Centroid feature: (4, 3)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The centroid (4, 3) represents the average features of the three data points.',
        },
      ],
      imagePath: getImagePath('05-medians-altitudes', 'neural-networks'),
    },
  },
  '06-triangle-centers': {
    economics: {
      topicId: '06-triangle-centers',
      interestId: 'economics',
      title: 'Economics (Optimal Locations)',
      sections: [
        {
          type: 'paragraph',
          content: 'Different triangle centers serve different optimization goals in economics. The centroid minimizes average distance, while the circumcenter equidistant to all vertices might represent fair coverage.',
        },
        {
          type: 'formula',
          content: 'Centroid: Average of vertices\nCircumcenter: Equidistant from all vertices\nIncenter: Equidistant from all sides',
        },
        {
          type: 'example',
          content: 'A company has three offices. For fair access, they want a meeting location equidistant from all offices at A(0, 0), B(8, 0), and C(4, 6). Find the circumcenter.',
        },
        {
          type: 'calculation',
          content: 'Find the intersection of perpendicular bisectors.',
          steps: [
            'Midpoint of AB: (4, 0), perpendicular bisector: x = 4',
            'Midpoint of AC: (2, 3), slope of AC = 6/4 = 3/2',
            'Perpendicular slope: -2/3',
            'Circumcenter: (4, 3)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The meeting location at (4, 3) is equidistant from all three offices.',
        },
      ],
      imagePath: getImagePath('06-triangle-centers', 'economics'),
    },
    physics: {
      topicId: '06-triangle-centers',
      interestId: 'physics',
      title: 'Physics (Balance Points)',
      sections: [
        {
          type: 'paragraph',
          content: 'Triangle centers have physical significance. The centroid is the balance point, while the orthocenter relates to how forces interact at perpendicular angles.',
        },
        {
          type: 'formula',
          content: 'Centroid: Balance point for uniform mass\nOrthocenter: Intersection of altitudes',
        },
        {
          type: 'example',
          content: 'A triangular structure with vertices at A(0, 0), B(6, 0), and C(3, 4) needs a support pillar. Find the centroid for the support location.',
        },
        {
          type: 'calculation',
          content: 'Calculate the centroid coordinates.',
          steps: [
            'x: (0 + 6 + 3)/3 = 3',
            'y: (0 + 0 + 4)/3 = 4/3 ≈ 1.33',
            'Centroid: (3, 1.33)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The support pillar should be placed at (3, 1.33) for perfect balance.',
        },
      ],
      imagePath: getImagePath('06-triangle-centers', 'physics'),
    },
    'neural-networks': {
      topicId: '06-triangle-centers',
      interestId: 'neural-networks',
      title: 'Neural Networks (Cluster Centers)',
      sections: [
        {
          type: 'paragraph',
          content: 'Different triangle center concepts apply to clustering in machine learning. Choosing the right center type affects how the network groups and classifies data.',
        },
        {
          type: 'formula',
          content: 'Centroid: Mean of all points (most common)\nMedoid: Actual data point closest to center',
        },
        {
          type: 'example',
          content: 'Three data points form a cluster at (1, 1), (5, 1), and (3, 4). Find the centroid to represent this cluster.',
        },
        {
          type: 'calculation',
          content: 'Average the coordinates.',
          steps: [
            'x: (1 + 5 + 3)/3 = 3',
            'y: (1 + 1 + 4)/3 = 2',
            'Cluster center: (3, 2)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The cluster is represented by its centroid at (3, 2).',
        },
      ],
      imagePath: getImagePath('06-triangle-centers', 'neural-networks'),
    },
  },
  '07-classifying-shapes': {
    economics: {
      topicId: '07-classifying-shapes',
      interestId: 'economics',
      title: 'Economics (Market Segmentation)',
      sections: [
        {
          type: 'paragraph',
          content: 'Just as we classify shapes by properties, economists classify markets by characteristics. Understanding shape properties helps in geographic market analysis and facility planning.',
        },
        {
          type: 'formula',
          content: 'Classification by sides: Triangle (3), Quadrilateral (4), Pentagon (5)\nClassification by properties: Regular (equal sides/angles), Irregular',
        },
        {
          type: 'example',
          content: 'A retail chain analyzes four store locations forming a quadrilateral with coordinates A(0,0), B(4,0), C(4,3), D(0,3). Classify this shape and its properties.',
        },
        {
          type: 'calculation',
          content: 'Calculate side lengths and angles.',
          steps: [
            'AB = 4, BC = 3, CD = 4, DA = 3',
            'Opposite sides equal: Rectangle',
            'All angles = 90°',
          ],
        },
        {
          type: 'conclusion',
          content: 'The stores form a rectangle, indicating a structured market grid pattern.',
        },
      ],
      imagePath: getImagePath('07-classifying-shapes', 'economics'),
    },
    physics: {
      topicId: '07-classifying-shapes',
      interestId: 'physics',
      title: 'Physics (Crystal Structures)',
      sections: [
        {
          type: 'paragraph',
          content: 'Atoms in crystals arrange themselves in specific geometric patterns. Understanding shape classification helps physicists predict material properties.',
        },
        {
          type: 'formula',
          content: 'Regular shapes: Equal sides and angles\nSymmetry determines physical properties',
        },
        {
          type: 'example',
          content: 'Carbon atoms in graphene form hexagonal patterns. Verify that a hexagon with all sides equal and all angles equal is regular.',
        },
        {
          type: 'calculation',
          content: 'Check hexagon properties.',
          steps: [
            '6 equal sides: Regular',
            'Interior angle = (6-2)×180°/6 = 120°',
            'All angles = 120°: Regular',
          ],
        },
        {
          type: 'conclusion',
          content: 'Graphene has a regular hexagonal structure, explaining its unique strength properties.',
        },
      ],
      imagePath: getImagePath('07-classifying-shapes', 'physics'),
    },
    'neural-networks': {
      topicId: '07-classifying-shapes',
      interestId: 'neural-networks',
      title: 'Neural Networks (Shape Recognition)',
      sections: [
        {
          type: 'paragraph',
          content: 'Neural networks learn to classify shapes by identifying key features: number of sides, angles, symmetry. This is fundamental to computer vision applications.',
        },
        {
          type: 'formula',
          content: 'Feature extraction: Count vertices, measure angles\nClassification: Map features to shape categories',
        },
        {
          type: 'example',
          content: 'A neural network detects a shape with 4 vertices and 4 right angles. What shape should it classify this as?',
        },
        {
          type: 'calculation',
          content: 'Apply classification rules.',
          steps: [
            '4 vertices → Quadrilateral',
            '4 right angles → Rectangle (or Square)',
            'Check side lengths for final classification',
          ],
        },
        {
          type: 'conclusion',
          content: 'The network classifies this as a rectangle (or square if all sides equal).',
        },
      ],
      imagePath: getImagePath('07-classifying-shapes', 'neural-networks'),
    },
  },
  '08-congruence-similarity': {
    economics: {
      topicId: '08-congruence-similarity',
      interestId: 'economics',
      title: 'Economics (Scaling Business Models)',
      sections: [
        {
          type: 'paragraph',
          content: 'Similar shapes maintain proportions when scaled - just like business models that can be replicated at different sizes while keeping the same ratios of resources.',
        },
        {
          type: 'formula',
          content: 'Similar: Same shape, proportional sides\nCongruent: Identical in every way\nScale factor: ratio of corresponding sides',
        },
        {
          type: 'example',
          content: 'A successful store has dimensions 20m × 30m. A new location needs similar proportions but in a space 30m wide. How long should it be?',
        },
        {
          type: 'calculation',
          content: 'Find the scale factor and apply it.',
          steps: [
            'Scale factor = 30/20 = 1.5',
            'New length = 30 × 1.5 = 45m',
            'New store: 30m × 45m',
          ],
        },
        {
          type: 'conclusion',
          content: 'The new store should be 30m × 45m to maintain similar proportions.',
        },
      ],
      imagePath: getImagePath('08-congruence-similarity', 'economics'),
    },
    physics: {
      topicId: '08-congruence-similarity',
      interestId: 'physics',
      title: 'Physics (Scale Models)',
      sections: [
        {
          type: 'paragraph',
          content: 'Physicists use similar shapes to create scale models for testing. The proportional relationships let them predict how full-size objects will behave.',
        },
        {
          type: 'formula',
          content: 'Similar triangles: corresponding angles equal, sides proportional\nScale factor k: all dimensions multiplied by k',
        },
        {
          type: 'example',
          content: 'A model airplane is built at 1:20 scale. If the model wing is 15cm, how long is the real wing?',
        },
        {
          type: 'calculation',
          content: 'Apply the scale factor.',
          steps: [
            'Scale factor = 20',
            'Real wing = 15cm × 20 = 300cm',
            '300cm = 3 meters',
          ],
        },
        {
          type: 'conclusion',
          content: 'The real airplane has a 3-meter wing.',
        },
      ],
      imagePath: getImagePath('08-congruence-similarity', 'physics'),
    },
    'neural-networks': {
      topicId: '08-congruence-similarity',
      interestId: 'neural-networks',
      title: 'Neural Networks (Scale Invariance)',
      sections: [
        {
          type: 'paragraph',
          content: 'Neural networks must recognize objects regardless of their size in an image. Understanding similarity helps networks achieve scale invariance - recognizing a cat whether its close or far from the camera.',
        },
        {
          type: 'formula',
          content: 'Scale invariance: Same object recognition at different sizes\nFeatures should be proportional, not absolute',
        },
        {
          type: 'example',
          content: 'A neural network trained on 100×100 pixel images needs to recognize objects in a 200×200 image. What scale factor is applied?',
        },
        {
          type: 'calculation',
          content: 'Calculate the scaling needed.',
          steps: [
            'Scale factor = 200/100 = 2',
            'All features appear 2× larger',
            'Network must normalize for size',
          ],
        },
        {
          type: 'conclusion',
          content: 'The network applies 2× scaling to match features regardless of image size.',
        },
      ],
      imagePath: getImagePath('08-congruence-similarity', 'neural-networks'),
    },
  },
  '09-right-triangle-ratios': {
    economics: {
      topicId: '09-right-triangle-ratios',
      interestId: 'economics',
      title: 'Economics (Growth Projections)',
      sections: [
        {
          type: 'paragraph',
          content: 'Trigonometric ratios help analyze angles of growth or decline in business charts. The slope of a trend line can be expressed using tangent.',
        },
        {
          type: 'formula',
          content: 'tan(θ) = opposite/adjacent = rise/run\nsin(θ) = opposite/hypotenuse\ncos(θ) = adjacent/hypotenuse',
        },
        {
          type: 'example',
          content: 'A sales graph shows revenue rising 40 units over 100 units of time. What angle does this growth line make with the horizontal?',
        },
        {
          type: 'calculation',
          content: 'Use tangent to find the angle.',
          steps: [
            'tan(θ) = 40/100 = 0.4',
            'θ = arctan(0.4)',
            'θ ≈ 21.8°',
          ],
        },
        {
          type: 'conclusion',
          content: 'The growth trend line rises at approximately 21.8° from horizontal.',
        },
      ],
      imagePath: getImagePath('09-right-triangle-ratios', 'economics'),
    },
    physics: {
      topicId: '09-right-triangle-ratios',
      interestId: 'physics',
      title: 'Physics (Projectile Motion)',
      sections: [
        {
          type: 'paragraph',
          content: 'When analyzing projectile motion, trigonometry breaks velocity into horizontal and vertical components using sine and cosine.',
        },
        {
          type: 'formula',
          content: 'Horizontal velocity: vₓ = v × cos(θ)\nVertical velocity: vᵧ = v × sin(θ)',
        },
        {
          type: 'example',
          content: 'A ball is thrown at 50 m/s at an angle of 30° above horizontal. Find its horizontal and vertical velocity components.',
        },
        {
          type: 'calculation',
          content: 'Apply the component formulas.',
          steps: [
            'vₓ = 50 × cos(30°) = 50 × 0.866 ≈ 43.3 m/s',
            'vᵧ = 50 × sin(30°) = 50 × 0.5 = 25 m/s',
          ],
        },
        {
          type: 'conclusion',
          content: 'The ball travels at 43.3 m/s horizontally and 25 m/s vertically.',
        },
      ],
      imagePath: getImagePath('09-right-triangle-ratios', 'physics'),
    },
    'neural-networks': {
      topicId: '09-right-triangle-ratios',
      interestId: 'neural-networks',
      title: 'Neural Networks (Activation Functions)',
      sections: [
        {
          type: 'paragraph',
          content: 'Some neural network activation functions are based on trigonometric functions. The sine and cosine functions help model periodic patterns in data.',
        },
        {
          type: 'formula',
          content: 'Sine activation: output = sin(input)\nUsed for periodic data patterns',
        },
        {
          type: 'example',
          content: 'A neural network uses sin(x) as an activation function. If the input to a neuron is π/6 (30°), what is the output?',
        },
        {
          type: 'calculation',
          content: 'Apply the sine function.',
          steps: [
            'input = π/6 = 30°',
            'sin(30°) = 0.5',
            'output = 0.5',
          ],
        },
        {
          type: 'conclusion',
          content: 'The neuron outputs 0.5, demonstrating how trig functions transform inputs.',
        },
      ],
      imagePath: getImagePath('09-right-triangle-ratios', 'neural-networks'),
    },
  },
  '10-non-right-trig': {
    economics: {
      topicId: '10-non-right-trig',
      interestId: 'economics',
      title: 'Economics (Market Triangle Analysis)',
      sections: [
        {
          type: 'paragraph',
          content: 'When analyzing relationships between three markets or products, the Law of Cosines and Sines help calculate distances and angles in non-right triangle configurations.',
        },
        {
          type: 'formula',
          content: 'Law of Cosines: c² = a² + b² - 2ab×cos(C)\nLaw of Sines: a/sin(A) = b/sin(B) = c/sin(C)',
        },
        {
          type: 'example',
          content: 'Three cities form a triangle. City A to B is 100km, B to C is 80km, and the angle at B is 60°. Find the distance from A to C.',
        },
        {
          type: 'calculation',
          content: 'Apply the Law of Cosines.',
          steps: [
            'AC² = 100² + 80² - 2(100)(80)cos(60°)',
            'AC² = 10000 + 6400 - 16000(0.5)',
            'AC² = 16400 - 8000 = 8400',
            'AC = √8400 ≈ 91.7 km',
          ],
        },
        {
          type: 'conclusion',
          content: 'The distance from City A to City C is approximately 91.7 km.',
        },
      ],
      imagePath: getImagePath('10-non-right-trig', 'economics'),
    },
    physics: {
      topicId: '10-non-right-trig',
      interestId: 'physics',
      title: 'Physics (Force Vectors)',
      sections: [
        {
          type: 'paragraph',
          content: 'When forces act at angles that dont form right triangles, the Law of Cosines helps find the resultant force magnitude.',
        },
        {
          type: 'formula',
          content: 'Resultant: R² = F₁² + F₂² - 2F₁F₂cos(180° - θ)\nwhere θ is the angle between forces',
        },
        {
          type: 'example',
          content: 'Two forces of 30N and 40N act at an angle of 120° to each other. Find the resultant force.',
        },
        {
          type: 'calculation',
          content: 'Apply the Law of Cosines for the resultant.',
          steps: [
            'R² = 30² + 40² - 2(30)(40)cos(60°)',
            'R² = 900 + 1600 - 2400(0.5)',
            'R² = 2500 - 1200 = 1300',
            'R = √1300 ≈ 36.1 N',
          ],
        },
        {
          type: 'conclusion',
          content: 'The resultant force is approximately 36.1 N.',
        },
      ],
      imagePath: getImagePath('10-non-right-trig', 'physics'),
    },
    'neural-networks': {
      topicId: '10-non-right-trig',
      interestId: 'neural-networks',
      title: 'Neural Networks (Cosine Similarity)',
      sections: [
        {
          type: 'paragraph',
          content: 'Neural networks use cosine similarity to measure how similar two vectors are. This is based on the cosine of the angle between them.',
        },
        {
          type: 'formula',
          content: 'Cosine Similarity = cos(θ) = (A·B)/(|A||B|)\nRange: -1 (opposite) to 1 (identical)',
        },
        {
          type: 'example',
          content: 'Two word embeddings are vectors A = (3, 4) and B = (4, 3). Calculate their cosine similarity.',
        },
        {
          type: 'calculation',
          content: 'Calculate dot product and magnitudes.',
          steps: [
            'A·B = 3×4 + 4×3 = 24',
            '|A| = √(9+16) = 5',
            '|B| = √(16+9) = 5',
            'cos(θ) = 24/(5×5) = 0.96',
          ],
        },
        {
          type: 'conclusion',
          content: 'Cosine similarity of 0.96 indicates the vectors are very similar in direction.',
        },
      ],
      imagePath: getImagePath('10-non-right-trig', 'neural-networks'),
    },
  },
  '11-exponent-laws': {
    economics: {
      topicId: '11-exponent-laws',
      interestId: 'economics',
      title: 'Economics (Compound Interest)',
      sections: [
        {
          type: 'paragraph',
          content: 'Exponent laws govern compound interest calculations. The power rule is especially important for understanding how money grows over time.',
        },
        {
          type: 'formula',
          content: 'Compound Interest: A = P(1 + r)ⁿ\nProduct rule: aᵐ × aⁿ = aᵐ⁺ⁿ\nPower rule: (aᵐ)ⁿ = aᵐⁿ',
        },
        {
          type: 'example',
          content: 'An investment doubles every 5 years (multiplied by 2¹). After 15 years, by what factor has it grown?',
        },
        {
          type: 'calculation',
          content: 'Apply exponent rules.',
          steps: [
            '15 years = 3 periods of 5 years',
            'Growth = 2¹ × 2¹ × 2¹ = 2³',
            '2³ = 8',
          ],
        },
        {
          type: 'conclusion',
          content: 'The investment grows by a factor of 8 over 15 years.',
        },
      ],
      imagePath: getImagePath('11-exponent-laws', 'economics'),
    },
    physics: {
      topicId: '11-exponent-laws',
      interestId: 'physics',
      title: 'Physics (Scientific Notation)',
      sections: [
        {
          type: 'paragraph',
          content: 'Physics uses exponent laws to work with very large or small numbers in scientific notation. Multiplying and dividing powers of 10 follows exponent rules.',
        },
        {
          type: 'formula',
          content: 'Scientific notation: a × 10ⁿ\nMultiplying: 10ᵐ × 10ⁿ = 10ᵐ⁺ⁿ\nDividing: 10ᵐ ÷ 10ⁿ = 10ᵐ⁻ⁿ',
        },
        {
          type: 'example',
          content: 'The speed of light is 3×10⁸ m/s. How far does light travel in 10² seconds?',
        },
        {
          type: 'calculation',
          content: 'Multiply using exponent rules.',
          steps: [
            'Distance = speed × time',
            'd = (3×10⁸) × (10²)',
            'd = 3 × 10⁸⁺² = 3×10¹⁰ meters',
          ],
        },
        {
          type: 'conclusion',
          content: 'Light travels 3×10¹⁰ meters (30 billion meters) in 100 seconds.',
        },
      ],
      imagePath: getImagePath('11-exponent-laws', 'physics'),
    },
    'neural-networks': {
      topicId: '11-exponent-laws',
      interestId: 'neural-networks',
      title: 'Neural Networks (Exponential Functions)',
      sections: [
        {
          type: 'paragraph',
          content: 'The exponential function e^x is fundamental to neural networks. Its used in softmax for classification and in gradient calculations.',
        },
        {
          type: 'formula',
          content: 'Softmax: eˣⁱ / Σeˣʲ\nExponent rule: eᵃ × eᵇ = eᵃ⁺ᵇ',
        },
        {
          type: 'example',
          content: 'In a softmax layer, if two neurons have outputs 2 and 3, simplify e² × e³.',
        },
        {
          type: 'calculation',
          content: 'Apply the product rule for exponents.',
          steps: [
            'e² × e³ = e²⁺³',
            '= e⁵',
            '≈ 148.41',
          ],
        },
        {
          type: 'conclusion',
          content: 'Using exponent laws, e² × e³ = e⁵ ≈ 148.41.',
        },
      ],
      imagePath: getImagePath('11-exponent-laws', 'neural-networks'),
    },
  },
  '12-expanding-factoring': {
    economics: {
      topicId: '12-expanding-factoring',
      interestId: 'economics',
      title: 'Economics (Revenue Modeling)',
      sections: [
        {
          type: 'paragraph',
          content: 'Expanding expressions helps model how changes in price and quantity affect revenue. Revenue = Price × Quantity, and when both change, we expand the product.',
        },
        {
          type: 'formula',
          content: 'FOIL method: (a + b)(c + d) = ac + ad + bc + bd\nDistributive: a(b + c) = ab + ac',
        },
        {
          type: 'example',
          content: 'If price is (x + 3) dollars and quantity sold is (x + 5) units, expand to find the revenue expression.',
        },
        {
          type: 'calculation',
          content: 'Apply FOIL to expand.',
          steps: [
            'R = (x + 3)(x + 5)',
            'R = x² + 5x + 3x + 15',
            'R = x² + 8x + 15',
          ],
        },
        {
          type: 'conclusion',
          content: 'Revenue R = x² + 8x + 15 shows how price and quantity combine.',
        },
      ],
      imagePath: getImagePath('12-expanding-factoring', 'economics'),
    },
    physics: {
      topicId: '12-expanding-factoring',
      interestId: 'physics',
      title: 'Physics (Energy Equations)',
      sections: [
        {
          type: 'paragraph',
          content: 'Physics equations often need to be expanded or factored to solve problems. Kinetic energy and other formulas involve squared terms.',
        },
        {
          type: 'formula',
          content: 'Expanding: (a + b)² = a² + 2ab + b²\nFactoring: a² + 2ab + b² = (a + b)²',
        },
        {
          type: 'example',
          content: 'Expand (v + 2)² to model a velocity expression.',
        },
        {
          type: 'calculation',
          content: 'Apply the perfect square formula.',
          steps: [
            '(v + 2)² = v² + 2(v)(2) + 2²',
            '= v² + 4v + 4',
          ],
        },
        {
          type: 'conclusion',
          content: 'The expanded form is v² + 4v + 4.',
        },
      ],
      imagePath: getImagePath('12-expanding-factoring', 'physics'),
    },
    'neural-networks': {
      topicId: '12-expanding-factoring',
      interestId: 'neural-networks',
      title: 'Neural Networks (Polynomial Features)',
      sections: [
        {
          type: 'paragraph',
          content: 'Neural networks sometimes expand input features to create polynomial combinations. This helps capture non-linear relationships.',
        },
        {
          type: 'formula',
          content: 'Feature expansion: [x, y] → [x, y, x², xy, y²]\nCreates polynomial feature space',
        },
        {
          type: 'example',
          content: 'Expand the product of features (x + 1)(y + 2) for a polynomial feature layer.',
        },
        {
          type: 'calculation',
          content: 'Apply the distributive property.',
          steps: [
            '(x + 1)(y + 2)',
            '= xy + 2x + y + 2',
          ],
        },
        {
          type: 'conclusion',
          content: 'The expansion creates features: xy, 2x, y, and 2.',
        },
      ],
      imagePath: getImagePath('12-expanding-factoring', 'neural-networks'),
    },
  },
  '13-factoring-trinomials': {
    economics: {
      topicId: '13-factoring-trinomials',
      interestId: 'economics',
      title: 'Economics (Break-Even Analysis)',
      sections: [
        {
          type: 'paragraph',
          content: 'Factoring trinomials helps find break-even points where profit equals zero. Profit equations are often quadratic.',
        },
        {
          type: 'formula',
          content: 'x² + bx + c = (x + p)(x + q)\nwhere p + q = b and p × q = c',
        },
        {
          type: 'example',
          content: 'A profit function is P = x² - 7x + 12. Factor to find break-even quantities.',
        },
        {
          type: 'calculation',
          content: 'Find factors of 12 that add to -7.',
          steps: [
            'Need: p × q = 12, p + q = -7',
            'Factors: -3 and -4 work',
            'x² - 7x + 12 = (x - 3)(x - 4)',
          ],
        },
        {
          type: 'conclusion',
          content: 'Break-even occurs at x = 3 and x = 4 units.',
        },
      ],
      imagePath: getImagePath('13-factoring-trinomials', 'economics'),
    },
    physics: {
      topicId: '13-factoring-trinomials',
      interestId: 'physics',
      title: 'Physics (Projectile Motion)',
      sections: [
        {
          type: 'paragraph',
          content: 'The height of a projectile follows a quadratic path. Factoring helps find when and where it lands.',
        },
        {
          type: 'formula',
          content: 'Height: h = -t² + bt + c\nFactor to find t when h = 0',
        },
        {
          type: 'example',
          content: 'A ball\'s height is h = -t² + 5t + 6. Factor to find when it hits the ground.',
        },
        {
          type: 'calculation',
          content: 'Factor the expression.',
          steps: [
            '-t² + 5t + 6 = 0',
            't² - 5t - 6 = 0',
            '(t - 6)(t + 1) = 0',
            't = 6 (valid), t = -1 (invalid)',
          ],
        },
        {
          type: 'conclusion',
          content: 'The ball hits the ground at t = 6 seconds.',
        },
      ],
      imagePath: getImagePath('13-factoring-trinomials', 'physics'),
    },
    'neural-networks': {
      topicId: '13-factoring-trinomials',
      interestId: 'neural-networks',
      title: 'Neural Networks (Loss Functions)',
      sections: [
        {
          type: 'paragraph',
          content: 'Some neural network loss functions are quadratic. Factoring helps analyze when loss equals zero (perfect prediction).',
        },
        {
          type: 'formula',
          content: 'MSE Loss = Σ(predicted - actual)²\nFactor to find optimal points',
        },
        {
          type: 'example',
          content: 'A simplified loss function is L = w² - 4w + 3. Factor to find optimal weights.',
        },
        {
          type: 'calculation',
          content: 'Find factors that sum to -4 and multiply to 3.',
          steps: [
            'Need: p × q = 3, p + q = -4',
            '-1 × -3 = 3, -1 + -3 = -4',
            'w² - 4w + 3 = (w - 1)(w - 3)',
          ],
        },
        {
          type: 'conclusion',
          content: 'Loss is zero at w = 1 and w = 3, indicating optimal weight values.',
        },
      ],
      imagePath: getImagePath('13-factoring-trinomials', 'neural-networks'),
    },
  },
  '14-difference-of-squares': {
    economics: {
      topicId: '14-difference-of-squares',
      interestId: 'economics',
      title: 'Economics (Price Differences)',
      sections: [
        {
          type: 'paragraph',
          content: 'The difference of squares pattern appears when analyzing the difference between two market values or squared quantities.',
        },
        {
          type: 'formula',
          content: 'a² - b² = (a + b)(a - b)\nUseful for quick calculations',
        },
        {
          type: 'example',
          content: 'Calculate the difference between 103² and 97² using the difference of squares.',
        },
        {
          type: 'calculation',
          content: 'Apply the formula.',
          steps: [
            '103² - 97² = (103 + 97)(103 - 97)',
            '= (200)(6)',
            '= 1200',
          ],
        },
        {
          type: 'conclusion',
          content: '103² - 97² = 1200, calculated without computing each square.',
        },
      ],
      imagePath: getImagePath('14-difference-of-squares', 'economics'),
    },
    physics: {
      topicId: '14-difference-of-squares',
      interestId: 'physics',
      title: 'Physics (Kinetic Energy)',
      sections: [
        {
          type: 'paragraph',
          content: 'The difference of squares appears in physics when calculating changes in kinetic energy or when simplifying velocity differences.',
        },
        {
          type: 'formula',
          content: 'ΔKE = ½m(v₂² - v₁²) = ½m(v₂ + v₁)(v₂ - v₁)',
        },
        {
          type: 'example',
          content: 'A car accelerates from 20 m/s to 30 m/s. Simplify v₂² - v₁² = 30² - 20².',
        },
        {
          type: 'calculation',
          content: 'Apply difference of squares.',
          steps: [
            '30² - 20² = (30 + 20)(30 - 20)',
            '= (50)(10)',
            '= 500',
          ],
        },
        {
          type: 'conclusion',
          content: 'The difference 30² - 20² = 500, useful for quick energy calculations.',
        },
      ],
      imagePath: getImagePath('14-difference-of-squares', 'physics'),
    },
    'neural-networks': {
      topicId: '14-difference-of-squares',
      interestId: 'neural-networks',
      title: 'Neural Networks (Gradient Optimization)',
      sections: [
        {
          type: 'paragraph',
          content: 'Difference of squares patterns appear when analyzing changes in neural network weights or when simplifying gradient computations.',
        },
        {
          type: 'formula',
          content: 'Weight update difference: w₂² - w₁² = (w₂ + w₁)(w₂ - w₁)',
        },
        {
          type: 'example',
          content: 'A network weight changes from w₁ = 0.3 to w₂ = 0.5. Factor w₂² - w₁².',
        },
        {
          type: 'calculation',
          content: 'Apply the pattern.',
          steps: [
            '0.5² - 0.3² = (0.5 + 0.3)(0.5 - 0.3)',
            '= (0.8)(0.2)',
            '= 0.16',
          ],
        },
        {
          type: 'conclusion',
          content: 'The weight squared change is 0.16, factored for efficient computation.',
        },
      ],
      imagePath: getImagePath('14-difference-of-squares', 'neural-networks'),
    },
  },
  '15-quadratics-vertex': {
    economics: {
      topicId: '15-quadratics-vertex',
      interestId: 'economics',
      title: 'Economics (Maximum Profit)',
      sections: [
        {
          type: 'paragraph',
          content: 'Vertex form reveals the maximum or minimum of a quadratic function - crucial for finding optimal pricing or production levels.',
        },
        {
          type: 'formula',
          content: 'Vertex form: y = a(x - h)² + k\nVertex (maximum/minimum) at (h, k)',
        },
        {
          type: 'example',
          content: 'A profit function is P = -2(x - 50)² + 5000. Find the maximum profit and optimal quantity.',
        },
        {
          type: 'calculation',
          content: 'Identify vertex from the equation.',
          steps: [
            'a = -2 (negative, so maximum exists)',
            'h = 50 (optimal quantity)',
            'k = 5000 (maximum profit)',
          ],
        },
        {
          type: 'conclusion',
          content: 'Maximum profit of $5000 occurs when producing 50 units.',
        },
      ],
      imagePath: getImagePath('15-quadratics-vertex', 'economics'),
    },
    physics: {
      topicId: '15-quadratics-vertex',
      interestId: 'physics',
      title: 'Physics (Maximum Height)',
      sections: [
        {
          type: 'paragraph',
          content: 'Vertex form shows the maximum height of a projectile and when it occurs - the peak of the parabolic path.',
        },
        {
          type: 'formula',
          content: 'Height: h = -a(t - tₘₐₓ)² + hₘₐₓ\nVertex gives time and height at peak',
        },
        {
          type: 'example',
          content: 'A ball follows path h = -5(t - 3)² + 45. Find the maximum height and when it occurs.',
        },
        {
          type: 'calculation',
          content: 'Read values from vertex form.',
          steps: [
            'tₘₐₓ = 3 seconds',
            'hₘₐₓ = 45 meters',
            'The vertex is (3, 45)',
          ],
        },
        {
          type: 'conclusion',
          content: 'Maximum height of 45 meters occurs at t = 3 seconds.',
        },
      ],
      imagePath: getImagePath('15-quadratics-vertex', 'physics'),
    },
    'neural-networks': {
      topicId: '15-quadratics-vertex',
      interestId: 'neural-networks',
      title: 'Neural Networks (Loss Minimization)',
      sections: [
        {
          type: 'paragraph',
          content: 'In neural networks, quadratic loss functions have a minimum at the vertex. Understanding this helps visualize the training goal.',
        },
        {
          type: 'formula',
          content: 'Loss: L = a(w - w*)² + 0\nMinimum at w = w* (optimal weight)',
        },
        {
          type: 'example',
          content: 'A loss function is L = 2(w - 0.5)² + 0.1. Find the optimal weight and minimum loss.',
        },
        {
          type: 'calculation',
          content: 'Identify vertex coordinates.',
          steps: [
            'Optimal weight w* = 0.5',
            'Minimum loss = 0.1',
            'Vertex: (0.5, 0.1)',
          ],
        },
        {
          type: 'conclusion',
          content: 'Training aims to reach w = 0.5 where loss is minimized at 0.1.',
        },
      ],
      imagePath: getImagePath('15-quadratics-vertex', 'neural-networks'),
    },
  },
  '16-completing-the-square': {
    economics: {
      topicId: '16-completing-the-square',
      interestId: 'economics',
      title: 'Economics (Profit Optimization)',
      sections: [
        {
          type: 'paragraph',
          content: 'Completing the square transforms a standard quadratic into vertex form, revealing the maximum profit and optimal production level.',
        },
        {
          type: 'formula',
          content: 'x² + bx + c → (x + b/2)² - (b/2)² + c\nConverts to vertex form',
        },
        {
          type: 'example',
          content: 'Complete the square for profit function P = -x² + 10x + 24 to find maximum profit.',
        },
        {
          type: 'calculation',
          content: 'Apply completing the square.',
          steps: [
            'P = -(x² - 10x) + 24',
            'P = -(x² - 10x + 25 - 25) + 24',
            'P = -(x - 5)² + 25 + 24',
            'P = -(x - 5)² + 49',
          ],
        },
        {
          type: 'conclusion',
          content: 'Maximum profit is $49 when x = 5 units are produced.',
        },
      ],
      imagePath: getImagePath('16-completing-the-square', 'economics'),
    },
    physics: {
      topicId: '16-completing-the-square',
      interestId: 'physics',
      title: 'Physics (Trajectory Analysis)',
      sections: [
        {
          type: 'paragraph',
          content: 'Completing the square helps convert projectile equations to vertex form, revealing maximum height directly.',
        },
        {
          type: 'formula',
          content: 'h = -at² + bt + c → h = -a(t - tₘₐₓ)² + hₘₐₓ',
        },
        {
          type: 'example',
          content: 'Complete the square for h = -t² + 6t + 7 to find maximum height.',
        },
        {
          type: 'calculation',
          content: 'Transform to vertex form.',
          steps: [
            'h = -(t² - 6t) + 7',
            'h = -(t² - 6t + 9 - 9) + 7',
            'h = -(t - 3)² + 9 + 7',
            'h = -(t - 3)² + 16',
          ],
        },
        {
          type: 'conclusion',
          content: 'Maximum height is 16 meters at t = 3 seconds.',
        },
      ],
      imagePath: getImagePath('16-completing-the-square', 'physics'),
    },
    'neural-networks': {
      topicId: '16-completing-the-square',
      interestId: 'neural-networks',
      title: 'Neural Networks (Optimization)',
      sections: [
        {
          type: 'paragraph',
          content: 'Completing the square in loss functions reveals the minimum point, helping understand where gradient descent is heading.',
        },
        {
          type: 'formula',
          content: 'L = w² + bw + c → L = (w + b/2)² + c - (b/2)²',
        },
        {
          type: 'example',
          content: 'Complete the square for loss L = w² - 4w + 5 to find optimal weight.',
        },
        {
          type: 'calculation',
          content: 'Convert to vertex form.',
          steps: [
            'L = w² - 4w + 4 - 4 + 5',
            'L = (w - 2)² + 1',
          ],
        },
        {
          type: 'conclusion',
          content: 'Optimal weight w = 2 gives minimum loss of 1.',
        },
      ],
      imagePath: getImagePath('16-completing-the-square', 'neural-networks'),
    },
  },
  '17-quadratic-formula': {
    economics: {
      topicId: '17-quadratic-formula',
      interestId: 'economics',
      title: 'Economics (Break-Even Points)',
      sections: [
        {
          type: 'paragraph',
          content: 'The quadratic formula finds exact break-even points when factoring is difficult. Any profit equation can be solved this way.',
        },
        {
          type: 'formula',
          content: 'x = (-b ± √(b² - 4ac)) / 2a\nfor ax² + bx + c = 0',
        },
        {
          type: 'example',
          content: 'Find break-even points for P = 2x² - 7x - 15.',
        },
        {
          type: 'calculation',
          content: 'Apply the quadratic formula.',
          steps: [
            'a = 2, b = -7, c = -15',
            'x = (7 ± √(49 + 120)) / 4',
            'x = (7 ± √169) / 4 = (7 ± 13) / 4',
            'x = 5 or x = -1.5',
          ],
        },
        {
          type: 'conclusion',
          content: 'Break-even at x = 5 units (x = -1.5 is not valid for quantity).',
        },
      ],
      imagePath: getImagePath('17-quadratic-formula', 'economics'),
    },
    physics: {
      topicId: '17-quadratic-formula',
      interestId: 'physics',
      title: 'Physics (Time of Flight)',
      sections: [
        {
          type: 'paragraph',
          content: 'The quadratic formula solves for when a projectile reaches a specific height or returns to ground level.',
        },
        {
          type: 'formula',
          content: 'h = -½gt² + v₀t + h₀\nSolve for t using quadratic formula',
        },
        {
          type: 'example',
          content: 'A ball is thrown from 10m height with initial velocity 15 m/s. When does it hit the ground? (g = 10 m/s²)',
        },
        {
          type: 'calculation',
          content: 'Solve -5t² + 15t + 10 = 0.',
          steps: [
            'Divide by -5: t² - 3t - 2 = 0',
            't = (3 ± √(9 + 8)) / 2',
            't = (3 ± √17) / 2 ≈ (3 ± 4.12) / 2',
            't ≈ 3.56 seconds',
          ],
        },
        {
          type: 'conclusion',
          content: 'The ball hits the ground at approximately t = 3.56 seconds.',
        },
      ],
      imagePath: getImagePath('17-quadratic-formula', 'physics'),
    },
    'neural-networks': {
      topicId: '17-quadratic-formula',
      interestId: 'neural-networks',
      title: 'Neural Networks (Critical Points)',
      sections: [
        {
          type: 'paragraph',
          content: 'When analyzing quadratic loss landscapes, the quadratic formula can find exact weight values where loss equals a target value.',
        },
        {
          type: 'formula',
          content: 'For aw² + bw + c = target:\nw = (-b ± √(b² - 4a(c - target))) / 2a',
        },
        {
          type: 'example',
          content: 'Find weights where loss L = w² - 3w + 2 equals zero.',
        },
        {
          type: 'calculation',
          content: 'Apply quadratic formula with a=1, b=-3, c=2.',
          steps: [
            'w = (3 ± √(9 - 8)) / 2',
            'w = (3 ± 1) / 2',
            'w = 2 or w = 1',
          ],
        },
        {
          type: 'conclusion',
          content: 'Zero loss occurs at w = 1 and w = 2.',
        },
      ],
      imagePath: getImagePath('17-quadratic-formula', 'neural-networks'),
    },
  },
};

// ELI5 (Explain Like I'm 5) content for Neural Networks
export const eli5Content: Record<string, ELI5Content> = {
  '01-linear-equations': {
    topicId: '01-linear-equations',
    title: 'The Simple Neuron - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Imagine a tiny robot helper inside a computer. This little robot has one job: You give it a number, it does a small math trick, and it gives you a new number back. That tiny robot is called a neuron.',
      },
      {
        type: 'heading',
        content: 'Why do we need it?',
      },
      {
        type: 'paragraph',
        content: 'The robot helps the computer learn how things change. For example, when it\'s cold, numbers are small. When it\'s hot, numbers are bigger. The robot is trying to learn: "If I see this number, what number should I say back?" If it\'s wrong, it tries again and gets better and better.',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'The robot does two simple steps every time:',
      },
      {
        type: 'list',
        content: '',
        items: [
          'Stretch the number: The robot multiplies the number. Think of it like making the number bigger or smaller, like stretching a rubber band. This is called the weight.',
          'Add a little extra: Then the robot adds a number at the end. This is like giving the answer a little push up or down. This is called the bias.',
        ],
      },
      {
        type: 'paragraph',
        content: 'A neuron is a tiny helper that changes numbers and learns by practicing. Lots of tiny helpers together can learn to recognize pictures, understand words, and predict things - all by doing very simple math, over and over!',
      },
    ],
    imagePath: getImagePath('01-linear-equations', 'nn-5-year-old'),
  },
  '02-linear-systems': {
    topicId: '02-linear-systems',
    title: 'Many Robots Working Together - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Remember our tiny robot helper? Now imagine TWO robots working together. Each robot does its own math trick, and they have to agree on the answer!',
      },
      {
        type: 'heading',
        content: 'Why do we need it?',
      },
      {
        type: 'paragraph',
        content: 'Sometimes one robot isn\'t enough. When you need to figure out two things at once, you need two robots working as a team.',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'Both robots look at the same question and try to find a special number that makes BOTH of them happy. It\'s like when two friends need to agree on what game to play - they need to find something that works for everyone!',
      },
    ],
    imagePath: getImagePath('02-linear-systems', 'nn-5-year-old'),
  },
  '03-midpoint-distance': {
    topicId: '03-midpoint-distance',
    title: 'Finding the Middle - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Imagine you have two friends standing in different spots on the playground. The midpoint is like finding the perfect spot in the middle where you could put a picnic blanket so both friends walk the same distance to reach it!',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'When a computer is learning to group similar things together (like sorting toys), it needs to find the middle of each group. The robot uses these middle points to decide which group something belongs to.',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'Just like how you can find the middle of a candy bar by splitting it in half, the computer finds the middle by adding the two positions and dividing by 2. Fair and square!',
      },
    ],
    imagePath: getImagePath('03-midpoint-distance', 'nn-5-year-old'),
  },
  '04-equation-circle': {
    topicId: '04-equation-circle',
    title: 'Drawing Circles - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Think about using a compass to draw a circle, or tying a string to a stick and walking around it. All the points on a circle are the same distance from the middle!',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'When a computer is learning to tell things apart (like cats vs dogs), sometimes it draws an imaginary circle. Everything inside the circle is one type, everything outside is another type.',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'The computer checks if a point is close enough to the center. If it\'s closer than the radius (the string length), it\'s inside the circle. If it\'s farther, it\'s outside!',
      },
    ],
    imagePath: getImagePath('04-equation-circle', 'nn-5-year-old'),
  },
  '05-medians-altitudes': {
    topicId: '05-medians-altitudes',
    title: 'Finding the Balance Point - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Imagine a triangle-shaped pizza. If you want to balance it on one finger, there\'s only one special spot where it won\'t tip over. That\'s the center!',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'When a computer looks at a group of things (like three photos), it finds the center point to represent all of them. It\'s like picking one toy to represent your whole toy box!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'Just average all the positions together! Take three friends\' ages and divide by 3 - that\'s the average age. The computer does the same with positions.',
      },
    ],
    imagePath: getImagePath('05-medians-altitudes', 'nn-5-year-old'),
  },
  '06-triangle-centers': {
    topicId: '06-triangle-centers',
    title: 'Different Special Points - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'A triangle has lots of special points! The balance point, the middle point, and other special spots. Each one is useful for different things.',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'Different problems need different centers. Sometimes you want the exact middle, sometimes you want the balance point. The computer picks the right one for the job!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'Each special point has its own recipe. The balance point uses averages. Other points use different math tricks!',
      },
    ],
    imagePath: getImagePath('06-triangle-centers', 'nn-5-year-old'),
  },
  '07-classifying-shapes': {
    topicId: '07-classifying-shapes',
    title: 'Sorting Shapes - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Classifying means putting things into groups. Triangles go in the triangle box, squares go in the square box. Each shape has special features that help us know which box it belongs in.',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'Computers can learn to recognize shapes in pictures! This helps them understand stop signs, read letters, and even recognize faces.',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'The computer counts corners, looks at edges, and checks if angles are equal. Then it uses rules to decide: "3 corners and 3 sides? That\'s a triangle!"',
      },
    ],
    imagePath: getImagePath('07-classifying-shapes', 'nn-5-year-old'),
  },
  '08-congruence-similarity': {
    topicId: '08-congruence-similarity',
    title: 'Same and Similar - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Congruent means exactly the same - like two identical cookies from the same cookie cutter. Similar means the same shape but different sizes - like a big cookie and a mini cookie of the same shape.',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'A computer needs to recognize a cat whether it\'s a big photo or a tiny photo. Similar shapes help the computer know it\'s the same thing, just bigger or smaller!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'The computer looks at the proportions - is everything stretched by the same amount? If yes, they\'re similar. If they\'re exactly the same size too, they\'re congruent!',
      },
    ],
    imagePath: getImagePath('08-congruence-similarity', 'nn-5-year-old'),
  },
  '09-right-triangle-ratios': {
    topicId: '09-right-triangle-ratios',
    title: 'Triangle Tricks - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'In a triangle with a square corner, the sides have special relationships. If you know one side and one angle, you can figure out the other sides!',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'These special relationships help computers understand waves and patterns. Music, light, and even brain signals can be understood using these triangle tricks!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'The computer uses special functions called sine, cosine, and tangent. They\'re like magic calculators that turn angles into the right proportions.',
      },
    ],
    imagePath: getImagePath('09-right-triangle-ratios', 'nn-5-year-old'),
  },
  '10-non-right-trig': {
    topicId: '10-non-right-trig',
    title: 'Any Triangle Math - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Not all triangles have a square corner. For other triangles, we need different rules! These rules work for ANY triangle.',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'When comparing two things (like two words or two pictures), the computer thinks of them as arrows. The angle between the arrows tells how similar they are!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'The computer uses a special trick called "cosine similarity." Arrows pointing the same way are very similar (angle close to 0). Arrows pointing opposite ways are very different!',
      },
    ],
    imagePath: getImagePath('10-non-right-trig', 'nn-5-year-old'),
  },
  '11-exponent-laws': {
    topicId: '11-exponent-laws',
    title: 'Power Rules - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Exponents are like a short way to write lots of multiplication. 2³ means 2 × 2 × 2. It\'s quicker than writing it all out!',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'Computers use a special number called "e" raised to powers. This helps them turn robot outputs into probabilities - like "90% chance it\'s a cat!"',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'There are simple rules: When you multiply powers with the same base, add the exponents. When you raise a power to another power, multiply the exponents. Easy!',
      },
    ],
    imagePath: getImagePath('11-exponent-laws', 'nn-5-year-old'),
  },
  '12-expanding-factoring': {
    topicId: '12-expanding-factoring',
    title: 'Taking Apart and Putting Together - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Expanding is like unfolding an origami crane to see the flat paper. Factoring is like folding the paper back into a crane. Same thing, different forms!',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'Sometimes the computer needs to see all the parts (expanding). Sometimes it needs to see the simple form (factoring). Both views help solve different problems!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'To expand: multiply everything inside by everything outside. To factor: find what\'s common and pull it out, like finding common LEGO pieces!',
      },
    ],
    imagePath: getImagePath('12-expanding-factoring', 'nn-5-year-old'),
  },
  '13-factoring-trinomials': {
    topicId: '13-factoring-trinomials',
    title: 'Breaking Down Three-Part Math - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'A trinomial is math with three parts added together, like "apples + oranges + bananas." We can sometimes rewrite it as two simpler groups multiplied together.',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'When the computer is trying to find the perfect weights (the best numbers to use), it sometimes needs to find where a formula equals zero. Factoring helps find those special numbers!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'Find two numbers that add up to one part and multiply to give another part. It\'s like a puzzle game - find the two special numbers that fit both clues!',
      },
    ],
    imagePath: getImagePath('13-factoring-trinomials', 'nn-5-year-old'),
  },
  '14-difference-of-squares': {
    topicId: '14-difference-of-squares',
    title: 'Square Takeaway - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'If you have a big square and take away a smaller square, there\'s a cool shortcut to figure out what\'s left! Big² - Small² = (Big + Small) × (Big - Small).',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'Computers love shortcuts! Instead of calculating big numbers squared and subtracting, they can use this trick to do it faster.',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'Just add the two numbers together, then subtract them, then multiply those results. It works every time! Like magic math!',
      },
    ],
    imagePath: getImagePath('14-difference-of-squares', 'nn-5-year-old'),
  },
  '15-quadratics-vertex': {
    topicId: '15-quadratics-vertex',
    title: 'Finding the Top of the Hill - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Imagine a rainbow arc or a ball thrown in the air. It goes up, reaches the highest point (the vertex), then comes back down. The vertex is that tippy-top point!',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'When learning, the computer tries to find the lowest point of an error hill (where mistakes are smallest). The vertex tells it exactly where that best spot is!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'The vertex form shows the top (or bottom) point clearly. Instead of guessing, the computer can just read the answer right from the equation!',
      },
    ],
    imagePath: getImagePath('15-quadratics-vertex', 'nn-5-year-old'),
  },
  '16-completing-the-square': {
    topicId: '16-completing-the-square',
    title: 'Making It Perfect - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'Imagine you have almost a perfect square of brownies, but one corner piece is missing. Completing the square means figuring out what piece you need to make it perfect!',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'This trick helps the computer see where the highest or lowest point is. It\'s like rearranging a puzzle so the picture becomes clear!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'Take what you have, figure out what\'s missing to make a perfect square, add it (and remember you added it so you can adjust). Now you can see the peak clearly!',
      },
    ],
    imagePath: getImagePath('16-completing-the-square', 'nn-5-year-old'),
  },
  '17-quadratic-formula': {
    topicId: '17-quadratic-formula',
    title: 'The Magic Solver - for a 5 year old',
    sections: [
      {
        type: 'heading',
        content: 'What is it?',
      },
      {
        type: 'paragraph',
        content: 'The quadratic formula is like a magic key that opens any quadratic lock! No matter how tricky the problem, this formula always finds the answer.',
      },
      {
        type: 'heading',
        content: 'Why does a computer need this?',
      },
      {
        type: 'paragraph',
        content: 'When the computer needs to find special weight values that make the error zero, it can plug numbers into this formula and get the exact answer!',
      },
      {
        type: 'heading',
        content: 'How does it work?',
      },
      {
        type: 'paragraph',
        content: 'Just plug in the numbers: x = (-b ± √(b²-4ac)) / 2a. The computer loves it because it always works, every single time!',
      },
    ],
    imagePath: getImagePath('17-quadratic-formula', 'nn-5-year-old'),
  },
};

// Get content for a specific topic and interest
export const getTopicContent = (topicId: string, interestId: string): TopicContent | undefined => {
  return topicContent[topicId]?.[interestId];
};

// Get ELI5 content for a specific topic
export const getELI5Content = (topicId: string): ELI5Content | undefined => {
  return eli5Content[topicId];
};
