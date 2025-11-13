import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { degreeRequirements } from '../data/degreeRequirements'
import { useUser } from '../context/UserContext'
import { availableCourses } from '../data/courses'
import CourseDetailModal from './CourseDetailModal'
import { Course } from '../types/course'

const CourseCatalogue = () => {
  const navigate = useNavigate()
  const { registeredCourses, completedCoursesList, totalCompletedCredits } = useUser()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Get completed course names
  const completedCourseNames = completedCoursesList.map(course => 
    `${course.code} - ${course.title}`
  )

  // Calculate remaining requirements
  const calculateProgress = (requirement: typeof degreeRequirements[0]) => {
    let completed = 0
    
    if (requirement.requiredCourses) {
      // Count specific required courses completed
      completed = requirement.requiredCourses.filter(courseCode => {
        return completedCoursesList.some(course => course.code === courseCode)
      }).length
    } else {
      // For credit-based requirements, calculate from completed credits
      completed = Math.min(totalCompletedCredits, requirement.requiredCredits)
    }
    
    const remaining = requirement.requiredCredits - completed
    const percentage = Math.min((completed / requirement.requiredCredits) * 100, 100)
    
    return { completed, remaining, percentage }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-aup-blue to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">American University of Paris</h1>
              <p className="text-blue-200 mt-1">Course Catalogue & Degree Progress</p>
            </div>
            <button
              onClick={() => navigate('/welcome')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-2">Courses Completed</div>
            <div className="text-4xl font-bold text-aup-blue">{completedCoursesList.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-2">Credits Completed</div>
            <div className="text-4xl font-bold text-aup-blue">{totalCompletedCredits}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-sm text-gray-600 mb-2">Credits Remaining</div>
            <div className="text-4xl font-bold text-green-600">
              {120 - totalCompletedCredits}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Completed Courses */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Completed Courses</h2>
            {completedCourseNames.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No courses completed yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {completedCoursesList.map((course, index) => {
                  const fullCourse = availableCourses.find(c => c.code === course.code)
                  return (
                    <div
                      key={index}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 cursor-pointer transition-colors"
                      onClick={() => {
                        if (fullCourse) {
                          setSelectedCourse(fullCourse)
                          setShowModal(true)
                        }
                      }}
                    >
                      <div className="text-sm font-medium text-gray-800">{course.code} - {course.title}</div>
                      {fullCourse && (
                        <div className="text-xs text-gray-500 mt-1">Click to view details</div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Degree Requirements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Degree Requirements</h2>
            <div className="space-y-6">
              {degreeRequirements.map((requirement) => {
                const progress = calculateProgress(requirement)
                return (
                  <div key={requirement.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">{requirement.category}</h3>
                      <span className="text-sm text-gray-600">
                        {progress.completed} / {requirement.requiredCredits} credits
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{requirement.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-aup-blue h-3 rounded-full transition-all"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {progress.remaining > 0 ? (
                        <span className="text-orange-600">{progress.remaining} credits remaining</span>
                      ) : (
                        <span className="text-green-600">Requirement fulfilled!</span>
                      )}
                    </div>
                    {requirement.requiredCourses && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs font-medium text-gray-700 mb-2">Required Courses:</div>
                        <div className="flex flex-wrap gap-2">
                          {requirement.requiredCourses.map((courseCode) => {
                            const isCompleted = completedCoursesList.some(course => 
                              course.code === courseCode
                            )
                            return (
                              <span
                                key={courseCode}
                                className={`text-xs px-2 py-1 rounded ${
                                  isCompleted
                                    ? 'bg-green-100 text-green-800 border border-green-300'
                                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                                }`}
                              >
                                {courseCode} {isCompleted && '✓'}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Current Registration */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Currently Registered Courses</h2>
          {registeredCourses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No courses currently registered</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-4 px-6 py-2 bg-aup-blue text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registeredCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="font-semibold text-gray-800">{course.code}</div>
                  <div className="text-sm text-gray-600">{course.title}</div>
                  <div className="text-xs text-gray-500 mt-2">{course.credits} credits</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CourseDetailModal
        course={selectedCourse}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedCourse(null)
        }}
      />
    </div>
  )
}

export default CourseCatalogue

