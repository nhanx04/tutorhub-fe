import React from 'react'
import { MainLayout } from 'src/layouts'
import ReusableTable from 'src/components/Table'
import { groupDetail } from './mockdata/mock-group-infor'
import { sampleData } from './mockdata/mock-table-data'
import { consultationColumns, GroupInformation } from './components'

export const ConsultationSessionsPage = () => {
  return (
    <MainLayout>
      <div className='p-6'>
        <h1 className='text-xl font-bold mb-4 bg-indigo-200 p-3 rounded-t-lg text-indigo-900'>Group Information</h1>
        <GroupInformation
          title={groupDetail.title}
          description={groupDetail.description}
          tutor={groupDetail.tutor}
          faculty={groupDetail.faculty}
          studentCount={groupDetail.studentCount}
        />
      </div>
      <div className='p-6'>
        <h1 className='text-xl font-bold mb-4 bg-indigo-200 p-3 rounded-t-lg text-indigo-900'>Consultation Sessions</h1>
        <ReusableTable columns={consultationColumns} data={sampleData} />
      </div>
    </MainLayout>
  )
}
