import { Course } from '../types/course'

interface CourseDetailModalProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
}

const CourseDetailModal = ({ course, isOpen, onClose }: CourseDetailModalProps) => {
  if (!isOpen || !course) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-aup-blue to-blue-800 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{course.code}</h2>
              <h3 className="text-xl">{course.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm font-medium text-gray-600">Credits:</span>
              <p className="text-lg font-semibold text-gray-800">{course.credits}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Department:</span>
              <p className="text-lg font-semibold text-gray-800">{course.department}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Professor:</span>
              <p className="text-lg font-semibold text-gray-800">{course.professor}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Location:</span>
              <p className="text-lg font-semibold text-gray-800">{course.location}</p>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium text-gray-600">Schedule:</span>
              <p className="text-lg font-semibold text-gray-800">{course.schedule}</p>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium text-gray-600">Availability:</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      (course.availableSpots / course.totalSpots) * 100 < 25
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(course.availableSpots / course.totalSpots) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {course.availableSpots} / {course.totalSpots} spots available
                </span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600">Description:</span>
            <p className="text-gray-700 mt-2 leading-relaxed">{course.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailModal

