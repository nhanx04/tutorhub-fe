import React from 'react'
import type { ConsulCardProps } from 'src/types'
import { MdOutlineFeedback } from 'react-icons/md'
import { RxCrossCircled } from 'react-icons/rx'
import { useState } from 'react'
import Modal from '../../dashboard/components/PopupNoti'

export const ConsultationCard: React.FC<ConsulCardProps> = ({ session }) => {
  const { sid, generalDetails, timeAndLocation, students, status } = session
  const [showCancel, setShowCancel] = useState(false)
  const statusColors = {
    'Allow Register': 'bg-yellow-300 text-yellow-800',
    Completed: 'bg-green-400 text-green-800',
    Canceled: 'bg-red-400 text-red-800'
  }

  const handleCancel = () => {
    //GỌI API để xóa buổi tư vấn
    console.log('sid:', sid)
    setShowCancel(false)
  }
  //này ko rõ là tutor xem feedback của sinh viên hay phòng đào tạo hay ntn ?
  const handleFeedback = ({ sid }: { sid: string | number }) => {
    //GỌI API xử lý
  }

  return (
    <div>
      {showCancel && (
        <Modal
          show={showCancel}
          onClick={() => handleCancel()}
          title='Xác nhận!'
          message='Xóa nhóm tư vấn'
          icon={<RxCrossCircled size={100} className='text-red-600' />}
        />
      )}
      <div className='bg-white px-5 py-5 border-b border-gray-300'>
        <div className='flex items-start text-sm lg:text-base gap-4'>
          {/* sid và thông tin sơ bộ */}
          <div className='flex gap-10 w-[40%] min-w-[300px]'>
            <p className='w-12 flex-shrink-0'>#{sid}</p>

            <div className='flex-1'>
              <h3 className='font-semibold break-words'>{generalDetails.topic}</h3>
              <p className='text-sm text-gray-600 mt-1 break-words'>{generalDetails.description}</p>
              <ul className='list-none mt-2 text-sm'>
                {generalDetails.links.map((link, idx) => (
                  <li key={idx} className='mb-1'>
                    <span className='whitespace-nowrap'>- Tài liệu {idx + 1}: </span>
                    <a
                      href={link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 break-all hover:underline'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* thời gian địa điểm */}
          <div className='flex flex-col gap-2 items-center justify-start w-[20%] min-w-[150px] text-center'>
            <p className='text-sm'>
              {Array.isArray(timeAndLocation.time) ? timeAndLocation.time.join(', ') : timeAndLocation.time}
            </p>
            <p className='text-sm'>{timeAndLocation.date}</p>
            <p className='text-sm'>{timeAndLocation.location}</p>
            {timeAndLocation.meetingLink && (
              <a
                href={timeAndLocation.meetingLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white bg-blue-400 px-3 py-1 rounded-md text-sm hover:bg-blue-500 transition'
              >
                Open meeting
              </a>
            )}
          </div>

          {/* số lượng */}
          <div className='flex items-center justify-center w-[15%] min-w-[100px] text-center'>
            <p className='text-sm'>{students}</p>
          </div>

          {/* trạng thái */}
          <div className='flex items-center justify-center w-[12%] min-w-[80px] text-center'>
            <p className={`text-xs w-25 py-1 rounded-md text-black ${statusColors[status] || ''}`}>{status}</p>
          </div>

          {/* các hành động */}
          <div className='flex items-center justify-center w-[13%] min-w-[90px] text-center text-white text-base'>
            {status === 'Completed' && (
              <button
                onClick={() => handleFeedback?.({ sid })}
                className='flex items-center gap-1 bg-blue-800 w-25 px-2 py-1 rounded-md border-2 border-blue-800 hover:bg-white hover:text-blue-800'
              >
                <MdOutlineFeedback size={20}></MdOutlineFeedback>
                <p>Feedback</p>
              </button>
            )}
            {status === 'Allow Register' && (
              <button
                onClick={() => setShowCancel?.(true)}
                className='flex items-center gap-1 bg-red-800 w-25 px-2 py-1 rounded-md border-2 border-red-800 hover:bg-white hover:text-red-800'
              >
                <RxCrossCircled size={15}></RxCrossCircled>
                <p>Cancel</p>
              </button>
            )}
            {status === 'Canceled' && <p></p>}
          </div>
        </div>
      </div>
    </div>
  )
}
