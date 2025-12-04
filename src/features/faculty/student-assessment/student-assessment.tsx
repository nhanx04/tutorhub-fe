import { MainLayout } from 'src/layouts'
import React from 'react'
import FacultyStudentList from './components/FacultyStudentList'

export const StudentAssessmentPage = () => {
  return (
    <MainLayout>
      <div className='p-8 bg-white shadow-2xl rounded-xl'>
        <div className='mb-5 p-4 bg-blue-100 rounded-lg border border-blue-100'>
          <h3 className='text-xl font-bold text-blue-800'>Student Assessment</h3>
          <p className='text-sm text-blue-700 mt-1'>Search by keyword. Data is loaded from API by your faculty.</p>
        </div>
        <FacultyStudentList />
      </div>
    </MainLayout>
  )
}
