import { RegisteredCourse } from '../types/course'
import { buildWeeklySchedule, timeToMinutes } from '../utils/scheduleParser'
import { getDepartmentColor } from '../utils/departmentColors'

interface WeeklyCalendarProps {
  courses: RegisteredCourse[]
}

const WeeklyCalendar = ({ courses }: WeeklyCalendarProps) => {
  const weeklySchedule = buildWeeklySchedule(courses)
  
  // Generate time slots from 8:00 AM to 8:00 PM (every 30 minutes)
  const timeSlots: string[] = []
  for (let hour = 8; hour < 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`)
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`)
  }

  const getSlotPosition = (startTime: string, endTime: string) => {
    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)
    const dayStart = 8 * 60 // 8:00 AM
    const dayEnd = 20 * 60 // 8:00 PM
    const totalMinutes = dayEnd - dayStart
    
    const top = ((startMinutes - dayStart) / totalMinutes) * 100
    const height = ((endMinutes - startMinutes) / totalMinutes) * 100
    
    return { top: `${top}%`, height: `${height}%` }
  }

  const getCourseColor = (course: RegisteredCourse) => {
    return getDepartmentColor(course.department)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Weekly Schedule</h2>
      
      {courses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No courses registered</p>
          <p className="text-sm mt-2">Register for courses to see your schedule</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header with day names */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm font-semibold text-gray-600 p-2">Time</div>
              {weeklySchedule.map(day => (
                <div key={day.day} className="text-sm font-semibold text-gray-700 p-2 text-center border-b-2 border-aup-blue">
                  {day.day.substring(0, 3)}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="relative border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-6 gap-0">
                {/* Time column */}
                <div className="border-r border-gray-200 bg-gray-50">
                  {timeSlots.map((time, index) => (
                    <div
                      key={time}
                      className="border-b border-gray-100 text-xs text-gray-600 p-1 h-12 flex items-center"
                      style={{ minHeight: '48px' }}
                    >
                      {index % 2 === 0 && (
                        <span className="font-medium">{time}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Day columns */}
                {weeklySchedule.map((daySchedule) => (
                  <div key={daySchedule.day} className="relative border-r border-gray-200 last:border-r-0">
                    {/* Time grid lines */}
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="border-b border-gray-100 h-12"
                        style={{ minHeight: '48px' }}
                      />
                    ))}

                    {/* Course blocks */}
                    {daySchedule.slots.map((slot, slotIndex) => {
                      const position = getSlotPosition(slot.startTime, slot.endTime)
                      const colorClass = getCourseColor(slot.course)
                      
                      return (
                        <div
                          key={`${slot.course.id}-${slotIndex}`}
                          className={`absolute left-0 right-0 ${colorClass} text-white rounded p-2 shadow-md hover:shadow-lg transition-shadow z-10 border-l-4 border-white`}
                          style={{
                            top: position.top,
                            height: position.height,
                            minHeight: '60px'
                          }}
                        >
                          <div className="text-xs font-bold mb-1">{slot.course.code}</div>
                          <div className="text-xs opacity-90">{slot.course.title}</div>
                          <div className="text-xs opacity-75 mt-1">
                            {slot.startTime} - {slot.endTime}
                          </div>
                          <div className="text-xs opacity-75">{slot.course.location}</div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Registered Courses:</h3>
              <div className="flex flex-wrap gap-2">
                {courses.map(course => (
                  <div key={course.id} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${getCourseColor(course)}`} />
                    <span className="text-xs text-gray-700">{course.code} - {course.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeeklyCalendar

