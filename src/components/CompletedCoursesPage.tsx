import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const CompletedCoursesPage = () => {
  const navigate = useNavigate()
  const { completedCoursesList, totalCompletedCredits } = useUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-aup-blue to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">American University of Paris</h1>
              <p className="text-blue-200 mt-1">Completed Courses</p>
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
        {/* Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Total Courses Completed</div>
              <div className="text-4xl font-bold text-aup-blue">{completedCoursesList.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Total Credits Completed</div>
              <div className="text-4xl font-bold text-aup-blue">{totalCompletedCredits}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Credits Remaining</div>
              <div className="text-4xl font-bold text-green-600">{120 - totalCompletedCredits}</div>
            </div>
          </div>
        </div>

        {/* Completed Courses List */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Completed Courses</h2>
          {completedCoursesList.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No completed courses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCoursesList.map((course, index) => (
                <div key={index} className="border border-green-200 bg-green-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="font-bold text-lg text-gray-800 mb-1">{course.code}</div>
                      <div className="text-sm text-gray-600 mb-2">{course.title}</div>
                    </div>
                    <span className="text-xs font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                      {course.credits} cr
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 border-t border-green-200 pt-2">
                    <span className="font-medium">Professor:</span> {course.professor}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompletedCoursesPage

