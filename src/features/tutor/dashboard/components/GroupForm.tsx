import React, { useState, useEffect } from 'react'
import { MainLayout } from 'src/layouts'
import { RxCrossCircled } from 'react-icons/rx'
import { SiTicktick } from 'react-icons/si'
import { topicData } from '../mock-data/topic_data'
import { LuPenLine } from 'react-icons/lu'
import Modal from './PopupNoti'
import type { TutorGroupFormProps } from 'src/types'

const GroupForm: React.FC<TutorGroupFormProps> = ({ mode, initialData, onCancel, onSubmit }) => {
  const [topic, setTopic] = useState(initialData?.topic || '')
  const [title, setGroupName] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [fromDate, setFromDate] = useState(initialData?.fromDate || '2025-01-01')
  const [toDate, setToDate] = useState(initialData?.toDate || '2025-12-31')
  const [students, setNumStudents] = useState(initialData?.students || 0)
  const [status, setStatus] = useState(initialData?.status || 'active')
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = { topic, title, description, fromDate, toDate, students, status }
    onSubmit(data)
    setShowConfirm(true)
  }

  return (
    <div>
      {/* form thay đổi phụ thuộc vào dạng form */}
      {showConfirm && (
        <Modal
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
          title={mode === 'create' ? 'Đã lưu!' : 'Đã cập nhật!'}
          message={mode === 'create' ? 'Tạo nhóm thành công.' : 'Cập nhật thông tin nhóm thành công.'}
          icon={
            mode === 'create' ? (
              <SiTicktick size={100} className='text-green-600' />
            ) : (
              <LuPenLine size={100} className='text-orange-600' />
            )
          }
        />
      )}

      <MainLayout>
        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 text-sm text-gray-600'>
            <div className='flex flex-col gap-5'>
              <div>
                <p className='mb-1 font-medium'>Topic</p>
                <select
                  className='w-full border border-gray-300 rounded-lg px-3 py-2'
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value=''>Select Topic</option>
                  {topicData.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className='mb-1 font-medium'>Group name</p>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder='Enter group name'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  required
                />
              </div>

              <div>
                <p className='mb-1 font-medium'>Description</p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Enter group description...'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 h-40 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
              </div>
            </div>

            <div className='grid md:grid-rows-1 lg:grid-cols-2 gap-5'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='mb-1 font-medium'>From</p>
                  <input
                    type='date'
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                </div>

                <div>
                  <p className='mb-1 font-medium'>To</p>
                  <input
                    type='date'
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <div>
                  <p className='mb-1 font-medium'>Number of students</p>
                  <input
                    type='number'
                    min={0}
                    value={students}
                    onChange={(e) => setNumStudents(Number(e.target.value))}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                </div>

                <div>
                  <p className='mb-1 font-medium'>Status</p>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  >
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* nút save/update, cancel */}
          <div className='flex justify-end gap-4 mt-8'>
            <div
              onClick={onCancel}
              className='w-27 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 hover:bg-gray-100'
            >
              <RxCrossCircled></RxCrossCircled>
              <button>Cancel</button>
            </div>

            {/* màu và nội dung nút phụ thuộc và kiểu form */}
            <div
              onClick={handleSubmit}
              className={[
                'w-27 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition',
                mode === 'create' ? 'bg-blue-800 hover:bg-blue-950' : 'bg-orange-500 hover:bg-orange-800'
              ].join(' ')}
            >
              {mode === 'create' ? <SiTicktick /> : <LuPenLine />}
              <button>{mode === 'create' ? 'Save' : 'Update'}</button>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default GroupForm
