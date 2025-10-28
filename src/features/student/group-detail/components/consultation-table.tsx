import type { ConsultationSession } from 'src/types'

export const columns = [
  {
    header: 'Con. ID',
    accessor: 'conId' as keyof ConsultationSession,
    width: '5%'
  },
  {
    header: 'General Details',
    accessor: 'generalDetails' as keyof ConsultationSession,
    width: '40%',
    render: (row: ConsultationSession) => (
      <div>
        <p className='font-semibold'>{row.generalDetails.title}</p>
        <p className='text-sm text-gray-600 mt-1'>{row.generalDetails.description}</p>
        <ul className='list-disc list-inside mt-1'>
          {row.generalDetails.links.map((link, index) => (
            <li key={index} className='text-sm'>
              Tài liệu {index + 1}:{' '}
              <a href={link} className='text-blue-600 hover:underline' target='_blank' rel='noopener noreferrer'>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    header: 'Time & Location',
    accessor: 'timeAndLocation' as keyof ConsultationSession,
    width: '15%',
    render: (row: ConsultationSession) => (
      <div>
        <p>{row.timeAndLocation.time}</p>
        <p>{row.timeAndLocation.date}</p>
        {row.timeAndLocation.location && <p>{row.timeAndLocation.location}</p>}
        {row.timeAndLocation.meetingLink && (
          <button className='text-blue-500'>{row.timeAndLocation.meetingLink}</button>
        )}
      </div>
    )
  },
  {
    header: 'Students',
    accessor: 'students' as keyof ConsultationSession,
    width: '10%'
  },
  {
    header: 'Status',
    accessor: 'status' as keyof ConsultationSession,
    width: '15%',
    render: (row: ConsultationSession) => (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          row.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
        }`}
      >
        {row.status}
      </span>
    )
  },
  {
    header: 'Actions',
    accessor: 'id' as keyof ConsultationSession, // Dùng id để xác định hành động
    width: '15%',
    render: (row: ConsultationSession) => (
      <div className='flex flex-col space-y-2'>
        {row.status === 'Allow Register' ? (
          <>
            <button className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'>Register</button>
            <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>Cancel</button>
          </>
        ) : (
          <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>Feedback</button>
        )}
      </div>
    )
  }
]
