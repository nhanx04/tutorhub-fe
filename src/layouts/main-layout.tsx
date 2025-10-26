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
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar activeItem={activeMenuItem} onItemClick={handleMenuItemClick} />

      <div className='flex-1 flex flex-col'>
        <Header />
        <main className='flex-1 p-6'>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
