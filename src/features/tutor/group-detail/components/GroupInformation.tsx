import React from 'react'
import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { LuPenLine } from 'react-icons/lu'
import CreateConsultationModal from './CreateConsultation'
import { useNavigate } from 'react-router'

interface TutorGroupInformationProps {
  id: number
  groupName: string
  description: string
  onConsultationCreated: () => void
}

export const GroupInformation: React.FC<TutorGroupInformationProps> = ({
  id,
  groupName,
  description,
  onConsultationCreated
}) => {
  const [createConsul, setCreateConsul] = useState(false)
  const navigate = useNavigate()

  const handleCreate = () => {
    setCreateConsul(true)
  }

  const handleBack = () => {
    setCreateConsul(false)
  }

  const handleConsultationCreated = () => {
    setCreateConsul(false)
    onConsultationCreated()
  }

  return (
    <div>
      {createConsul && (
        <CreateConsultationModal onBack={handleBack} onConsultationCreated={handleConsultationCreated} />
      )}
      <div className='bg-white p-6 shadow-sm border border-gray-300 flex justify-between items-start'>
        <div className='w-2/3 pr-6'>
          <h1 className='text-2xl font-bold text-gray-800 mb-3'>{groupName}</h1>
          <p className='text-gray-600 text-sm'>{description}</p>
        </div>

        <div className='flex flex-col gap-5 w-fit pl-6 border-gray-200'>
          <button
            onClick={handleCreate}
            className='flex flex-row items-center justify-center gap-2 bg-blue-800 text-white border border-blue-700 rounded-md p-1.5 hover:bg-white hover:text-blue-700 transition-all duration-200 ease-in-out'
          >
            <CiSquarePlus size={28}></CiSquarePlus>
            <p>New Consultation</p>
          </button>
          <button
            onClick={() => navigate(`/tutor/edit-group/${id}`)}
            className='flex flex-row items-center justify-center gap-2 text-orange-500 border border-orange-500 rounded-md p-1.5 hover:bg-orange-500 hover:text-white transition-all duration-200 ease-in-out'
          >
            <LuPenLine size={28}></LuPenLine>
            <p>Edit Group</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupInformation
