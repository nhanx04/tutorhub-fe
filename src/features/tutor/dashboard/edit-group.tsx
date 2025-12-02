import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import GroupForm from './components/GroupForm'
import { groupService } from 'src/services/groupService'
import { MainLayout } from 'src/layouts'
import type { Group } from 'src/types' // Use the new Group type

export const EditGroupPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [initialData, setInitialData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Group ID is missing.')
      setLoading(false)
      return
    }

    const fetchGroupData = async () => {
      try {
        setLoading(true)
        const groupData: Group = await groupService.getGroupById(id)

        // Transform data for the form
        const formattedData = {
          ...groupData,
          topicIds: groupData.topics.map((topic) => topic.id),
          facultyId: groupData.faculty.id
        }

        setInitialData(formattedData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch group data.')
      } finally {
        setLoading(false)
      }
    }

    fetchGroupData()
  }, [id])

  const handleEditGroup = async (data: any) => {
    if (!id) return
    try {
      await groupService.updateGroup(id, data)
      // Success notification is handled in GroupForm
    } catch (error) {
      console.error('Failed to update group:', error)
      alert('Failed to update group. Please check the console for details.')
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <p>Loading group data...</p>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <p className='text-red-500'>{error}</p>
      </MainLayout>
    )
  }

  return (
    <GroupForm
      mode='edit'
      initialData={initialData}
      onCancel={() => navigate('/tutor/dashboard-tutor')}
      onSubmit={handleEditGroup}
    />
  )
}
