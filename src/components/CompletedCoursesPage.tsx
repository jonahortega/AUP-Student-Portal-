import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { availableCourses } from '../data/courses'
import { getDepartmentColorLight } from '../utils/departmentColors'

const CompletedCoursesPage = () => {
  const navigate = useNavigate()
  const { completedCoursesList, totalCompletedCredits } = useUser()

  const getFullCourseInfo = (code: string) => {
    return availableCourses.find(c => c.code === code)
  }

  const progressPercentage = (totalCompletedCredits / 128) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-aup-blue via-blue-700 to-aup-blue text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">American University of Paris</h1>
              <p className="text-blue-200 text-lg">Academic Transcript - Completed Courses</p>
            </div>
            <button
              onClick={() => navigate('/welcome')}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium backdrop-blur-sm"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-aup-blue transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Courses Completed</div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-aup-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-5xl font-bold text-aup-blue mb-2">{completedCoursesList.length}</div>
            <div className="text-sm text-gray-500">Total courses</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Credits Completed</div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-5xl font-bold text-green-600 mb-2">{totalCompletedCredits}</div>
            <div className="text-sm text-gray-500">out of 128 required</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Credits Remaining</div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-5xl font-bold text-purple-600 mb-2">{128 - totalCompletedCredits}</div>
            <div className="text-sm text-gray-500">to graduation</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Degree Progress</h3>
            <span className="text-sm font-bold text-aup-blue">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-aup-blue to-blue-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 10 && (
                <span className="text-xs font-bold text-white">{Math.round(progressPercentage)}%</span>
              )}
            </div>
          </div>
        </div>

        {/* Completed Courses List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span className="bg-green-100 rounded-full p-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Completed Courses
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
              {completedCoursesList.length} courses
            </span>
          </div>
          {completedCoursesList.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xl text-gray-500 mb-2">No completed courses yet</p>
              <p className="text-sm text-gray-400">Start registering for courses to build your transcript</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCoursesList.map((course, index) => {
                const fullCourse = getFullCourseInfo(course.code)
                return (
                  <div
                    key={index}
                    className="group border-2 border-green-200 bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-bold text-xl text-aup-blue">{course.code}</span>
                          <span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full">
                            {course.credits} Credits
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-base mb-2 leading-tight">{course.title}</h3>
                        {fullCourse && (
                          <span className={`inline-block px-3 py-1 border rounded-lg text-xs font-medium mb-2 ${getDepartmentColorLight(fullCourse.department)}`}>
                            {fullCourse.department}
                          </span>
                        )}
                      </div>
                      <div className="bg-green-100 rounded-full p-2 ml-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="border-t border-green-200 pt-3 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-medium">Professor:</span>
                        <span>{course.professor}</span>
                      </div>
                      {fullCourse && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{fullCourse.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompletedCoursesPage

