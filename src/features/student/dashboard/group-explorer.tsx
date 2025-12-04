import React, { useEffect, useMemo, useState } from 'react'
import { FaSearch, FaUndoAlt } from 'react-icons/fa'

import GroupExplorerCard from 'src/features/student/dashboard/components/GroupExplorerCard'
import { MainLayout } from 'src/layouts'
import type { StudentGroup, Group } from 'src/types'
import { ConfirmDialog } from 'src/components'
import { groupService } from 'src/services/groupService'

export const GroupExplorerPage: React.FC = () => {
  const [allGroups, setAllGroups] = useState<StudentGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [keyword, setKeyword] = useState('')
  const [selectedTutor, setSelectedTutor] = useState('')
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([])
  const [isFilterApplied, setIsFilterApplied] = useState(false)
  const [pendingGroup, setPendingGroup] = useState<StudentGroup | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<StudentGroup | null>(null)
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'info'; message: string } | null>(null)

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        setLoading(true)
        const data: Group[] = await groupService.getAllGroups()

        const formattedGroups: StudentGroup[] = data.map((group) => ({
          id: group.id,
          title: group.groupName,
          description: group.description,
          tutor: group.tutor.userName,
          faculty: group.faculty.name,
          currentStudents: 0, // Placeholder, API does not provide this
          maxStudents: group.studentLimit,
          focusAreas: group.topics.map((topic) => topic.name),
          scheduleSummary: `${group.startDate} to ${group.endDate}`
        }))

        setAllGroups(formattedGroups)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch groups.')
      } finally {
        setLoading(false)
      }
    }

    fetchAllGroups()
  }, [])

  useEffect(() => {
    if (!alertMessage) {
      return
    }
    const timer = setTimeout(() => setAlertMessage(null), 4000)
    return () => clearTimeout(timer)
  }, [alertMessage])

  const focusAreaOptions = useMemo(() => {
    const allFocusAreas = allGroups.flatMap((group) => group.focusAreas)
    return Array.from(new Set(allFocusAreas)).sort((a, b) => a.localeCompare(b))
  }, [allGroups])

  const tutorOptions = useMemo(() => {
    const allTutors = allGroups.map((group) => group.tutor)
    return Array.from(new Set(allTutors)).sort((a, b) => a.localeCompare(b))
  }, [allGroups])

  const filteredGroups = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    return allGroups.filter((group) => {
      const matchesKeyword =
        !normalizedKeyword ||
        group.title.toLowerCase().includes(normalizedKeyword) ||
        group.description.toLowerCase().includes(normalizedKeyword)

      const matchesTutor = !selectedTutor || group.tutor === selectedTutor

      const matchesFocusAreas =
        selectedFocusAreas.length === 0 ||
        selectedFocusAreas.every((focus) =>
          group.focusAreas.map((area) => area.toLowerCase()).includes(focus.toLowerCase())
        )

      return matchesKeyword && matchesTutor && matchesFocusAreas
    })
  }, [allGroups, keyword, selectedTutor, selectedFocusAreas])

  const groupsToRender = isFilterApplied ? filteredGroups : allGroups

  const handleToggleFocusArea = (area: string) => {
    setSelectedFocusAreas((prev) => (prev.includes(area) ? prev.filter((item) => item !== area) : prev.concat(area)))
  }

  const handleApplyFilters = () => {
    setIsFilterApplied(true)
    setAlertMessage({ type: 'info', message: 'Showing groups that match your selected filters.' })
  }

  const handleResetFilters = () => {
    setKeyword('')
    setSelectedTutor('')
    setSelectedFocusAreas([])
    setIsFilterApplied(false)
    setAlertMessage(null)
  }

  const handleSelectGroup = (group: StudentGroup) => {
    setPendingGroup(group)
  }

  const handleConfirmSelection = async () => {
    if (!pendingGroup) {
      return
    }

    try {
      await groupService.joinGroups([pendingGroup.id])
      setSelectedGroup(pendingGroup)
      setAlertMessage({
        type: 'success',
        message: `Successfully joined group "${pendingGroup.title}".`
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.'
      setAlertMessage({ type: 'info', message: `Failed to join group: ${errorMessage}` })
    } finally {
      setPendingGroup(null)
    }
  }

  const handleCancelSelection = () => {
    setPendingGroup(null)
  }

  const alertClass =
    alertMessage?.type === 'success'
      ? 'border-green-200 bg-green-50 text-green-800'
      : 'border-blue-200 bg-blue-50 text-blue-800'

  return (
    <MainLayout>
      <div className='space-y-6 p-6'>
        {alertMessage && (
          <div className={'rounded-md border px-4 py-3 text-sm ' + alertClass}>{alertMessage.message}</div>
        )}

        {selectedGroup && (
          <div className='rounded-md border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900'>
            <p className='font-semibold'>Selected group</p>
            <p>
              {selectedGroup.title} - Tutor {selectedGroup.tutor}. You can still explore and choose a different group if
              needed.
            </p>
          </div>
        )}

        <div className='mb-2 grid grid-cols-1 gap-4 md:grid-cols-6'>
          <div className='col-span-3'>
            <input
              type='text'
              id='keyword'
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder='Enter keywords to search'
              className='w-full rounded-md border border-gray-400 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
            />
          </div>

          <div className='md:col-span-2'>
            <select
              id='tutor'
              value={selectedTutor}
              onChange={(event) => setSelectedTutor(event.target.value)}
              className='w-full rounded-md border border-gray-400 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
            >
              <option value=''>All Tutors</option>
              {tutorOptions.map((tutor) => (
                <option key={tutor} value={tutor}>
                  {tutor}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-end md:col-span-1'>
            <button
              onClick={handleApplyFilters}
              className='flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer'
            >
              <FaSearch />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {focusAreaOptions.length > 0 && (
          <div className='flex flex-wrap items-center gap-3'>
            {focusAreaOptions.map((area) => {
              const isSelected = selectedFocusAreas.includes(area)
              const buttonClass = isSelected
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              return (
                <button
                  key={area}
                  onClick={() => handleToggleFocusArea(area)}
                  className={'rounded-full border px-4 py-1 text-sm transition cursor-pointer ' + buttonClass}
                >
                  {area}
                </button>
              )
            })}
            <button
              onClick={handleResetFilters}
              className='flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1 text-sm text-gray-600 transition hover:bg-gray-100 cursor-pointer'
            >
              <FaUndoAlt /> Reset
            </button>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 gap-6 px-6 pb-6 md:grid-cols-2 lg:grid-cols-3'>
        {loading ? (
          <div className='col-span-full text-center'>Loading groups...</div>
        ) : error ? (
          <div className='col-span-full text-center text-red-500'>{error}</div>
        ) : groupsToRender.length === 0 ? (
          <div className='col-span-full rounded-md border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500'>
            {isFilterApplied
              ? 'No groups match your filters. Try removing a focus area or searching with different keywords.'
              : 'No groups available for registration at the moment.'}
          </div>
        ) : (
          groupsToRender.map((group) => (
            <GroupExplorerCard
              key={group.id}
              group={group}
              isSelected={selectedGroup?.id === group.id}
              onSelect={handleSelectGroup}
              disableSelection={!!selectedGroup}
            />
          ))
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(pendingGroup)}
        onClose={handleCancelSelection}
        onConfirm={handleConfirmSelection}
        title='Confirm group selection'
      >
        {pendingGroup ? (
          <div className='space-y-2 text-sm text-gray-700'>
            <p>
              You are about to join <span className='font-semibold'>{pendingGroup.title}</span> led by{' '}
              {pendingGroup.tutor}.
            </p>
            <p>
              The system will store this choice, notify the tutoring office and sync it with related services. Do you
              want to continue?
            </p>
          </div>
        ) : null}
      </ConfirmDialog>
    </MainLayout>
  )
}

export default GroupExplorerPage
