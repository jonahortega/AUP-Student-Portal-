import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useAuth } from '../App'

const WelcomeDashboard = () => {
  const navigate = useNavigate()
  const { user, registeredCourses, totalCompletedCredits } = useUser()
  const { setIsAuthenticated } = useAuth()

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Course Catalogue', path: '/catalogue', icon: '📚' },
    { name: 'My Schedule', path: '/schedule', icon: '📅' },
    { name: 'Profile', path: '/profile', icon: '👤' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-aup-blue via-blue-900 to-aup-blue">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">American University of Paris</h1>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false)
                navigate('/login')
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white rounded-full p-6 mb-6 shadow-2xl">
            <svg className="w-20 h-20 text-aup-blue" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Welcome, {user.firstName} {user.lastName}
          </h2>
          <p className="text-xl text-blue-200 mb-2">{user.year}</p>
          <p className="text-lg text-blue-100">Student ID: {user.idNumber}</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-aup-blue transition-colors">
                {item.name}
              </h3>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="text-3xl font-bold mb-2">{registeredCourses.length}</div>
            <div className="text-blue-200">Courses Registered</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="text-3xl font-bold mb-2">
              {registeredCourses.reduce((sum, course) => sum + course.credits, 0)}
            </div>
            <div className="text-blue-200">Current Credits</div>
          </div>
          <button
            onClick={() => navigate('/completed-courses')}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white hover:bg-white/20 transition-all cursor-pointer text-left"
          >
            <div className="text-3xl font-bold mb-2">{totalCompletedCredits}</div>
            <div className="text-blue-200">Credits Completed</div>
            <div className="text-xs text-blue-300 mt-2">Click to view details →</div>
          </button>
          <button
            onClick={() => navigate('/required-courses')}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white hover:bg-white/20 transition-all cursor-pointer text-left"
          >
            <div className="text-3xl font-bold mb-2">{120 - totalCompletedCredits}</div>
            <div className="text-blue-200">Credits Remaining</div>
            <div className="text-xs text-blue-300 mt-2">Click to view required courses →</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeDashboard

