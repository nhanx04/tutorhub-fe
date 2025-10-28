import React from 'react'
import { MainLayout } from 'src/layouts'
import TutorCard from 'src/features/student/dashboard/components/GroupCard'
import { tutorData } from './mock-data/card-data'

export default function DashboardPage() {
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
