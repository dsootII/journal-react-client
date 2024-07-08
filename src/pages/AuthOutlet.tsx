import { AuthProvider } from '../lib/context/AuthContext'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthOutlet() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
