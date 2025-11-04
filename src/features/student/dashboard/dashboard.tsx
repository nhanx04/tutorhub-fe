import React, { useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import GroupCard from 'src/features/student/dashboard/components/GroupCard'
import { registeredGroups } from './mock-data/registered-groups'
import { MainLayout } from 'src/layouts'
import type { RegisteredGroup } from 'src/types'

const DashboardPage: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const [selectedTutor, setSelectedTutor] = useState('')

  const tutorOptions = useMemo(() => {
    const tutors = registeredGroups.map((group) => group.tutor)
    return Array.from(new Set(tutors)).sort((a, b) => a.localeCompare(b))
  }, [])

  const filteredGroups = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    return registeredGroups.filter((group) => {
      const matchesKeyword =
        !normalizedKeyword ||
        group.title.toLowerCase().includes(normalizedKeyword) ||
        group.description.toLowerCase().includes(normalizedKeyword)

      const matchesTutor = !selectedTutor || group.tutor === selectedTutor

      return matchesKeyword && matchesTutor
    })
  }, [keyword, selectedTutor])

  return (
    <MainLayout>
      <div className='space-y-6 p-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-6'>
          <div className='col-span-3'>
            <label className='flex flex-col gap-2 text-sm text-gray-600'>
              <span className='font-medium text-gray-700'>Enter search keywords</span>
              <input
                type='text'
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder='Enter search keywords'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              />
            </label>
          </div>

          <div className='md:col-span-2'>
            <label className='flex flex-col gap-2 text-sm text-gray-600'>
              <span className='font-medium text-gray-700'>Tutors</span>
              <select
                value={selectedTutor}
                onChange={(event) => setSelectedTutor(event.target.value)}
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
              >
                <option value=''>All tutors</option>
                {tutorOptions.map((tutor) => (
                  <option key={tutor} value={tutor}>
                    {tutor}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className='flex items-end md:col-span-1'>
            <button
              className='flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm'
              onClick={() => setKeyword((value) => value.trim())}
            >
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 px-6 pb-6 md:grid-cols-2 lg:grid-cols-3'>
        {filteredGroups.length === 0 ? (
          <div className='col-span-full rounded-md border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500'>
            No registered groups match your filters.
          </div>
        ) : (
          filteredGroups.map((group: RegisteredGroup) => <GroupCard key={group.id} group={group} />)
        )}
      </div>
    </MainLayout>
  )
}

export default DashboardPage

export { DashboardPage }
