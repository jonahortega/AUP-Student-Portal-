import { RegisteredCourse } from '../types/course'
import { getDepartmentColorLight } from '../utils/departmentColors'

interface RegisteredCoursesListProps {
  courses: RegisteredCourse[]
  onDrop: (courseId: string) => void
}

const RegisteredCoursesList = ({ courses, onDrop }: RegisteredCoursesListProps) => {
  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto">
      {courses.map(course => (
        <div
          key={course.id}
          className="border-2 border-green-200 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-aup-blue text-sm">{course.code}</span>
                <span className="text-xs text-gray-500">{course.credits} cr</span>
                <span className={`px-2 py-0.5 border rounded text-xs ${getDepartmentColorLight(course.department)}`}>
                  {course.department}
                </span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                  {course.term}
                </span>
              </div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h4>
              <p className="text-xs text-gray-600 mb-1">{course.professor}</p>
              <p className="text-xs text-gray-500">{course.schedule}</p>
              <p className="text-xs text-gray-500 mt-1">{course.location}</p>
            </div>
          </div>
          <button
            onClick={() => onDrop(course.id)}
            className="w-full mt-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded transition-colors border border-red-200"
          >
            Drop Course
          </button>
        </div>
      ))}
    </div>
  )
}

export default RegisteredCoursesList

