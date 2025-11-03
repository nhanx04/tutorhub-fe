import React from 'react'
import type { DashboardGroupCardProps } from 'src/types'
import { FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const statusVariant: Record<'Active' | 'Inactive', string> = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-red-100 text-red-700'
}

const GroupCard: React.FC<DashboardGroupCardProps> = ({ group, onViewDetails }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(group)
      return
    }
    navigate('/student/group-detail', { state: { groupId: group.id } })
  }

  return (
    <div className='flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'>
      <div className='mb-4 flex items-center justify-between'>
        <span className='text-sm font-semibold text-gray-800'>{group.title}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusVariant[group.status]}`}>
          {group.status}
        </span>
      </div>

      <p className='mb-4 text-sm text-gray-600'>{group.description}</p>

      <div className='mt-auto space-y-2 text-sm text-gray-600'>
        <div className='flex items-center gap-2'>
          <span className='font-medium text-gray-700'>Tutor:</span>
          <span>{group.tutor}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium text-gray-700'>Faculty:</span>
          <span>{group.faculty}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium text-gray-700'>Students:</span>
          <span>{group.students}</span>
        </div>
      </div>

      <button
        onClick={handleViewDetails}
        className='mt-6 flex items-center justify-center gap-2 rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white cursor-pointer'
      >
        <FaRegEye /> View details
      </button>
    </div>
  )
}

export default GroupCard
