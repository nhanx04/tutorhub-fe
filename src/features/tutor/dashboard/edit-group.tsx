import React from 'react'
import { useNavigate, useParams } from 'react-router'
import GroupForm from './components/GroupForm'
import { tutorCardData } from './mock-data/card_data'

export const editGroup = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() //lấy id từ url
  const numericId = Number(id) // convert sang number

  // tìm tutor có id tương ứng (GỌI API sau này)
  const tutor = tutorCardData.find((item) => item.id === numericId)

  // ko tìm đc tutor
  if (!tutor) {
    return <div className='p-6 text-red-600 font-semibold'>Không tìm thấy nhóm có ID {id}</div>
  }

  // chỉ lấy những dữ liệu phù hợp
  const existingGroup = {
    topic: tutor.topic,
    title: tutor.title,
    description: tutor.description,
    fromDate: tutor.fromDate,
    toDate: tutor.toDate,
    students: tutor.students,
    status: tutor.status
  }

  // xử lý khi cập nhật (sau này GỌI API để cập nhật dữ liệu)
  const handleEditGroup = (data: any) => {
    //api
  }

  return (
    <GroupForm
      mode='edit'
      initialData={existingGroup}
      onCancel={() => navigate('/tutor/dashboard-tutor')}
      onSubmit={handleEditGroup}
    />
  )
}
