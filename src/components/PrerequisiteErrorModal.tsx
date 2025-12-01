import { Course } from '../types/course'
import { availableCourses } from '../data/courses'

interface PrerequisiteErrorModalProps {
  isOpen: boolean
  onClose: () => void
  course: Course | null
  missingPrerequisites: string[]
}

const PrerequisiteErrorModal = ({ isOpen, onClose, course, missingPrerequisites }: PrerequisiteErrorModalProps) => {
  if (!isOpen || !course) return null

  // Get full course info for missing prerequisites
  const prerequisiteCourses = missingPrerequisites
    .map(code => availableCourses.find(c => c.code === code))
    .filter(Boolean) as Course[]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Prerequisite Not Fulfilled</h2>
              <p className="text-red-100">You cannot register for this course yet</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-semibold mb-2">
                You are trying to register for:
              </p>
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-aup-blue">{course.code}</span>
                <span className="text-gray-700">{course.title}</span>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Missing Prerequisites:
              </p>
              <div className="space-y-3">
                {prerequisiteCourses.length > 0 ? (
                  prerequisiteCourses.map((prereq) => (
                    <div
                      key={prereq.id}
                      className="bg-white border-2 border-yellow-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-aup-blue">{prereq.code}</span>
                            <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded">
                              Required
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-1">{prereq.title}</h4>
                          <p className="text-sm text-gray-600">{prereq.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            <span className="font-medium">Department:</span> {prereq.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600">
                    {missingPrerequisites.map((code, index) => (
                      <span key={index} className="font-mono bg-gray-100 px-2 py-1 rounded mr-2">
                        {code}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <span className="font-semibold">What to do:</span> Complete the required prerequisite courses listed above before registering for this course. 
                You can view your completed courses in the "Completed Courses" section.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrerequisiteErrorModal

