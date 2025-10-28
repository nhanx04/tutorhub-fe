import React from 'react'
import { MainLayout } from 'src/layouts'
import TutorCard from 'src/components/GroupCard'

export default function DashboardPage() {
  const tutorData = [
    {
      title: 'Tư vấn đồ án chuyên ngành Hệ thống thông tin',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum...',
      tutor: 'ThS Lê Trần Tấn Phát',
      faculty: 'Electronic and Telecommunication',
      students: 7
    },
    {
      title: 'Hướng dẫn nghiên cứu khoa học chuyên đề An ninh mạng',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum...',
      tutor: 'ThS Lê Trần Tấn Phát',
      faculty: 'Electronic and Telecommunication',
      students: 7
    }
  ]

  return (
    <MainLayout>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tutorData.map((tutor, index) => (
          <TutorCard
            key={index}
            title={tutor.title}
            description={tutor.description}
            tutor={tutor.tutor}
            faculty={tutor.faculty}
            students={tutor.students}
          />
        ))}
      </div>
    </MainLayout>
  )
}
