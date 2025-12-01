import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { degreeRequirements } from '../data/degreeRequirements'
import { availableCourses } from '../data/courses'
import { completedCoursesData } from '../data/completedCourses'

const RequiredCoursesPage = () => {
  const navigate = useNavigate()
  const { completedCoursesList, totalCompletedCredits } = useUser()

  // Get all courses (available + completed data)
  const allCourses = [...availableCourses, ...completedCoursesData]

  // Calculate what courses are still needed
  const getRequiredCourses = () => {
    const required: Array<{
      category: string
      requiredCredits: number
      completedCredits: number
      remainingCredits: number
      courses: Array<{ code: string; title: string; credits: number; department: string }>
    }> = []

    degreeRequirements.forEach(requirement => {
      if (requirement.id === 'total') return // Skip total requirement

      let completedCredits = 0
      const completedCourseCodes = new Set(completedCoursesList.map(c => c.code))

      if (requirement.requiredCourses) {
        // For specific required courses
        const neededCourses = requirement.requiredCourses
          .filter(code => !completedCourseCodes.has(code))
          .map(code => {
            const course = allCourses.find(c => c.code === code)
            return course ? {
              code: course.code,
              title: course.title,
              credits: course.credits,
              department: course.department
            } : null
          })
          .filter(Boolean) as Array<{ code: string; title: string; credits: number; department: string }>

        completedCredits = requirement.requiredCourses.filter(code => 
          completedCourseCodes.has(code)
        ).length * 3 // Assuming 3 credits per course

        required.push({
          category: requirement.category,
          requiredCredits: requirement.requiredCredits,
          completedCredits,
          remainingCredits: requirement.requiredCredits - completedCredits,
          courses: neededCourses
        })
      } else {
        // For credit-based requirements
        completedCredits = Math.min(totalCompletedCredits, requirement.requiredCredits)
        const remainingCredits = requirement.requiredCredits - completedCredits

        // Get available courses in relevant departments
        const relevantCourses = availableCourses
          .filter(course => {
            // Match courses to requirement category
            if (requirement.category.includes('Core')) {
              return ['History', 'English', 'Mathematics'].includes(course.department)
            } else if (requirement.category.includes('Electives')) {
              return true // Any course can be an elective
            } else if (requirement.category.includes('Language')) {
              return course.department === 'French Studies'
            }
            return false
          })
          .map(course => ({
            code: course.code,
            title: course.title,
            credits: course.credits,
            department: course.department
          }))

        required.push({
          category: requirement.category,
          requiredCredits: requirement.requiredCredits,
          completedCredits,
          remainingCredits,
          courses: relevantCourses.slice(0, Math.ceil(remainingCredits / 3)) // Show enough courses to fulfill requirement
        })
      }
    })

    return required
  }

  const requiredCourses = getRequiredCourses()
  const totalRemaining = 128 - totalCompletedCredits

  // Get all available courses that haven't been completed
  const completedCourseCodes = new Set(completedCoursesList.map(c => c.code))
  const availableCoursesToTake = availableCourses
    .filter(course => !completedCourseCodes.has(course.code))
    .map(course => ({
      code: course.code,
      title: course.title,
      credits: course.credits,
      department: course.department,
      professor: course.professor,
      schedule: course.schedule,
      location: course.location
    }))

  // Calculate total credits available from courses
  const totalAvailableCredits = availableCoursesToTake.reduce((sum, course) => sum + course.credits, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-aup-blue to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">American University of Paris</h1>
              <p className="text-blue-200 mt-1">Required Courses for Degree Completion</p>
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
              <div className="text-sm text-gray-600 mb-2">Credits Completed</div>
              <div className="text-4xl font-bold text-aup-blue">{totalCompletedCredits}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Credits Remaining</div>
              <div className="text-4xl font-bold text-orange-600">{totalRemaining}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Available Courses</div>
              <div className="text-4xl font-bold text-green-600">{availableCoursesToTake.length}</div>
              <div className="text-xs text-gray-500 mt-1">({totalAvailableCredits} total credits available)</div>
            </div>
          </div>
        </div>

        {/* Available Courses to Fulfill Requirements */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Available Courses to Fulfill Remaining {totalRemaining} Credits
          </h2>
          <p className="text-gray-600 mb-6">
            These are all the courses currently available for registration that you can take to fulfill your remaining degree requirements.
          </p>
          {availableCoursesToTake.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No available courses found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableCoursesToTake.map((course, index) => (
                <div key={index} className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">{course.code}</div>
                      <div className="text-sm text-gray-600 mt-1">{course.title}</div>
                    </div>
                    <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded ml-2">
                      {course.credits} cr
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 space-y-1">
                    <div><span className="font-medium">Dept:</span> {course.department}</div>
                    <div><span className="font-medium">Prof:</span> {course.professor}</div>
                    <div><span className="font-medium">Schedule:</span> {course.schedule}</div>
                    <div><span className="font-medium">Location:</span> {course.location}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Required Courses by Category */}
        <div className="space-y-6">
          {requiredCourses.map((req, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{req.category}</h2>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="text-lg font-bold text-aup-blue">
                    {req.completedCredits} / {req.requiredCredits} credits
                  </div>
                  <div className="text-sm text-orange-600 font-medium">
                    {req.remainingCredits} credits remaining
                  </div>
                </div>
              </div>

              {req.remainingCredits > 0 ? (
                <>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-aup-blue h-3 rounded-full transition-all"
                        style={{ width: `${(req.completedCredits / req.requiredCredits) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Recommended Courses to Fulfill This Requirement:
                    </h3>
                    {req.courses.length === 0 ? (
                      <p className="text-gray-500 italic">No specific courses required. Choose from available electives.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {req.courses.map((course, courseIndex) => (
                          <div key={courseIndex} className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <div className="font-bold text-gray-800">{course.code}</div>
                                <div className="text-sm text-gray-600 mt-1">{course.title}</div>
                              </div>
                              <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded ml-2">
                                {course.credits} cr
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              {course.department}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <span className="text-green-700 font-semibold">✓ Requirement Fulfilled!</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RequiredCoursesPage

