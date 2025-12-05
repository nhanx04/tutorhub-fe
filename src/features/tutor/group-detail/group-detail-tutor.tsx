import { MainLayout } from 'src/layouts'
import { GroupInformation } from './components/GroupInformation'
import { GrCircleInformation } from 'react-icons/gr'
import { FaListUl } from 'react-icons/fa'
import { ConsultationCard } from './components/ConsultationCard'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { groupService } from 'src/services/groupService'
import { consultationService } from 'src/services/consultationService'
import type { Group, Consultation, Session } from 'src/types'
import ErrorFallback from './components/ErrorFallBack'

// Helper function to convert Consultation to Session format
const convertConsultationToSession = (consultation: Consultation): Session => {
  return {
    sid: consultation.id,
    generalDetails: {
      topic: consultation.topic,
      description: consultation.description,
      links: []
    },
    timeAndLocation: {
      time: consultation.consultationTime,
      date: consultation.consultationDate,
      location: consultation.type === 'OFFLINE' ? consultation.locationLink : undefined,
      meetingLink: consultation.type === 'ONLINE' ? consultation.locationLink : undefined
    },
    students: '0/0', // This should come from API if available
    status: (() => {
      if (consultation.status === 'CANCELED') return 'Canceled'
      // Timezone-safe date comparison
      const today = new Date().toISOString().split('T')[0] // Gets 'YYYY-MM-DD' in UTC
      if (consultation.consultationDate < today) return 'Completed'
      if (consultation.status === 'COMPLETED') return 'Completed'
      return 'Allow Register' // Default for SCHEDULED
    })()
  }
}

export const GroupDetailTutorPage = () => {
  const { id } = useParams<{ id: string }>()
  const [group, setGroup] = useState<Group | null>(null)
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGroupAndConsultations = async () => {
    if (!id) {
      setError('Group ID is missing.')
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const groupData = await groupService.getGroupById(id)
      setGroup(groupData)

      const consultationsData = await consultationService.getConsultationsByGroup(parseInt(id))
      setConsultations(consultationsData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch group details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchGroupAndConsultations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) {
    return (
      <MainLayout>
        <p>Loading group details...</p>
      </MainLayout>
    )
  }

  if (error) {
    return <ErrorFallback message={error} />
  }

  if (!group) {
    return <ErrorFallback message='Group not found.' />
  }

  return (
    <MainLayout>
      <div className='flex flex-col px-6 mb-7'>
        <div className='flex gap-3 text-2xl font-semibold bg-indigo-100 px-5 py-3 rounded-t-lg border border-gray-300 text-indigo-700 shadow-sm'>
          <GrCircleInformation size={26} className='mt-0.5' />
          <h1>Group Information</h1>
        </div>
        <GroupInformation
          id={group.id}
          groupName={group.groupName}
          description={group.description}
          onConsultationCreated={fetchGroupAndConsultations}
        />
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
          <div className='flex gap-10 w-[50%] min-w-[300px]'>
            <h1 className='w-12 font-semibold flex-shrink-0'>Con.ID</h1>
            <h1 className='flex-1 font-semibold'>General Details</h1>
          </div>

          <div className='w-[22%] min-w-[150px] text-center'>
            <h1 className='font-semibold'>Time & Location</h1>
          </div>

          <div className='w-[12%] min-w-[80px] text-center'>
            <h1 className='font-semibold'>Status</h1>
          </div>

          <div className='w-[16%] min-w-[90px] text-center'>
            <h1 className='font-semibold'>Actions</h1>
          </div>
        </div>

        {/* Consultations List */}
        {consultations.length === 0 ? (
          <div className='p-6 text-center text-gray-500'>Tutor chưa có tạo buổi tư vấn nào, vui lòng thử lại sau!</div>
        ) : (
          consultations.map((consultation) => (
            <ConsultationCard
              key={consultation.id}
              session={convertConsultationToSession(consultation)}
              groupId={group.id}
            />
          ))
        )}
      </div>
    </MainLayout>
  )
}
