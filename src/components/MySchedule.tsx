import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import WeeklyCalendar from './WeeklyCalendar'
import RegisteredCoursesList from './RegisteredCoursesList'

const MySchedule = () => {
  const navigate = useNavigate()
  const { registeredCourses, removeRegisteredCourse } = useUser()

  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-aup-blue to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">American University of Paris</h1>
              <p className="text-blue-200 mt-1">My Schedule</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <WeeklyCalendar courses={registeredCourses} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registered Courses</h2>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Credits:</span>
                  <span className="text-lg font-bold text-aup-blue">{totalCredits}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 12-18 credits per semester
                </p>
              </div>

              {registeredCourses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No courses registered yet</p>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-4 px-4 py-2 bg-aup-blue text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <RegisteredCoursesList
                  courses={registeredCourses}
                  onDrop={removeRegisteredCourse}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySchedule

