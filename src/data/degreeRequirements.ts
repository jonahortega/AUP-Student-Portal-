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
    requiredCourses: ['CS3048', 'CS2071'], // Example: specific courses required
    description: 'Courses specific to your major'
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

