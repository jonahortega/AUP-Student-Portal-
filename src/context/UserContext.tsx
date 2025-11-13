import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../types/user'
import { RegisteredCourse } from '../types/course'
import { defaultUser } from '../data/user'

interface UserContextType {
  user: User
  registeredCourses: RegisteredCourse[]
  setRegisteredCourses: (courses: RegisteredCourse[]) => void
  addRegisteredCourse: (course: RegisteredCourse) => void
  removeRegisteredCourse: (courseId: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User>(defaultUser)
  const [registeredCourses, setRegisteredCourses] = useState<RegisteredCourse[]>([])

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

