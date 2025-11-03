import { MainLayout } from 'src/layouts'
import { GroupInformation } from './components/GroupInformation'
import { GrCircleInformation } from 'react-icons/gr'
import { FaListUl } from 'react-icons/fa'
import { consultationData } from './mock-data/session-data'
import { ConsultationCard } from './components/ConsultationCard'
import { tutorCardData } from '../dashboard/mock-data/card_data'
import { useParams } from 'react-router'
import type { Session } from 'src/types'
import ErrorFallback from './components/ErrorFallBack'

export const GroupDetailTutorPage = () => {
  const { id } = useParams<{ id: string }>()
  const numericId = Number(id)

  // tìm tutor có id tương ứng (GỌI API sau này)
  //có thể lấy thẳng consultationData bỏ qua bước xác minh Tutor
  const tutor = tutorCardData.find((item) => item.id === numericId)
  //sau này GỌI API để lấy danh sách buổi tư vấn trong 1 nhóm
  const sessionData = consultationData[0]

  if (!tutor) {
    return <ErrorFallback message='Không có tutor phù hợp với ID!' />
  }

  if (!sessionData) {
    return <ErrorFallback message='Tutor chưa có tạo buổi tư vấn nào, vui lòng thử lại sau!' />
  }

  return (
    <MainLayout>
      <div className='flex flex-col px-6 mb-7'>
        <div className='flex gap-3 text-2xl font-semibold bg-indigo-100 px-5 py-3 rounded-t-lg border border-gray-300 text-indigo-700 shadow-sm'>
          <GrCircleInformation size={26} className='mt-0.5' />
          <h1>Group Information</h1>
        </div>
        {
          <GroupInformation
            id={sessionData.id}
            groupName={sessionData.groupName}
            description={sessionData.groupDescription}
          />
        }
      </div>

      <div className='flex flex-col px-6'>
        <div className='flex gap-3 text-2xl font-semibold bg-indigo-100 px-5 py-3 rounded-t-lg border border-gray-300 text-indigo-700 shadow-sm'>
          <FaListUl size={26} className='mt-0.5' />
          <h1>Consultation Sessions</h1>
        </div>
      </div>

      <div className='bg-white mx-6 border border-gray-300 shadow-sm'>
        {/* Header */}
        <div className='flex items-center text-sm lg:text-base gap-4 bg-gray-200 px-5 py-3 border-b border-gray-300'>
          <div className='flex gap-10 w-[40%] min-w-[300px]'>
            <h1 className='w-12 font-semibold flex-shrink-0'>Con.ID</h1>
            <h1 className='flex-1 font-semibold'>General Details</h1>
          </div>

          <div className='w-[20%] min-w-[150px] text-center'>
            <h1 className='font-semibold'>Time & Location</h1>
          </div>

          <div className='w-[15%] min-w-[100px] text-center'>
            <h1 className='font-semibold'>Students</h1>
          </div>

          <div className='w-[12%] min-w-[80px] text-center'>
            <h1 className='font-semibold'>Status</h1>
          </div>

          <div className='w-[13%] min-w-[90px] text-center'>
            <h1 className='font-semibold'>Actions</h1>
          </div>
        </div>

        {sessionData && sessionData.sessions.map((s) => (
          <ConsultationCard key={s.sid} session={s} groupId={sessionData.id} />
        ))}
      </div>
    </MainLayout>
  )
}
