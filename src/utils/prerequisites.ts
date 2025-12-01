import { Course, PendingCourse } from '../types/course'
import { useUser } from '../context/UserContext'

export interface PrerequisiteError {
  type: 'prerequisite_not_fulfilled'
  message: string
  missingPrerequisites: string[]
}

export const checkPrerequisites = (
  course: Course | PendingCourse,
  completedCourseCodes: string[]
): PrerequisiteError | null => {
  if (!course.prerequisites || course.prerequisites.length === 0) {
    return null // No prerequisites required
  }

  const missingPrerequisites = course.prerequisites.filter(
    prereqCode => !completedCourseCodes.includes(prereqCode)
  )

  if (missingPrerequisites.length > 0) {
    return {
      type: 'prerequisite_not_fulfilled',
      message: `Prerequisites not fulfilled. Required: ${missingPrerequisites.join(', ')}`,
      missingPrerequisites
    }
  }

  return null
}

