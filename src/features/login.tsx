import React from 'react'
import logo from '../asset/images/TutorHub_logo.png'

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-sky-200 p-3'>
      <div className='w-full max-w-xl p-8 space-y-6 bg-white rounded-lg shadow-md'>
        {/* Header */}
        <div className='text-center'>
          <img className='mx-auto h-24 w-auto' src={logo} alt='TutorHub Logo' />
          <h1 className='text-3xl font-bold mt-6 text-blue-900'>Đăng nhập</h1>
        </div>

        {/* Main form */}
        <form className='space-y-6'>
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
                className='w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='student@hcmut.edu.vn'
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
                className='w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='tutorhub@251'
              />
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
