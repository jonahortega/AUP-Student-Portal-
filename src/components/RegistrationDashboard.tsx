import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Course, RegisteredCourse } from '../types/course'
import { availableCourses } from '../data/courses'
import { useUser } from '../context/UserContext'
import CourseCard from './CourseCard'
import RegisteredCoursesList from './RegisteredCoursesList'
import WeeklyCalendar from './WeeklyCalendar'

const RegistrationDashboard = () => {
  const { registeredCourses, addRegisteredCourse, removeRegisteredCourse } = useUser()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'courses' | 'calendar'>('courses')
  const navigate = useNavigate()

  const departments = ['all', ...Array.from(new Set(availableCourses.map(c => c.department)))]

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.professor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment
    const notRegistered = !registeredCourses.some(rc => rc.id === course.id)
    return matchesSearch && matchesDepartment && notRegistered
  })

  const handleRegister = (course: Course) => {
    const registeredCourse: RegisteredCourse = {
      ...course,
      registeredAt: new Date().toISOString()
    }
    addRegisteredCourse(registeredCourse)
  }

  const handleDrop = (courseId: string) => {
    removeRegisteredCourse(courseId)
  }

  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0)

  const handleBackToWelcome = () => {
    navigate('/welcome')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-aup-blue to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">American University of Paris</h1>
              <p className="text-blue-200 mt-1">Course Registration System</p>
            </div>
            <button
              onClick={handleBackToWelcome}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setViewMode('courses')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'courses'
                ? 'bg-aup-blue text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Browse Courses
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'calendar'
                ? 'bg-aup-blue text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            View Calendar
          </button>
        </div>

        {viewMode === 'calendar' ? (
          <WeeklyCalendar courses={registeredCourses} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Course Search */}
            <div className="lg:col-span-2">
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search Courses</h2>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Search by course code, title, or professor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aup-blue focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Department
                    </label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aup-blue focus:border-transparent outline-none"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>
                          {dept === 'all' ? 'All Departments' : dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Available Courses */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Available Courses ({filteredCourses.length})
                </h3>
                
                {filteredCourses.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <p className="text-gray-500">No courses found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCourses.map(course => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onRegister={() => handleRegister(course)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Registered Courses */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Schedule</h2>
                
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
                    <p className="text-sm mt-2">Browse and register for courses to get started</p>
                  </div>
                ) : (
                  <RegisteredCoursesList
                    courses={registeredCourses}
                    onDrop={handleDrop}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegistrationDashboard

