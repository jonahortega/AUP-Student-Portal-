import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useAuth } from '../App'
import CreditsOverviewModal from './CreditsOverviewModal'

const WelcomeDashboard = () => {
  const navigate = useNavigate()
  const { user, registeredCourses, pendingCourses, totalCompletedCredits } = useUser()
  const { setIsAuthenticated } = useAuth()
  const [showCreditsModal, setShowCreditsModal] = useState(false)

  const menuItems = [
    { 
      name: 'Course Registration', 
      path: '/dashboard', 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: 'Browse and register for courses',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'My Schedule', 
      path: '/schedule', 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: 'View your weekly calendar',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Course Catalogue', 
      path: '/catalogue', 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: 'Browse all available courses',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: 'View your student profile',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const currentCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0)
  const pendingCredits = pendingCourses.reduce((sum, course) => sum + course.credits, 0)
  const remainingCredits = 128 - totalCompletedCredits

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-aup-blue">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md shadow-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg p-2">
                <svg className="w-8 h-8 text-aup-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">American University of Paris</h1>
                <p className="text-sm text-blue-200">Student Portal</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false)
                navigate('/login')
              }}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-white border border-white/20 backdrop-blur-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-br from-white to-blue-50 rounded-full p-8 mb-6 shadow-2xl border-4 border-white/20">
            <svg className="w-24 h-24 text-aup-blue" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome, {user.firstName}!
          </h2>
          <p className="text-2xl text-blue-200 mb-2">{user.year}</p>
          <p className="text-lg text-blue-100">Student ID: {user.idNumber}</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:scale-105 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className={`text-aup-blue mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-aup-blue transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20 hover:bg-white/15 transition-all shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 rounded-lg p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold mb-2">{registeredCourses.length}</div>
            <div className="text-blue-200 font-medium">Courses Registered</div>
            {pendingCourses.length > 0 && (
              <div className="text-xs text-yellow-300 mt-2 flex items-center gap-1">
                <span>⏳</span> {pendingCourses.length} pending
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20 hover:bg-white/15 transition-all shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 rounded-lg p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold mb-2">{currentCredits}</div>
            <div className="text-blue-200 font-medium">Current Credits</div>
            {pendingCredits > 0 && (
              <div className="text-xs text-yellow-300 mt-2">
                +{pendingCredits} pending
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/completed-courses')}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white hover:bg-white/15 transition-all cursor-pointer text-left border border-white/20 hover:border-white/40 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/20 rounded-lg p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold mb-2">{totalCompletedCredits}</div>
            <div className="text-blue-200 font-medium">Credits Completed</div>
            <div className="text-xs text-blue-300 mt-2 flex items-center gap-1">
              View details <span>→</span>
            </div>
          </button>

          <button
            onClick={() => setShowCreditsModal(true)}
            className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-6 text-white hover:from-orange-500/30 hover:to-orange-600/30 transition-all cursor-pointer text-left border-2 border-orange-400/30 hover:border-orange-400/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500/30 rounded-lg p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold mb-2">{remainingCredits}</div>
            <div className="text-orange-200 font-medium">Credits Remaining</div>
            <div className="text-xs text-orange-300 mt-2 flex items-center gap-1">
              View overview <span>→</span>
            </div>
          </button>
        </div>
      </div>

      <CreditsOverviewModal 
        isOpen={showCreditsModal} 
        onClose={() => setShowCreditsModal(false)} 
      />
    </div>
  )
}

export default WelcomeDashboard

