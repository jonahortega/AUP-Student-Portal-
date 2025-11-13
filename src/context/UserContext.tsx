import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { User } from '../types/user'
import { RegisteredCourse } from '../types/course'
import { defaultUser } from '../data/user'
import { availableCourses } from '../data/courses'
import { completedCoursesData } from '../data/completedCourses'

interface UserContextType {
  user: User
  registeredCourses: RegisteredCourse[]
  completedCoursesList: Array<{ code: string; title: string; credits: number; professor: string }>
  totalCompletedCredits: number
  setRegisteredCourses: (courses: RegisteredCourse[]) => void
  addRegisteredCourse: (course: RegisteredCourse) => void
  removeRegisteredCourse: (courseId: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User>(defaultUser)
  const [registeredCourses, setRegisteredCourses] = useState<RegisteredCourse[]>([])

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
        completedCoursesList,
        totalCompletedCredits,
        setRegisteredCourses,
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

