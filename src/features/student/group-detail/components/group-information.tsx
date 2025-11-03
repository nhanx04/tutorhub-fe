import React from 'react'
import {
  FaUserGraduate,
  FaUniversity,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaEnvelopeOpenText
} from 'react-icons/fa'
import type { GroupInformationProps } from 'src/types'

export const GroupInformation: React.FC<GroupInformationProps> = ({
  title,
  description,
  tutor,
  faculty,
  studentCount,
  focusAreas,
  scheduleSummary,
  contactEmail,
  meetingMode,
  onSelectGroup,
  isGroupSelected = false,
  isSelectionDisabled = false
}) => {
  const actionDisabled = isGroupSelected || isSelectionDisabled
  const actionLabel = isGroupSelected ? 'Group selected' : 'Join this group'

  return (
    <div className='flex flex-col justify-between gap-6 border border-gray-300 bg-white p-6 shadow-sm md:flex-row'>
      <div className='md:w-2/3 md:pr-6'>
        <h1 className='mb-3 text-2xl font-bold text-gray-800'>{title}</h1>
        <p className='text-sm text-gray-600'>{description}</p>
        {focusAreas && focusAreas.length > 0 && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {focusAreas.map((area) => (
              <span key={area} className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700'>
                {area}
              </span>
            ))}
          </div>
        )}
        {onSelectGroup && (
          <div className='mt-6'>
            <button
              onClick={() => {
                if (!actionDisabled) {
                  onSelectGroup()
                }
              }}
              disabled={actionDisabled}
              className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition ${
                actionDisabled
                  ? 'cursor-not-allowed border border-gray-300 bg-gray-200 text-gray-500'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {actionLabel}
            </button>
            {isGroupSelected && (
              <p className='mt-2 text-xs text-indigo-700'>You already registered this group.</p>
            )}
          </div>
        )}
      </div>

      <div className='border-t border-gray-200 pt-6 text-sm text-blue-900 md:w-1/3 md:border-l md:border-t-0 md:pl-6 md:pt-0'>
        <ul className='space-y-3'>
          <li className='flex items-center'>
            <FaChalkboardTeacher className='mr-3 text-lg text-indigo-600' />
            <div>
              <span className='font-medium'>Tutor:</span>
              <span className='ml-2'>{tutor}</span>
            </div>
          </li>
          <li className='flex items-center'>
            <FaUniversity className='mr-3 text-lg text-indigo-600' />
            <div>
              <span className='font-medium'>Faculty:</span>
              <span className='ml-2'>{faculty}</span>
            </div>
          </li>
          <li className='flex items-center'>
            <FaUserGraduate className='mr-3 text-lg text-indigo-600' />
            <div>
              <span className='font-medium'>Students:</span>
              <span className='ml-2'>{studentCount}</span>
            </div>
          </li>
          {scheduleSummary && (
            <li className='flex items-center'>
              <FaCalendarAlt className='mr-3 text-lg text-indigo-600' />
              <div>
                <span className='font-medium'>Schedule:</span>
                <span className='ml-2'>{scheduleSummary}</span>
              </div>
            </li>
          )}
          {meetingMode && (
            <li className='flex items-center'>
              <FaCalendarAlt className='mr-3 text-lg text-indigo-600' />
              <div>
                <span className='font-medium'>Meeting mode:</span>
                <span className='ml-2'>{meetingMode}</span>
              </div>
            </li>
          )}
          {contactEmail && (
            <li className='flex items-center'>
              <FaEnvelopeOpenText className='mr-3 text-lg text-indigo-600' />
              <div>
                <span className='font-medium'>Contact:</span>
                <span className='ml-2'>{contactEmail}</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default GroupInformation
