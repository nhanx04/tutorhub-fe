import React from 'react'
import { FaHome, FaUserCog, FaBook } from 'react-icons/fa'
import logo from '../../asset/images/TutorHub_favicon.png'

interface SidebarProps {
  activeItem?: string
  onItemClick?: (item: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'dashboard', onItemClick }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaHome />,
      active: activeItem === 'dashboard'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <FaUserCog />,
      active: activeItem === 'profile'
    },
    {
      id: 'library',
      label: 'Library',
      icon: <FaBook />,
      active: activeItem === 'library'
    }
  ]

  return (
    <aside className='fixed top-0 w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col'>
      {/* Logo + tilte */}
      <div className='flex flex-col items-center py-8 border-b border-gray-200'>
        <img src={logo} alt='HCMUT TutorHub Logo' className='w-16 h-16 mb-3' />
        <h1 className='text-xl font-semibold text-blue-900'>HCMUT TUTORHUB</h1>
        <p className='text-gray-500 text-sm text-center px-4'>Connect students and tutors</p>
      </div>

      {/* Navigation menu */}
      <nav className='mt-4 flex-1'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left cursor-pointer transition-colors ${
              item.active ? 'bg-blue-800 text-white rounded-md' : 'text-blue-900 hover:bg-blue-100'
            }`}
          >
            {item.icon}
            <span className='font-medium'>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
