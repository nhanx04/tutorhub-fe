import { useNavigate } from 'react-router'
import GroupForm from './components/GroupForm'

export const createGroupForm = () => {
  const navigate = useNavigate()

  //xử lý tạo nhóm tư vấn (GỌI API)
  const handleDeleteGroup = (data: any) => {
    //api
  }

  return (
    <GroupForm
      mode='create'
      onCancel={() => navigate('/tutor/dashboard-tutor')}
      onSubmit={(data) => console.log('Tạo nhóm mới:', data)}
    />
  )
}
