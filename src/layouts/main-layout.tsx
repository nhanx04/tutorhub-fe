import React, { useState } from 'react'
import Sidebar from 'src/components/sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard')

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='flex'>
        <Sidebar activeItem={activeMenuItem} onItemClick={handleMenuItemClick} />
        <main className='flex-1 p-6'>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
