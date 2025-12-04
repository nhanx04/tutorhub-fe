import React, { useState, useEffect } from 'react'
import { MainLayout } from 'src/layouts'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { consultationService } from 'src/services/consultationService'
import type { StudentReview } from 'src/types/tutor/reviews'

export const GroupFeedbackPage: React.FC = () => {
  const { id: groupId } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const consultationId = searchParams.get('sid')
  const navigate = useNavigate()

  const [students, setStudents] = useState<StudentReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!consultationId) {
      setError('Consultation ID is missing from the URL.')
      setLoading(false)
      return
    }

    const fetchStudents = async () => {
      try {
        setLoading(true)
        const data = await consultationService.getReviewableStudents(Number(consultationId))
        // Initialize null values to prevent uncontrolled component warnings
        const initialData = data.map((s) => ({
          ...s,
          attendance: s.attendance ?? false,
          score: s.score ?? 0,
          feedback: s.feedback ?? ''
        }))
        setStudents(initialData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch students.')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [consultationId])

  const handleReviewChange = (studentId: number, field: keyof StudentReview, value: string | number | boolean) => {
    setStudents((prev) => prev.map((s) => (s.studentId === studentId ? { ...s, [field]: value } : s)))
  }

  const handleSave = async () => {
    if (!consultationId) {
      setError('Consultation ID is missing.')
      return
    }

    try {
      const reviewsToSubmit = students.map(({ studentId, attendance, score, feedback }) => ({
        studentId,
        attendance: attendance ?? false,
        score: score ?? 0,
        feedback: feedback ?? ''
      }))

      await consultationService.submitStudentReviews(Number(consultationId), reviewsToSubmit)
      navigate(`/tutor/group-detail/${groupId}`) // Navigate back to the group detail page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit reviews.')
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className='p-6 text-center'>Loading students...</div>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div className='p-6 text-center text-red-500'>{error}</div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className='p-6'>
        <div className='bg-white rounded-lg p-6 border'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-semibold'>Student Review</h1>
            <div className='space-x-3'>
              <button onClick={() => navigate(-1)} className='px-4 py-2 bg-gray-100 rounded'>
                Cancel
              </button>
              <button onClick={handleSave} className='px-4 py-2 bg-blue-600 text-white rounded'>
                Save
              </button>
            </div>
          </div>

          <div className='mt-6 overflow-x-auto'>
            <table className='min-w-full text-black'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='py-2 px-4 text-left'>Stu. ID</th>
                  <th className='py-2 px-4 text-left'>Name</th>
                  <th className='py-2 px-4 text-left'>Email</th>
                  <th className='py-2 px-4 text-left'>Score</th>
                  <th className='py-2 px-4 text-left'>Feedback</th>
                  <th className='py-2 px-4 text-center'>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.studentId} className='border-b hover:bg-gray-50'>
                    <td className='py-2 px-4'>{s.studentId}</td>
                    <td className='py-2 px-4'>{s.studentName}</td>
                    <td className='py-2 px-4'>{s.studentEmail}</td>
                    <td className='py-2 px-4'>
                      <input
                        type='number'
                        min={0}
                        max={10}
                        value={s.score ?? 0}
                        onChange={(e) => handleReviewChange(s.studentId, 'score', parseInt(e.target.value || '0'))}
                        className='w-16 border rounded px-2 py-1 text-black'
                      />
                    </td>
                    <td className='py-2 px-4'>
                      <input
                        value={s.feedback ?? ''}
                        onChange={(e) => handleReviewChange(s.studentId, 'feedback', e.target.value)}
                        className='w-full border rounded px-2 py-1 text-black'
                      />
                    </td>
                    <td className='py-2 px-4 text-center'>
                      <input
                        type='checkbox'
                        checked={s.attendance ?? false}
                        onChange={(e) => handleReviewChange(s.studentId, 'attendance', e.target.checked)}
                        className='w-5 h-5'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default GroupFeedbackPage
