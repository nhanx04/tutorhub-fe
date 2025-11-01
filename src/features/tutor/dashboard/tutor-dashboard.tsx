import { MainLayout } from 'src/layouts'
import { tutorData } from './mock-data/card_data'
import GroupCard from './components/GroupCard'

export const TutorDashboardPage = () => {
  return (
    <MainLayout>
      <div>
        <div></div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {tutorData.map((tutor, index) => (
            <GroupCard
              key={index}
              title={tutor.title}
              description={tutor.description}
              tutor={tutor.tutor}
              faculty={tutor.faculty}
              students={tutor.students}
            />
          ))}
        </div>
      </div>
      {/* <GroupCard title='sscsc' description='dskjs' tutor='csjbjs' faculty='svd' students={2} isActive={true}></GroupCard> */}
    </MainLayout>
  )
}
