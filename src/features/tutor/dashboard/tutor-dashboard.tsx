import { MainLayout } from 'src/layouts'
import GroupCard from './components/GroupCard'
import { LuFolderPlus } from 'react-icons/lu'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { groupService } from 'src/services/groupService'
import type { Group } from 'src/types' // Use the new Group type

export const TutorDashboardPage = () => {
  const navigate = useNavigate()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true)
        const data = await groupService.getMyCreatedGroups()
        setGroups(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  const handleDeleteGroup = async (id: number) => {
    try {
      await groupService.deleteGroup(id.toString())
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete group.')
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await groupService.updateGroup(id.toString(), { status: newStatus })
      setGroups((prevGroups) => prevGroups.map((group) => (group.id === id ? { ...group, status: newStatus } : group)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update group status.')
    }
  }

  const handleViewNewGroup = () => {
    navigate(`/tutor/create-group`)
  }

  return (
    <MainLayout>
      <div className='flex flex-col gap-7 text-white'>
        <div>
          <p className='text-blue-800 text-xs'>Create new group</p>
          <div
            onClick={handleViewNewGroup}
            className='bg-blue-800 flex justify-center gap-2 p-2 max-w-35 rounded-sm font-semibold border border-blue-800 hover:bg-white hover:text-blue-800 cursor-pointer'
          >
            <LuFolderPlus size={25}></LuFolderPlus>
            <button>Create</button>
          </div>
        </div>

        {loading && <p className='text-black'>Loading groups...</p>}
        {error && <p className='text-red-500'>{error}</p>}

        {!loading && !error && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onDelete={handleDeleteGroup}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
