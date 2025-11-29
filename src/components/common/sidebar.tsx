import React from 'react'
import { FaHome, FaUserCog, FaBook, FaSearch } from 'react-icons/fa'
import logo from '../../asset/images/TutorHub_favicon.png'
import { useNavigate, useLocation } from 'react-router'
import { useAuth } from 'src/hooks'

interface SidebarProps {
  activeItem?: string
  onItemClick?: (item: string) => void
}

const Sidebar: React.FC<SidebarProps> = () => {
  const nevigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const currentPath = location.pathname

  const handleNevigate = (path: string) => {
    nevigate(path)
  }

  const allMenuItems = {
    dashboard: {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaHome />,
      path: '/dashboard'
    },
    profile: {
      id: 'profile',
      label: 'Profile',
      icon: <FaUserCog />,
      path: '/student/profile'
    },
    groupExplorer: {
      id: 'group-explorer',
      label: 'Group Explorer',
      icon: <FaSearch />,
      path: '/student/group-explorer'
    },
    library: {
      id: 'library',
      label: 'Library',
      icon: <FaBook />,
      path: '/library'
    },
    facultyAssessment: {
      id: 'student-assessment',
      label: 'Student Assessment',
      icon: <FaBook />,
      path: '/faculty/student-assessment'
    },
    ctsvStudentList: {
      id: 'student-list',
      label: 'Student List',
      icon: <FaBook />,
      path: '/phong-ctsv/student-list'
    },
    ctsvTutorList: {
      id: 'tutor-list',
      label: 'Tutor List',
      icon: <FaBook />,
      path: '/phong-ctsv/tutor-list'
    },
    pdtDashboard: {
      id: 'pdt-dashboard',
      label: 'PDT Dashboard',
      icon: <FaBook />,
      path: '/phong-dao-tao/dashboard'
    },
    tutorDashboard: {
      id: 'tutor-dashboard',
      label: 'Tutor Dashboard',
      icon: <FaBook />,
      path: '/tutor/dashboard-tutor'
    },
    tutorProfile: {
      id: 'tutor-profile',
      label: 'Tutor Profile',
      icon: <FaBook />,
      path: '/tutor/profile-tutor'
    }
  } as const

  const role = user?.role ?? ''

  const roleToMenuIds: Record<string, Array<keyof typeof allMenuItems>> = {
    student: ['dashboard', 'profile', 'groupExplorer', 'library'],
    tutor: ['tutorDashboard', 'tutorProfile', 'library'],
    faculty: ['facultyAssessment'],
    pctsv: ['ctsvStudentList', 'ctsvTutorList'],
    pdt: ['pdtDashboard']
  }

  const allowedIds = roleToMenuIds[role] ?? []
  const menuItems = allowedIds.map((id) => allMenuItems[id])

  return (
    <aside className='fixed top-0 w-80 bg-white border-r border-gray-200 min-h-screen flex flex-col'>
      {/* Logo + tilte */}
      <div className='flex flex-col items-center py-8 border-b border-gray-200'>
        <img src={logo} alt='HCMUT TutorHub Logo' className='w-16 h-16 mb-3' />
        <h1 className='text-xl font-semibold text-blue-900'>HCMUT TUTORHUB</h1>
        <p className='text-gray-500 text-sm text-center px-4'>Connect students and tutors</p>
      </div>

      {/* Navigation menu */}
      <nav className='mt-4 flex-1'>
        {menuItems.map((item) => {
          const active = currentPath === item.path
          return (
            <button
              key={item.id}
              onClick={() => handleNevigate(item.path)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left cursor-pointer transition-colors ${
                active ? 'bg-blue-800 text-white rounded-md' : 'text-blue-900 hover:bg-blue-100'
              }`}
            >
              {item.icon}
              <span className='font-medium'>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
