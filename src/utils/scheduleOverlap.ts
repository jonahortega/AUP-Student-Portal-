import { Course, RegisteredCourse, PendingCourse } from '../types/course'
import { parseSchedule, timeToMinutes } from './scheduleParser'

export interface OverlapError {
  type: 'overlap' | 'credits_exceeded' | 'prerequisite_not_fulfilled'
  message: string
  conflictingCourse?: Course
  missingPrerequisites?: string[]
}

export const checkScheduleOverlap = (
  newCourse: Course | PendingCourse,
  existingCourses: (RegisteredCourse | PendingCourse)[]
): OverlapError | null => {
  const newSchedule = parseSchedule(newCourse.schedule)
  if (!newSchedule) return null

  const newDays = newSchedule.days
  const newStart = timeToMinutes(newSchedule.startTime)
  const newEnd = timeToMinutes(newSchedule.endTime)

  for (const existingCourse of existingCourses) {
    const existingSchedule = parseSchedule(existingCourse.schedule)
    if (!existingSchedule) continue

    // Check if courses share any day
    const hasCommonDay = newDays.some(day => existingSchedule.days.includes(day))
    if (!hasCommonDay) continue

    // Check if time ranges overlap
    const existingStart = timeToMinutes(existingSchedule.startTime)
    const existingEnd = timeToMinutes(existingSchedule.endTime)

    // Check for overlap: new course starts before existing ends AND new course ends after existing starts
    if (newStart < existingEnd && newEnd > existingStart) {
      return {
        type: 'overlap',
        message: `This course overlaps with ${existingCourse.code} - ${existingCourse.title} (${existingCourse.schedule})`,
        conflictingCourse: existingCourse
      }
    }
  }

  return null
}

export const checkCreditLimit = (
  newCourse: Course | PendingCourse,
  existingCourses: (RegisteredCourse | PendingCourse)[]
): OverlapError | null => {
  const currentCredits = existingCourses.reduce((sum, course) => sum + course.credits, 0)
  const newTotal = currentCredits + newCourse.credits

  if (newTotal > 18) {
    return {
      type: 'credits_exceeded',
      message: `Adding this course would exceed the 18 credit maximum. Current: ${currentCredits} credits, Adding: ${newCourse.credits} credits, Total: ${newTotal} credits.`
    }
  }

  return null
}

