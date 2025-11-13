import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'

interface ProfileProps {
  user: User
}

const Profile = ({ user }: ProfileProps) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-aup-blue to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">American University of Paris</h1>
              <p className="text-blue-200 mt-1">Student Profile</p>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center mb-8">
            <div className="bg-aup-blue rounded-full p-6 mr-6">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-lg text-gray-600 mt-1">{user.year}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div className="text-lg text-gray-900 font-medium">{user.firstName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <div className="text-lg text-gray-900 font-medium">{user.lastName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">AUP Email Address</label>
                  <div className="text-lg text-gray-900 font-medium">{user.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID Number</label>
                  <div className="text-lg text-gray-900 font-medium">{user.idNumber}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  <div className="text-lg text-gray-900 font-medium">{user.year}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                  <div className="text-lg text-gray-900 font-medium">{user.major}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Counselor</label>
                  <div className="text-lg text-gray-900 font-medium">{user.counselor}</div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Academic Progress</h3>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Completed Courses</div>
                    <div className="text-2xl font-bold text-aup-blue">{user.completedCourses.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Credits Completed</div>
                    <div className="text-2xl font-bold text-aup-blue">
                      {user.completedCourses.length * 3} {/* Assuming 3 credits per course */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

