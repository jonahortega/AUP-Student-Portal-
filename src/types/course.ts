export type Term = 'Spring 2026' | 'Fall 2026' | 'Spring 2027' | 'Fall 2027' | 'Spring 2028' | 'Fall 2028'

export interface Course {
  id: string
  code: string
  title: string
  credits: number
  professor: string
  schedule: string
  location: string
  availableSpots: number
  totalSpots: number
  department: string
  description: string
  term: Term
  prerequisites?: string[] // Array of course codes that must be completed first
}

export interface RegisteredCourse extends Course {
  registeredAt: string
}

export interface PendingCourse extends Course {
  pendingAt: string
}

