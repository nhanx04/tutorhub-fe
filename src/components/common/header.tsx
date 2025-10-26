import React from 'react'
import { FaRegBell } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { MdArrowDropDown } from 'react-icons/md'

interface HeaderProps {
  title?: string
  user_name?: string
  role?: string
}

const Header: React.FC<HeaderProps> = ({ title = 'Dashboard', user_name = 'User', role = 'Guest' }) => {
  return (
    <header className='bg-white border-b border-gray-200 px-6 py-4'>
      <div className='flex items-center justify-between'>
        {/* Left side: Title */}
        <div className='flex items-center space-x-3'>
          <h1 className='text-xl font-semibold text-gray-800'>{title}</h1>
        </div>

        {/* Sight side: Avtion */}
        <div className='flex items-center space-x-4'>
          {/* Notification Bell */}
          <button className='relative p-2 text-gray-600 hover:text-gray-800 transition cursor-pointer'>
            <FaRegBell />
            <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
          </button>

          {/* User profile + dropdown */}
          {/* <div className='relative group cursor-pointer'> */}
          <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
            <FaCircleUser />
          </div>

          <div className='flex flex-col'>
            <span className='text-gray-800 text-sm font-medium'>{user_name}</span>
            <span className='text-gray-500 text-xs'>{role}</span>
          </div>

          <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
            <MdArrowDropDown />
          </div>

          {/* </div> */}

          {/* Dropdown menu */}
          <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md hidden group-hover:block z-10'>
            <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Profile</button>
            <button className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Log out</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
