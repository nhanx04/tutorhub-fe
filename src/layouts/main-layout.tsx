import React, { useState } from 'react'
import { Sidebar, Header } from 'src/components'

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
      <Header />
      <div className='flex'>
        <Sidebar activeItem={activeMenuItem} onItemClick={handleMenuItemClick} />
        <main className='flex-1 p-6'>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
