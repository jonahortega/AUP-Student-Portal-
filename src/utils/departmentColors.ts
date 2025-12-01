// Department color mapping for consistent color coding
export const getDepartmentColor = (department: string): string => {
  const colorMap: { [key: string]: string } = {
    'Computer Science': 'bg-blue-500',
    'Mathematics': 'bg-purple-500',
    'History': 'bg-amber-500',
    'French Studies': 'bg-red-500',
    'Art History': 'bg-pink-500',
    'Philosophy': 'bg-indigo-500',
    'Economics': 'bg-green-500',
    'Literature': 'bg-teal-500',
    'Political Science': 'bg-orange-500',
  }
  
  return colorMap[department] || 'bg-gray-500'
}

export const getDepartmentColorLight = (department: string): string => {
  const colorMap: { [key: string]: string } = {
    'Computer Science': 'bg-blue-50 border-blue-200 text-blue-800',
    'Mathematics': 'bg-purple-50 border-purple-200 text-purple-800',
    'History': 'bg-amber-50 border-amber-200 text-amber-800',
    'French Studies': 'bg-red-50 border-red-200 text-red-800',
    'Art History': 'bg-pink-50 border-pink-200 text-pink-800',
    'Philosophy': 'bg-indigo-50 border-indigo-200 text-indigo-800',
    'Economics': 'bg-green-50 border-green-200 text-green-800',
    'Literature': 'bg-teal-50 border-teal-200 text-teal-800',
    'Political Science': 'bg-orange-50 border-orange-200 text-orange-800',
  }
  
  return colorMap[department] || 'bg-gray-50 border-gray-200 text-gray-800'
}

export const getDepartmentColorText = (department: string): string => {
  const colorMap: { [key: string]: string } = {
    'Computer Science': 'text-blue-600',
    'Mathematics': 'text-purple-600',
    'History': 'text-amber-600',
    'French Studies': 'text-red-600',
    'Art History': 'text-pink-600',
    'Philosophy': 'text-indigo-600',
    'Economics': 'text-green-600',
    'Literature': 'text-teal-600',
    'Political Science': 'text-orange-600',
  }
  
  return colorMap[department] || 'text-gray-600'
}

