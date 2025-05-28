import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '../apps/Firebase/Header'
import Login from '../apps/Firebase/LoginForm'
import Register from '../apps/Firebase/Register'
import Home from '../apps/Firebase/Home'
import { AuthProvider, useAuth } from '../context/authContext/index'

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { userLoggedIn } = useAuth()
  return userLoggedIn ? children : <Navigate to="/firebase-auth/login" replace />
}

const FirebaseAuth: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default FirebaseAuth
