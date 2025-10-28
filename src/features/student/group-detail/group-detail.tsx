import React from 'react'
import ReusableTable from '../../../components/common/Table' // Import the table component
import { sampleData } from './mockdata/mock-table-data'
import { columns } from './components'

const ConsultationSessionsPage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Consultation Sessions</h1>
      <ReusableTable columns={columns} data={sampleData} />
    </div>
  )
}

export default ConsultationSessionsPage
