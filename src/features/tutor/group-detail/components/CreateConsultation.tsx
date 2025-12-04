import React, { useState, useEffect } from 'react'
import type { NewConsul } from 'src/types'
import { RxCrossCircled } from 'react-icons/rx'
import { SiTicktick } from 'react-icons/si'
import { consultationService } from 'src/services/consultationService'
import { useParams } from 'react-router'

interface CreateConsultationModalProps {
  onBack: () => void
  onConsultationCreated: () => void
  groupId?: number
}

const CreateConsultationModal: React.FC<CreateConsultationModalProps> = ({
  onBack,
  onConsultationCreated,
  groupId
}) => {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    date: '',
    time: [] as string[],
    type: 'ONLINE',
    location: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.pointerEvents = 'none'

    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.pointerEvents = 'auto'
    }
  }, [])

  const timeOptions = [
    '7h',
    '8h',
    '9h',
    '10h',
    '11h',
    '12h',
    '13h',
    '14h',
    '15h',
    '16h',
    '17h',
    '18h',
    '19h',
    '20h',
    '21h',
    '22h'
  ]

  const toggleTime = (time: string) => {
    setFormData((prev) => {
      const exists = prev.time.includes(time)
      let newTimes = exists ? prev.time.filter((t) => t !== time) : [...prev.time, time]

      // sort mảng time
      newTimes = newTimes.sort((a, b) => parseInt(a) - parseInt(b))

      return { ...prev, time: newTimes }
    })
  }

  const handleSaveConsul = async () => {
    try {
      setError(null)
      setLoading(true)

      // Validate form data
      if (!formData.topic.trim()) {
        setError('Topic is required')
        return
      }
      if (!formData.description.trim()) {
        setError('Description is required')
        return
      }
      if (!formData.date) {
        setError('Date is required')
        return
      }
      if (formData.time.length === 0) {
        setError('At least one time slot is required')
        return
      }
      if (!formData.location.trim()) {
        setError('Location/Link is required')
        return
      }

      const gId = groupId || parseInt(id || '0')
      if (!gId) {
        setError('Group ID is missing')
        return
      }

      // Convert time array to HH:00:00 format (using first time slot)
      const timeSlot = formData.time[0]
      const consultationTime = `${timeSlot.replace('h', '')}:00:00`

      const consultationData = {
        topic: formData.topic,
        description: formData.description,
        consultationDate: formData.date,
        consultationTime: consultationTime,
        type: formData.type.toUpperCase() as 'ONLINE' | 'OFFLINE',
        locationLink: formData.location,
        groupId: gId,
        status: 'SCHEDULED' as const
      }

      await consultationService.createConsultation(consultationData)
      onConsultationCreated()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create consultation'
      setError(errorMessage)
      console.error('Error saving consultation:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    document.body.style.pointerEvents = 'auto'
    onBack?.()
  }

  return (
    <div
      className='fixed inset-0 bg-black/10 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50'
      style={{ pointerEvents: 'auto' }}
    >
      <div className='bg-white rounded-lg shadow-2xl w-full max-w-3xl' onClick={(e) => e.stopPropagation()}>
        <div className='flex items-center justify-between px-6 py-4 border border-gray-300 bg-indigo-100 rounded-t-lg'>
          <h2 className='text-xl font-semibold text-gray-800'>Create new consultation</h2>
        </div>

        <div className='p-6'>
          <div className='grid grid-cols-2 gap-6'>
            {/* Cột trái */}
            <div className='space-y-5'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Topic</label>
                <input
                  type='text'
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter topic'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                  placeholder='Enter description'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>Type</label>
                <div className='flex gap-6'>
                  <label className='flex items-center cursor-pointer'>
                    <input
                      type='radio'
                      name='type'
                      value='OFFLINE'
                      checked={formData.type === 'OFFLINE'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'ONLINE' | 'OFFLINE' })}
                      className='w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500'
                    />
                    <span className='ml-2 text-gray-700'>Offline</span>
                  </label>
                  <label className='flex items-center cursor-pointer'>
                    <input
                      type='radio'
                      name='type'
                      value='ONLINE'
                      checked={formData.type === 'ONLINE'}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'ONLINE' | 'OFFLINE' })}
                      className='w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500'
                    />
                    <span className='ml-2 text-gray-700'>Online</span>
                  </label>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Location/Link</label>
                <input
                  type='text'
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder={formData.type === 'ONLINE' ? 'Enter meeting link' : 'Enter location'}
                />
              </div>
            </div>

            {/* Cột phải */}
            <div className='space-y-5'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Date</label>
                <input
                  type='date'
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Time</label>
                <div className='grid grid-cols-4 gap-2'>
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      type='button'
                      onClick={() => toggleTime(time)}
                      className={`px-3 py-1.5 text-sm rounded border transition ${
                        formData.time.includes(time)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md'>{error}</div>}

          {/* Footer */}
          <div className='flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200'>
            <button
              type='button'
              onClick={handleCancel}
              disabled={loading}
              className='flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-400 transition font-medium disabled:opacity-50'
            >
              <RxCrossCircled />
              Cancel
            </button>

            <button
              type='button'
              onClick={handleSaveConsul}
              disabled={loading}
              className='flex items-center gap-2 px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-900 transition font-medium disabled:opacity-50'
            >
              <SiTicktick />
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateConsultationModal
