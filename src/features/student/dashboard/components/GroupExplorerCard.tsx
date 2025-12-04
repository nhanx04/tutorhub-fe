import React from 'react'
import type { ExplorerGroupCardProps } from 'src/types'
import { FaRegCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const GroupExplorerCard: React.FC<ExplorerGroupCardProps> = ({
  group,
  isSelected,
  onSelect,

  disableSelection
}) => {
  const navigate = useNavigate()
  const isFull = group.currentStudents >= group.maxStudents
  const isSelectable = !disableSelection && !isFull
  const statusLabel = isFull ? 'Full' : 'Open'
  const statusClass = isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'

  const handleSelect = () => {
    if (!isSelectable) {
      return
    }
    onSelect(group)
  }

  return (
    <div
      className={`flex h-full flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
      }`}
    >
      <div className='mb-4 flex items-center justify-between'>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{statusLabel}</span>
        {isSelected && (
          <span className='flex items-center text-xs font-semibold text-blue-600'>
            <FaRegCheckCircle className='mr-1' /> Selected
          </span>
        )}
      </div>

      <div className='flex-grow'>
        <h3 className='mb-3 line-clamp-2 text-lg font-semibold text-gray-800'>{group.title}</h3>
        <p className='mb-4 line-clamp-3 text-sm text-gray-600'>{group.description}</p>
        <div className='flex flex-wrap gap-2'>
          {group.focusAreas.map((area) => (
            <span key={area} className='rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700'>
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className='mt-6 space-y-2 text-sm text-gray-600'>
        <p>
          <span className='font-medium'>Tutor:</span> {group.tutor}
        </p>
        <p>
          <span className='font-medium'>Faculty:</span> {group.faculty}
        </p>
        <p>
          <span className='font-medium'>Schedule:</span> {group.scheduleSummary}
        </p>
        <p>
          <span className='font-medium'>Students:</span> {group.currentStudents}/{group.maxStudents}
        </p>
      </div>

      <div className='mt-6 flex flex-wrap gap-3'>
        <button
          onClick={handleSelect}
          disabled={!isSelectable && !isSelected}
          className={`flex flex-1 items-center justify-center rounded-md px-4 py-2 text-white transition-colors cursor-pointer ${
            isSelectable || isSelected
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
          }`}
        >
          {isSelected ? 'Selected' : 'Select group'}
        </button>
      </div>
    </div>
  )
}

export default GroupExplorerCard
