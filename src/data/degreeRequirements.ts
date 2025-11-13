export interface DegreeRequirement {
  id: string
  category: string
  requiredCredits: number
  requiredCourses?: string[] // Specific course codes that must be taken
  description: string
}

export const degreeRequirements: DegreeRequirement[] = [
  {
    id: 'core',
    category: 'Core Requirements',
    requiredCredits: 30,
    description: 'Fundamental courses required for all students'
  },
  {
    id: 'major',
    category: 'Major Requirements',
    requiredCredits: 45,
    requiredCourses: [
      'CS3048', // Human and Computer Interactions
      'CS2071', // Languages and Data Structures
      'CS2015', // Programming 2
      'CS3050', // Computer Networks
      'CS2100', // Discrete Mathematics
      'CS3010', // Database Systems
      'CS3020', // Operating Systems
      'CS4000', // Software Engineering
      'CS3500', // Web Development
      'CS3200'  // Algorithm Design and Analysis
    ],
    description: 'Courses specific to your Computer Science major'
  },
  {
    id: 'electives',
    category: 'General Electives',
    requiredCredits: 30,
    description: 'Additional courses of your choice'
  },
  {
    id: 'language',
    category: 'Language Requirements',
    requiredCredits: 12,
    description: 'Foreign language courses'
  },
  {
    id: 'total',
    category: 'Total Degree Credits',
    requiredCredits: 120,
    description: 'Total credits required for graduation'
  }
]

