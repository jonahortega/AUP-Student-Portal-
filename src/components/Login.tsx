import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  onLogin: () => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Simple validation - in a real app, this would call an API
    if (email && password) {
      onLogin()
      navigate('/welcome')
    } else {
      setError('Please enter both email and password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-aup-blue via-blue-900 to-aup-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-4 mb-4 shadow-lg">
            <svg className="w-16 h-16 text-aup-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 01.787 1.838L1.817 13.48a1 1 0 00-.633 1.265l2.5 8a1 1 0 001.265.633l7-2.25a1 1 0 00.633-1.265l-2.5-8a1 1 0 00-.633-1.265L8.5 9.5l-1.5-.643a1 1 0 01-.787-1.838l4-1.714a1 1 0 11.788 1.838l-4 1.714a1 1 0 01-.787-1.838l1.5.643 1.5.643a1 1 0 01.787 1.838l-1.5.643-1.5.643a1 1 0 01-.787-1.838l1.5-.643z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">American University of Paris</h1>
          <p className="text-blue-200">Student Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign In</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aup-blue focus:border-transparent transition-all outline-none"
                placeholder="student@aup.edu"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aup-blue focus:border-transparent transition-all outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-aup-blue border-gray-300 rounded focus:ring-aup-blue" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-aup-blue hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-aup-blue hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New student?{' '}
              <a href="#" className="text-aup-blue hover:underline font-medium">
                Contact Admissions
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200 text-sm mt-6">
          © 2024 American University of Paris. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login

