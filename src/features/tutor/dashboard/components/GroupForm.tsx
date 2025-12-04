import React, { useState, useEffect } from 'react'
import { MainLayout } from 'src/layouts'
import { RxCrossCircled } from 'react-icons/rx'
import { SiTicktick } from 'react-icons/si'
import { LuPenLine } from 'react-icons/lu'
import Modal from './PopupNoti'
import { topicService } from 'src/services/topicService'
import { facultyService } from 'src/services/facultyService'
import type { Group, GroupFormData, Topic, Faculty } from 'src/types'

interface GroupFormProps {
  mode: 'create' | 'edit'
  initialData?: Group // Use the full Group type for initial data
  onCancel: () => void
  onSubmit: (data: GroupFormData) => void
}

const GroupForm: React.FC<GroupFormProps> = ({ mode, initialData, onCancel, onSubmit }) => {
  const [groupName, setGroupName] = useState(initialData?.groupName || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [startDate, setStartDate] = useState(initialData?.startDate || '2025-01-01')
  const [endDate, setEndDate] = useState(initialData?.endDate || '2025-12-31')
  const [studentLimit, setStudentLimit] = useState(initialData?.studentLimit || 0)
  const [status, setStatus] = useState(initialData?.status === '1' ? '1' : '0')
  const [facultyId, setFacultyId] = useState<number | undefined>(initialData?.faculty?.id)

  const [allTopics, setAllTopics] = useState<Topic[]>([])
  const [allFaculties, setAllFaculties] = useState<Faculty[]>([])
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [topicsData, facultiesData] = await Promise.all([
          topicService.getAllTopics(),
          facultyService.getAllFaculties()
        ])
        setAllTopics(topicsData)
        setAllFaculties(facultiesData)

        // Pre-select topics and faculty in edit mode
        if (mode === 'edit' && initialData) {
          const preselected = topicsData.filter((t: Topic) =>
            initialData.topics.some((initialTopic) => initialTopic.id === t.id)
          )
          setSelectedTopics(preselected)
        }
        setError(null)
      } catch (err) {
        setError('Failed to load form data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [mode, initialData])

  const handleSelectTopic = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const topicId = parseInt(e.target.value, 10)
    if (!topicId) return

    const topicToAdd = allTopics.find((t) => t.id === topicId)
    if (topicToAdd && !selectedTopics.some((st) => st.id === topicId)) {
      setSelectedTopics([...selectedTopics, topicToAdd])
    }
    e.target.value = ''
  }

  const handleRemoveTopic = (topicId: number) => {
    setSelectedTopics(selectedTopics.filter((t) => t.id !== topicId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!facultyId) {
      setError('Please select a faculty.')
      return
    }
    const data = {
      groupName,
      description,
      studentLimit,
      status,
      startDate,
      endDate,
      topicIds: selectedTopics.map((t) => t.id),
      facultyId
    }
    onSubmit(data)
    setShowConfirm(true)
  }

  const handleBack = () => {
    setShowConfirm(false)
    onCancel()
  }

  if (loading) {
    return (
      <MainLayout>
        <p>Loading form...</p>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <p className='text-red-500'>{error}</p>
      </MainLayout>
    )
  }

  return (
    <div>
      {showConfirm && (
        <Modal
          show={showConfirm}
          onClick={handleBack}
          title={mode === 'create' ? 'Success!' : 'Updated!'}
          message={mode === 'create' ? 'Group created successfully.' : 'Group updated successfully.'}
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
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-sm'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 text-sm text-gray-600'>
            {/* Left Column */}
            <div className='flex flex-col gap-5'>
              {/* Topics Section */}
              <div>
                <p className='mb-1 font-medium'>Topics</p>
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
                <select
                  onChange={handleSelectTopic}
                  value=''
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>{selectedTopics.length === 0 ? 'Select Topic' : 'Add more topics...'}</option>
                  {allTopics
                    .filter((t) => !selectedTopics.some((st) => st.id === t.id))
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </select>
                {selectedTopics.length > 0 && (
                  <p className='text-xs text-gray-500 mt-2'>{selectedTopics.length} topic(s) selected</p>
                )}
              </div>

              {/* Group Name */}
              <div>
                <p className='mb-1 font-medium'>Group Name</p>
                <input
                  type='text'
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder='Enter group name'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  required
                />
              </div>

              {/* Description */}
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

            {/* Right Column */}
            <div className='flex flex-col gap-5'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='mb-1 font-medium'>Start Date</p>
                  <input
                    type='date'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                </div>
                <div>
                  <p className='mb-1 font-medium'>End Date</p>
                  <input
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                </div>
              </div>
              <div>
                <p className='mb-1 font-medium'>Student Limit</p>
                <input
                  type='number'
                  min={0}
                  value={studentLimit}
                  onChange={(e) => setStudentLimit(Number(e.target.value))}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
              </div>
              <div>
                <p className='mb-1 font-medium'>Faculty</p>
                <select
                  value={facultyId || ''}
                  onChange={(e) => setFacultyId(Number(e.target.value))}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  required
                >
                  <option value='' disabled>
                    Select Faculty
                  </option>
                  {allFaculties.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className='mb-1 font-medium'>Status</p>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                >
                  <option value='1'>Active</option>
                  <option value='0'>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex justify-end gap-4 mt-8'>
            <button
              type='button'
              onClick={onCancel}
              className='w-27 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 hover:bg-gray-100'
            >
              <RxCrossCircled /> Cancel
            </button>
            <button
              type='submit'
              className={`w-27 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition ${mode === 'create' ? 'bg-blue-800 hover:bg-blue-950' : 'bg-orange-500 hover:bg-orange-800'}`}
            >
              {mode === 'create' ? <SiTicktick /> : <LuPenLine />} {mode === 'create' ? 'Save' : 'Update'}
            </button>
          </div>
        </form>
      </MainLayout>
    </div>
  )
}

export default GroupForm
