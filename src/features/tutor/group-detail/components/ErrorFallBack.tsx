import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const ErrorFallback: React.FC<{ message: string }> = ({ message }) => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // đếm ngược
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    // quay về
    const timer = setTimeout(() => {
      navigate('/tutor/dashboard-tutor')
    }, 10000)

    // dọn timer
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
      <div className='text-red-600 text-xl font-semibold mb-3'>{message}</div>
      <p className='text-gray-600 mb-6'>
        Bạn sẽ được chuyển hướng về <span className='font-medium'>Dashboard</span> sau{' '}
        <span className='text-blue-600 font-semibold'>{countdown}</span> giây...
      </p>
      <button
        onClick={() => navigate('/tutor/dashboard-tutor')}
        className='px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition'
      >
        Quay lại ngay
      </button>
    </div>
  )
}

export default ErrorFallback
