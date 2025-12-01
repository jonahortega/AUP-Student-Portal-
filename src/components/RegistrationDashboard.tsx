import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Course, PendingCourse, Term } from '../types/course'
import { availableCourses } from '../data/courses'
import { useUser } from '../context/UserContext'
import CourseCard from './CourseCard'
import RegisteredCoursesList from './RegisteredCoursesList'
import WeeklyCalendar from './WeeklyCalendar'
import { getDepartmentColorLight } from '../utils/departmentColors'
import PrerequisiteErrorModal from './PrerequisiteErrorModal'
import { parseSchedule } from '../utils/scheduleParser'

const RegistrationDashboard = () => {
  const { registeredCourses, pendingCourses, addPendingCourse, confirmPendingCourse, removePendingCourse, removeRegisteredCourse } = useUser()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedTerm, setSelectedTerm] = useState<Term>('Spring 2026')
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'courses' | 'calendar'>('courses')
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({})
  const [prerequisiteError, setPrerequisiteError] = useState<{ course: Course | null; missingPrerequisites: string[] } | null>(null)
  const navigate = useNavigate()

  const departments = ['all', ...Array.from(new Set(availableCourses.map(c => c.department)))]
  const terms: Term[] = ['Spring 2026', 'Fall 2026', 'Spring 2027', 'Fall 2027', 'Spring 2028', 'Fall 2028']
  const days = ['all', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.professor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment
    const matchesTerm = course.term === selectedTerm
    
    // Filter by day of week
    let matchesDay = true
    if (selectedDay !== 'all') {
      const scheduleData = parseSchedule(course.schedule)
      if (scheduleData) {
        matchesDay = scheduleData.days.some(day => day === selectedDay)
      } else {
        matchesDay = false
      }
    }
    
    const notRegistered = !registeredCourses.some(rc => rc.id === course.id)
    const notPending = !pendingCourses.some(pc => pc.id === course.id)
    return matchesSearch && matchesDepartment && matchesTerm && matchesDay && notRegistered && notPending
  })

  const handleAddToCart = (course: Course) => {
    setErrorMessages({ ...errorMessages, [course.id]: '' })
    setPrerequisiteError(null)
    const pendingCourse: PendingCourse = {
      ...course,
      pendingAt: new Date().toISOString()
    }
    const error = addPendingCourse(pendingCourse)
    if (error) {
      if (error.type === 'prerequisite_not_fulfilled' && error.missingPrerequisites) {
        setPrerequisiteError({
          course,
          missingPrerequisites: error.missingPrerequisites
        })
      } else {
        setErrorMessages({ ...errorMessages, [course.id]: error.message })
      }
    }
  }

  const handleConfirm = (courseId: string) => {
    confirmPendingCourse(courseId)
  }

  const handleRemovePending = (courseId: string) => {
    removePendingCourse(courseId)
    setErrorMessages({ ...errorMessages, [courseId]: '' })
  }

  const handleDrop = (courseId: string) => {
    removeRegisteredCourse(courseId)
  }

  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0)
  const pendingCredits = pendingCourses.reduce((sum, course) => sum + course.credits, 0)
  const totalCreditsWithPending = totalCredits + pendingCredits

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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Term
                      </label>
                      <select
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value as Term)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aup-blue focus:border-transparent outline-none"
                      >
                        {terms.map(term => (
                          <option key={term} value={term}>
                            {term}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Day of Week
                      </label>
                      <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aup-blue focus:border-transparent outline-none"
                      >
                        {days.map(day => (
                          <option key={day} value={day}>
                            {day === 'all' ? 'All Days' : 
                             day === 'Mon' ? 'Monday' :
                             day === 'Tue' ? 'Tuesday' :
                             day === 'Wed' ? 'Wednesday' :
                             day === 'Thu' ? 'Thursday' :
                             day === 'Fri' ? 'Friday' : day}
                          </option>
                        ))}
                      </select>
                    </div>
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
                        onRegister={() => handleAddToCart(course)}
                        errorMessage={errorMessages[course.id]}
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
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Registered Credits:</span>
                      <span className="text-lg font-bold text-aup-blue">{totalCredits}</span>
                    </div>
                    {pendingCredits > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-yellow-700">Pending Credits:</span>
                        <span className="text-lg font-bold text-yellow-600">{pendingCredits}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                      <span className="text-sm font-semibold text-gray-800">Total Credits:</span>
                      <span className={`text-lg font-bold ${
                        totalCreditsWithPending > 18 ? 'text-red-600' : 
                        totalCreditsWithPending === 18 ? 'text-green-600' : 'text-gray-800'
                      }`}>
                        {totalCreditsWithPending} / 18
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Maximum: 18 credits per semester
                  </p>
                </div>

                {/* Pending Courses */}
                {pendingCourses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-yellow-500">⏳</span> Pending Confirmation ({pendingCourses.length})
                    </h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {pendingCourses.map(course => (
                        <div
                          key={course.id}
                          className="border-2 border-yellow-400 rounded-lg p-4 bg-yellow-50"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-bold text-aup-blue text-sm">{course.code}</span>
                                <span className="text-xs text-gray-500">{course.credits} cr</span>
                                <span className={`px-2 py-0.5 border rounded text-xs ${getDepartmentColorLight(course.department)}`}>
                                  {course.department}
                                </span>
                              </div>
                              <h4 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h4>
                              <p className="text-xs text-gray-600 mb-1">{course.professor}</p>
                              <p className="text-xs text-gray-500">{course.schedule}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleConfirm(course.id)}
                              className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors"
                            >
                              ✓ Confirm
                            </button>
                            <button
                              onClick={() => handleRemovePending(course.id)}
                              className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded transition-colors border border-red-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registered Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-green-500">✓</span> Registered Courses ({registeredCourses.length})
                  </h3>
                  {registeredCourses.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>No courses registered yet</p>
                      <p className="text-sm mt-2">Confirm pending courses to register</p>
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
          </div>
        )}
      </div>

      <PrerequisiteErrorModal
        isOpen={prerequisiteError !== null}
        onClose={() => setPrerequisiteError(null)}
        course={prerequisiteError?.course || null}
        missingPrerequisites={prerequisiteError?.missingPrerequisites || []}
      />
    </div>
  )
}

export default RegistrationDashboard

