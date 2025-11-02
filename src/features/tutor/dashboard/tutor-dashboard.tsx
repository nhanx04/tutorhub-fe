import { MainLayout } from 'src/layouts'
import { tutorCardData } from './mock-data/card_data'
import GroupCard from './components/GroupCard'
import { LuFolderPlus } from 'react-icons/lu'
import { useNavigate } from 'react-router'

export const TutorDashboardPage = () => {
  const navigate = useNavigate()

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
            className='bg-blue-800 flex justify-center gap-2 p-2 max-w-35 rounded-sm font-semibold border border-blue-800 hover:bg-white hover:text-blue-800'
          >
            <LuFolderPlus size={25}></LuFolderPlus>
            <button>Create</button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {tutorCardData.map((tutor, index) => (
            <GroupCard
              key={index}
              id={tutor.id}
              groupName={tutor.groupName}
              description={tutor.description}
              tutor={tutor.tutor.userName}
              faculty={tutor.faculty.name}
              studentLimit={tutor.studentLimit}
              status={tutor.status}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
