import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import { UserProvider } from './context/UserContext'
import Login from './components/Login'
import WelcomeDashboard from './components/WelcomeDashboard'
import RegistrationDashboard from './components/RegistrationDashboard'
import CourseCatalogue from './components/CourseCatalogue'
import MySchedule from './components/MySchedule'
import Profile from './components/Profile'
import { useUser } from './context/UserContext'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

function AppRoutes() {
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const { user, registeredCourses } = useUser()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/welcome" replace />
          ) : (
            <Login onLogin={() => setIsAuthenticated(true)} />
          )
        } 
      />
      <Route 
        path="/welcome" 
        element={
          isAuthenticated ? (
            <WelcomeDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? (
            <RegistrationDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/catalogue" 
        element={
          isAuthenticated ? (
            <CourseCatalogue 
              user={user} 
              registeredCourses={registeredCourses}
              completedCourses={user.completedCourses}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/schedule" 
        element={
          isAuthenticated ? (
            <MySchedule />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/profile" 
        element={
          isAuthenticated ? (
            <Profile user={user} />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
    </AuthProvider>
  )
}

export default App

