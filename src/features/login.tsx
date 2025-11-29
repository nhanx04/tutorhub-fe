import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import logo from '../asset/images/TutorHub_logo.png'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const getRedirectByRole = (role: string) => {
    switch (role) {
      case 'pctsv':
        return '/phong-ctsv/student-list'
      case 'pdt':
        return '/phong-dao-tao/dashboard'
      case 'faculty':
        return '/faculty/student-assessment'
      case 'tutor':
        return '/tutor/dashboard-tutor'
      default:
        return '/dashboard'
    }
  }

  const MOCK_ACCOUNTS = [
    {
      role: 'student',
      email: 'student@demo.com',
      password: '123456',
      note: '/dashboard, /student/profile, /student/group-explorer, /library'
    },
    {
      role: 'tutor',
      email: 'tutor@demo.com',
      password: '123456',
      note: '/tutor/dashboard-tutor, /tutor/profile-tutor, /library'
    },
    { role: 'faculty', email: 'faculty@demo.com', password: '123456', note: '/faculty/student-assessment' },
    {
      role: 'pctsv',
      email: 'pctsv@demo.com',
      password: '123456',
      note: '/phong-ctsv/student-list, /phong-ctsv/tutor-list'
    },
    { role: 'pdt', email: 'pdt@demo.com', password: '123456', note: '/phong-dao-tao/dashboard' }
  ] as const

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const u = await login({ email, password })
      navigate(getRedirectByRole(u.role))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  const handlePickMock = (acc: (typeof MOCK_ACCOUNTS)[number]) => {
    setEmail(acc.email)
    setPassword(acc.password)
  }

  const handleQuickLogin = async (acc: (typeof MOCK_ACCOUNTS)[number]) => {
    if (loading) return
    setError('')
    setLoading(true)
    try {
      const u = await login({ email: acc.email, password: acc.password })
      navigate(getRedirectByRole(u.role))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-sky-200 p-3'>
      <div className='w-full max-w-3xl p-8 space-y-6 bg-white rounded-lg shadow-md'>
        {/* Header */}
        <div className='text-center'>
          <img className='mx-auto h-24 w-auto' src={logo} alt='TutorHub Logo' />
          <h1 className='text-3xl font-bold mt-6 text-blue-900'>Đăng nhập</h1>
        </div>

        {/* Mock accounts */}
        <div className='space-y-3 rounded-md border border-blue-100 bg-blue-50 p-4'>
          <div className='text-sm text-blue-900 font-medium'>
            Tài khoản mẫu (chọn để điền nhanh hoặc đăng nhập 1 chạm)
          </div>
          <div className='grid gap-3 md:grid-cols-2'>
            {MOCK_ACCOUNTS.map((acc) => (
              <div
                key={acc.role}
                className='flex items-start justify-between gap-3 rounded-md bg-white border border-blue-100 p-3'
              >
                <div>
                  <div className='font-semibold text-gray-800 capitalize'>{acc.role}</div>
                  <div className='text-sm text-gray-700'>{acc.email}</div>
                  <div className='text-xs text-gray-500'>Quyền: {acc.note}</div>
                </div>
                <div className='flex gap-2'>
                  <button
                    type='button'
                    onClick={() => handlePickMock(acc)}
                    className='px-3 py-1 text-xs rounded-md border border-blue-200 text-blue-700 hover:bg-blue-50 cursor-pointer'
                  >
                    Điền nhanh
                  </button>
                  <button
                    type='button'
                    onClick={() => handleQuickLogin(acc)}
                    className='px-3 py-1 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer disabled:bg-indigo-400'
                    disabled={loading}
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main form */}
        <form className='space-y-6' onSubmit={handleSubmit}>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-blue-900'>
              Email
            </label>
            <div className='mt-1'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className='w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100'
                placeholder='student@demo.com'
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-blue-900'>
              Mật khẩu
            </label>
            <div className='mt-1'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className='w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100'
                placeholder='123456'
              />
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type='submit'
              disabled={loading}
              className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:bg-indigo-400'
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
