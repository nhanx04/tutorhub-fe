import React, { useState, useEffect } from 'react'
import { MainLayout } from 'src/layouts'
import { RxCrossCircled } from 'react-icons/rx'
import { SiTicktick } from 'react-icons/si'
import { topicData } from '../mock-data/topic_data'
import { LuPenLine } from 'react-icons/lu'
import Modal from './PopupNoti'
import type { TutorGroupFormProps } from 'src/types'

const GroupForm: React.FC<TutorGroupFormProps> = ({ mode, initialData, onCancel, onSubmit }) => {
  const [groupName, setGroupName] = useState(initialData?.groupName || '')
  const [topicIds, setTopics] = useState<number[]>(
    Array.isArray(initialData?.topicIds)
      ? initialData.topicIds.map((topic) => (typeof topic === 'number' ? topic : topic.id))
      : []
  )
  const [description, setDescription] = useState(initialData?.description || '')
  const [startDate, setFromDate] = useState(initialData?.startDate || '2025-01-01')
  const [endDate, setToDate] = useState(initialData?.endDate || '2025-12-31')
  const [studentLimit, setNumStudents] = useState(initialData?.studentLimit || 0)
  const [status, setStatus] = useState(initialData?.status || 'active')
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<(typeof topicData)[number][]>([])


  // vừa vào chế độ edit -->load các topic vào mảng selectedTopics
  useEffect(() => {
    if (mode === 'edit' && topicIds && topicIds.length > 0) {
      const preselected = topicData.filter((t) => topicIds.map(String).includes(String(t.id)))
      setSelectedTopics(preselected)
    }
  }, [mode, topicIds])

  // hàm thêm topic
  const handleSelectTopic = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const topicId = e.target.value
    if (!topicId) return

    const selectedTopic = topicData.find((t) => String(t.id) === topicId)
    if (selectedTopic && !selectedTopics.find((t) => String(t.id) === topicId)) {
      setSelectedTopics((prev) => [...prev, selectedTopic])
    }
    e.target.value = '' // kết thúc hàm reset lại
  }

  // hàm xóa topic
  const handleRemoveTopic = (topicId: string | number) => {
    setSelectedTopics((prev) => prev.filter((t) => String(t.id) !== String(topicId)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTopics(selectedTopics.map((t) => t.id))
    const data = { groupName, selectedTopics, description, startDate, endDate, studentLimit, status } //thiếu trường faculty(có thể thêm sau)
    // console.log(data)
    onSubmit(data)
    setShowConfirm(true)
  }

  const handleBack = () => {
    setShowConfirm(false)
    onCancel()
  }

  return (
    <div>
      {/* form thay đổi phụ thuộc vào dạng form */}
      {showConfirm && (
        <Modal
          show={showConfirm}
          onClick={() => handleBack()}
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

                {/* hiển thị các topic đã chọn */}
                {selectedTopics.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
                    {selectedTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className='flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-medium'
                      >
                        <span>{topic.name}</span>
                        <button
                          type='button'
                          onClick={() => handleRemoveTopic(topic.id)}
                          className='bg-red-700 hover:bg-red-950 rounded-sm p-0.5 w-5 transition'
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* dropdown để chọn topic */}
                <select
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value=''
                  onChange={handleSelectTopic}
                >
                  <option value=''>{selectedTopics.length === 0 ? 'Select Topic' : 'Add more topics...'}</option>
                  {topicData
                    .filter((t) => !selectedTopics.find((st) => st.id === t.id))
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </select>

                {/* hiển thị số lượng topics đã chọn */}
                {selectedTopics.length > 0 && (
                  <p className='text-xs text-gray-500 mt-2'>
                    {selectedTopics.length} topic{selectedTopics.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              <div>
                <p className='mb-1 font-medium'>Group name</p>
                <input
                  type='text'
                  value={groupName}
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
                    value={startDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                </div>

                <div>
                  <p className='mb-1 font-medium'>To</p>
                  <input
                    type='date'
                    value={endDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <div>
                  <p className='mb-1 font-medium'>Number of studentLimit</p>
                  <input
                    type='number'
                    min={0}
                    value={studentLimit}
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
            <button
              type='button'
              onClick={onCancel}
              className='w-27 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 hover:bg-gray-100'
            >
              <RxCrossCircled />
              Cancel
            </button>

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
