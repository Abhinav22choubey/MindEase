import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Dashboard(){
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  function handleLogout(){
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Dashboard</h1>
        <p className="text-slate-700 mb-6">Welcome{user && user.email ? `, ${user.email}` : ''} — this is a protected page.</p>
        <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">Logout</button>
      </div>
    </div>
  )
}
