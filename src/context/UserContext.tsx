import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { User } from '../types/user'
import { RegisteredCourse, PendingCourse } from '../types/course'
import { defaultUser } from '../data/user'
import { availableCourses } from '../data/courses'
import { completedCoursesData } from '../data/completedCourses'
import { checkScheduleOverlap, checkCreditLimit, OverlapError } from '../utils/scheduleOverlap'
import { checkPrerequisites } from '../utils/prerequisites'

interface UserContextType {
  user: User
  registeredCourses: RegisteredCourse[]
  pendingCourses: PendingCourse[]
  completedCoursesList: Array<{ code: string; title: string; credits: number; professor: string }>
  totalCompletedCredits: number
  setRegisteredCourses: (courses: RegisteredCourse[]) => void
  addPendingCourse: (course: PendingCourse) => OverlapError | null
  confirmPendingCourse: (courseId: string) => void
  removePendingCourse: (courseId: string) => void
  addRegisteredCourse: (course: RegisteredCourse) => void
  removeRegisteredCourse: (courseId: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User>(defaultUser)
  const [registeredCourses, setRegisteredCourses] = useState<RegisteredCourse[]>([])
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([])

  // Calculate completed courses list and total credits
  const { completedCoursesList, totalCompletedCredits } = useMemo(() => {
    const completed: Array<{ code: string; title: string; credits: number; professor: string }> = []
    let totalCredits = 0

    user.completedCourses.forEach(courseId => {
      // Check if it's in available courses
      const availableCourse = availableCourses.find(c => c.id === courseId)
      if (availableCourse) {
        completed.push({
          code: availableCourse.code,
          title: availableCourse.title,
          credits: availableCourse.credits,
          professor: availableCourse.professor
        })
        totalCredits += availableCourse.credits
      } else {
        // Check if it's in completed courses data
        const completedCourse = completedCoursesData.find(c => c.id === courseId)
        if (completedCourse) {
          completed.push({
            code: completedCourse.code,
            title: completedCourse.title,
            credits: completedCourse.credits,
            professor: completedCourse.professor
          })
          totalCredits += completedCourse.credits
        }
      }
    })

    return { completedCoursesList: completed, totalCompletedCredits: totalCredits }
  }, [user.completedCourses])

  const addPendingCourse = (course: PendingCourse): OverlapError | null => {
    // Get completed course codes
    const completedCourseCodes = completedCoursesList.map(c => c.code)

    // Check prerequisites
    if (course.prerequisites && course.prerequisites.length > 0) {
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
    }

    // Check for schedule overlap with registered courses
    const overlapError = checkScheduleOverlap(course, registeredCourses)
    if (overlapError) return overlapError

    // Check for schedule overlap with other pending courses
    const pendingOverlap = checkScheduleOverlap(course, pendingCourses)
    if (pendingOverlap) return pendingOverlap

    // Check credit limit (including registered and pending)
    const creditError = checkCreditLimit(course, [...registeredCourses, ...pendingCourses])
    if (creditError) return creditError

    setPendingCourses([...pendingCourses, course])
    return null
  }

  const confirmPendingCourse = (courseId: string) => {
    const pendingCourse = pendingCourses.find(c => c.id === courseId)
    if (!pendingCourse) return

    // Double-check for overlap with registered courses (in case something changed)
    const overlapError = checkScheduleOverlap(pendingCourse, registeredCourses)
    if (overlapError) {
      // Remove from pending if there's an overlap
      setPendingCourses(pendingCourses.filter(c => c.id !== courseId))
      return
    }

    // Convert to registered course
    const registeredCourse: RegisteredCourse = {
      ...pendingCourse,
      registeredAt: new Date().toISOString()
    }

    setRegisteredCourses([...registeredCourses, registeredCourse])
    setPendingCourses(pendingCourses.filter(c => c.id !== courseId))
  }

  const removePendingCourse = (courseId: string) => {
    setPendingCourses(pendingCourses.filter(c => c.id !== courseId))
  }

  const addRegisteredCourse = (course: RegisteredCourse) => {
    setRegisteredCourses([...registeredCourses, course])
  }

  const removeRegisteredCourse = (courseId: string) => {
    setRegisteredCourses(registeredCourses.filter(c => c.id !== courseId))
  }

  return (
    <UserContext.Provider
      value={{
        user,
        registeredCourses,
        pendingCourses,
        completedCoursesList,
        totalCompletedCredits,
        setRegisteredCourses,
        addPendingCourse,
        confirmPendingCourse,
        removePendingCourse,
        addRegisteredCourse,
        removeRegisteredCourse
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

