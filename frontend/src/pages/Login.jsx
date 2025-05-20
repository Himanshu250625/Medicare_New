import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true)

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Logged in successfully!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <form onSubmit={onSubmitHandler} className="relative w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {state === 'Sign Up' ? 'Join our community today' : 'Sign in to continue'}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {state === 'Sign Up' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-blue-700" />
                  </div>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 focus:border-blue-500 transition-all duration-300 bg-white/40 backdrop-blur-3xl placeholder-gray-400 text-gray-800 shadow-xl border-transparent outline-none focus:outline-none"
                    type="text"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineMail className="h-5 w-5 text-blue-700" />
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 focus:border-blue-500 transition-all duration-300 bg-white/40 backdrop-blur-3xl placeholder-gray-400 text-gray-800 shadow-xl border-transparent outline-none focus:outline-none"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="h-5 w-5 text-blue-700" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 focus:border-blue-500 transition-all duration-300 bg-white/40 backdrop-blur-3xl placeholder-gray-400 text-gray-800 shadow-xl border-transparent outline-none focus:outline-none"
                  type="password"
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              state === 'Sign Up' ? 'Create Account' : 'Sign In'
            )}
          </button>

          {/* Toggle Form */}
          <div className="text-center text-sm text-gray-600">
            {state === 'Sign Up' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setState('Login')}
                  className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setState('Sign Up')}
                  className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline transition-colors duration-200"
                >
                  Create one
                </button>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login