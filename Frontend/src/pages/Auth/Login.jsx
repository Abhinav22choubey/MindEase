import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

export default function Login(){
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('https://mind-ease-backend-n95p.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        navigate('/Home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-700">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} required type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          <button disabled={loading} className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}
