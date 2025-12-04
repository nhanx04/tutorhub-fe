import { useNavigate } from 'react-router'
import GroupForm from './components/GroupForm'
import { groupService } from 'src/services/groupService'

export const CreateGroupPage = () => {
  const navigate = useNavigate()

  const handleCreateGroup = async (data: any) => {
    try {
      await groupService.createGroup(data)
      // Navigate back to dashboard on success, the dashboard will refetch the groups list.
      // A success notification is already shown in the GroupForm component.
    } catch (error) {
      console.error('Failed to create group:', error)
      // Optionally, handle the error, e.g., show a notification
      alert('Failed to create group. Please check the console for details.')
    }
  }

  return <GroupForm mode='create' onCancel={() => navigate('/tutor/dashboard-tutor')} onSubmit={handleCreateGroup} />
}
