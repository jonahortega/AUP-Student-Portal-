import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { availableCourses } from '../data/courses'
import { getDepartmentColorLight } from '../utils/departmentColors'

interface CreditsOverviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreditsOverviewModal = ({ isOpen, onClose }: CreditsOverviewModalProps) => {
  const { completedCoursesList, totalCompletedCredits, registeredCourses } = useUser()
  const [activeTab, setActiveTab] = useState<'overview' | 'remaining'>('overview')

  if (!isOpen) return null

  const remainingCredits = 128 - totalCompletedCredits
  const progressPercentage = (totalCompletedCredits / 128) * 100

  // Get completed course codes
  const completedCourseCodes = new Set(completedCoursesList.map(c => c.code))
  const registeredCourseCodes = new Set(registeredCourses.map(c => c.code))

  // Get all courses that haven't been completed or registered
  const remainingCourses = availableCourses.filter(course => 
    !completedCourseCodes.has(course.code) && !registeredCourseCodes.has(course.code)
  )

  // Get full course info for completed courses
  const completedCoursesWithInfo = completedCoursesList.map(course => {
    const fullCourse = availableCourses.find(c => c.code === course.code)
    return {
      ...course,
      department: fullCourse?.department || 'Unknown',
      term: fullCourse?.term || 'N/A'
  }
  })

  // Get registered courses info
  const registeredCoursesInfo = registeredCourses.map(course => ({
    code: course.code,
    title: course.title,
    credits: course.credits,
    department: course.department,
    term: course.term
  }))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-aup-blue to-blue-700 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Academic Progress Overview</h2>
            <p className="text-blue-200">Completed and Remaining Courses</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-aup-blue text-aup-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('remaining')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'remaining'
                  ? 'border-aup-blue text-aup-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Remaining Courses ({remainingCourses.length})
            </button>
          </div>

          {activeTab === 'overview' ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Completed</div>
              <div className="text-4xl font-bold text-aup-blue mb-1">{totalCompletedCredits}</div>
              <div className="text-sm text-gray-600">out of 128 credits</div>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
              <div className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Remaining</div>
              <div className="text-4xl font-bold text-orange-600 mb-1">{remainingCredits}</div>
              <div className="text-sm text-gray-600">credits to graduation</div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Progress</div>
              <div className="text-4xl font-bold text-green-600 mb-1">{Math.round(progressPercentage)}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Degree Progress</h3>
              <span className="text-lg font-semibold text-aup-blue">
                {totalCompletedCredits} / 128 credits
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-aup-blue to-blue-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${progressPercentage}%` }}
              >
                <span className="text-xs font-bold text-white">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Completed Courses */}
            <div className="bg-white border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Completed Courses</h3>
                  <p className="text-sm text-gray-600">{completedCoursesList.length} courses</p>
                </div>
              </div>
              {completedCoursesWithInfo.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No completed courses yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {completedCoursesWithInfo.map((course, index) => (
                    <div
                      key={index}
                      className="bg-green-50 border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-bold text-aup-blue">{course.code}</span>
                            <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs font-semibold rounded">
                              {course.credits} cr
                            </span>
                            <span className={`px-2 py-0.5 border rounded text-xs ${getDepartmentColorLight(course.department)}`}>
                              {course.department}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h4>
                          <p className="text-xs text-gray-600">{course.professor}</p>
                        </div>
                        <div className="bg-green-200 rounded-full p-1.5 ml-2">
                          <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Currently Registered Courses */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Currently Registered</h3>
                  <p className="text-sm text-gray-600">
                    {registeredCoursesInfo.length} courses ({registeredCoursesInfo.reduce((sum, c) => sum + c.credits, 0)} credits)
                  </p>
                </div>
              </div>
              {registeredCoursesInfo.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No courses currently registered</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {registeredCoursesInfo.map((course, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-bold text-aup-blue">{course.code}</span>
                            <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
                              {course.credits} cr
                            </span>
                            <span className={`px-2 py-0.5 border rounded text-xs ${getDepartmentColorLight(course.department)}`}>
                              {course.department}
                            </span>
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                              {course.term}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          </>
          ) : (
            <div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Courses Remaining to Graduate</h3>
                <p className="text-gray-600">
                  You need {remainingCredits} more credits to graduate. Here are all available courses you can take:
                </p>
              </div>

              {remainingCourses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No remaining courses available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
                  {remainingCourses.map((course) => {
                    const hasPrerequisites = course.prerequisites && course.prerequisites.length > 0
                    const missingPrereqs = hasPrerequisites
                      ? course.prerequisites!.filter(code => !completedCourseCodes.has(code))
                      : []
                    const canTake = !hasPrerequisites || missingPrereqs.length === 0

                    return (
                      <div
                        key={course.id}
                        className={`border-2 rounded-lg p-4 ${
                          canTake
                            ? 'border-blue-200 bg-blue-50 hover:shadow-md'
                            : 'border-gray-200 bg-gray-50 opacity-75'
                        } transition-shadow`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-aup-blue">{course.code}</span>
                              <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-xs font-semibold rounded">
                                {course.credits} cr
                              </span>
                              <span className={`px-2 py-0.5 border rounded text-xs ${getDepartmentColorLight(course.department)}`}>
                                {course.department}
                              </span>
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                                {course.term}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{course.professor}</p>
                            {hasPrerequisites && (
                              <div className="mt-2">
                                {missingPrereqs.length > 0 ? (
                                  <div className="bg-red-50 border border-red-200 rounded p-2">
                                    <p className="text-xs text-red-700 font-medium mb-1">Missing Prerequisites:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {missingPrereqs.map((code, idx) => (
                                        <span key={idx} className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded">
                                          {code}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-green-50 border border-green-200 rounded p-2">
                                    <p className="text-xs text-green-700 font-medium">✓ Prerequisites met</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-aup-blue text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreditsOverviewModal

