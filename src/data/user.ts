import { User } from '../types/user'

export const defaultUser: User = {
  firstName: 'Jonah',
  lastName: 'Pork',
  email: 'jpork@aup.edu',
  idNumber: 'a115569',
  year: '3rd year Junior',
  major: 'Computer Science',
  counselor: 'Tim Cheese',
  completedCourses: [
    // Available courses that were completed
    '4', // HIST 1001 - Introduction to European History (3)
    '5', // FREN 2001 - Advanced French Language (3)
    '8', // MATH 1801 - Calculus I (4)
    '9', // PSY 2001 - Cross-Cultural Psychology (3)
    '10', // CINE 1901 - French Cinema (3)
    '6', // ART 1501 - Modern Art in Paris (3)
    '7', // PHIL 2101 - Existentialism and Modern Thought (3)
    '3', // MA1025 - Pre-Calculus (3)
    // Completed courses from previous semesters (not in current catalog)
    'comp-1', // CS1010 - Introduction to Computer Science (3)
    'comp-2', // CS1020 - Programming Fundamentals (4)
    'comp-3', // ENG1010 - Composition and Rhetoric (3)
    'comp-4', // MATH1010 - College Algebra (3)
    'comp-5', // HIST1010 - World History I (3)
    'comp-6', // FREN1010 - Elementary French I (4)
    'comp-7', // FREN1020 - Elementary French II (4)
    'comp-8', // PHIL1010 - Introduction to Philosophy (3)
    'comp-9', // ART1010 - Art History Survey (3)
    'comp-10', // CS2010 - Object-Oriented Programming (4)
    'comp-11', // MATH2010 - Calculus II (4)
    'comp-12', // LIT2010 - World Literature (3)
    'comp-13', // ECON1010 - Principles of Economics (3)
    'comp-14', // POL1010 - Introduction to Political Science (3)
    'comp-15', // CS2020 - Data Structures and Algorithms (4)
    // Total: 62 credits
  ]
}

