import { useState } from 'react'
import { Course } from '../types/course'
import CourseDetailModal from './CourseDetailModal'
import { getDepartmentColorLight, getDepartmentColorText } from '../utils/departmentColors'

interface CourseCardProps {
  course: Course
  onRegister: () => void
  isPending?: boolean
  errorMessage?: string | null
}

const CourseCard = ({ course, onRegister, isPending = false, errorMessage }: CourseCardProps) => {
  const [showModal, setShowModal] = useState(false)
  const spotsPercentage = (course.availableSpots / course.totalSpots) * 100
  const isLowAvailability = spotsPercentage < 25

  return (
    <>
      <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-2 ${
        isPending ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
      } cursor-pointer`} onClick={() => setShowModal(true)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-lg font-bold text-aup-blue">{course.code}</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
              {course.credits} {course.credits === 1 ? 'Credit' : 'Credits'}
            </span>
            <span className={`px-3 py-1 border rounded text-xs font-medium ${getDepartmentColorLight(course.department)}`}>
              {course.department}
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
              {course.term}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-medium">⚠️ {errorMessage}</p>
        </div>
      )}

      {isPending && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">⏳ Pending confirmation</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-500">Professor:</span>
          <p className="font-medium text-gray-800">{course.professor}</p>
        </div>
        <div>
          <span className="text-gray-500">Schedule:</span>
          <p className="font-medium text-gray-800">{course.schedule}</p>
        </div>
        <div>
          <span className="text-gray-500">Location:</span>
          <p className="font-medium text-gray-800">{course.location}</p>
        </div>
        <div>
          <span className="text-gray-500">Availability:</span>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isLowAvailability ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${spotsPercentage}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${
              isLowAvailability ? 'text-red-600' : 'text-green-600'
            }`}>
              {course.availableSpots}/{course.totalSpots}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onRegister()
        }}
        disabled={course.availableSpots === 0 || isPending}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
          course.availableSpots === 0 || isPending
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-aup-blue hover:bg-blue-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        {course.availableSpots === 0 ? 'Full' : isPending ? 'Pending Confirmation' : 'Register'}
      </button>
      <div className="mt-2 text-center">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowModal(true)
          }}
          className="text-sm text-aup-blue hover:underline"
        >
          View Course Details
        </button>
      </div>
    </div>
    <CourseDetailModal
      course={course}
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    />
    </>
  )
}

export default CourseCard


