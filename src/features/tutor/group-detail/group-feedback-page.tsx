import React, { useState } from 'react'
import { MainLayout } from 'src/layouts'
import { useParams, useSearchParams, useNavigate } from 'react-router'

interface Student {
  id: string
  name: string
  email: string
  score: number
  feedback: string
  attendance: boolean
}

// For now use mock data; replace with API fetch using groupId/sid
const mockStudents: Student[] = [
  { id: '123123', name: 'Nguyễn Trọng Nhân', email: 'nhan.nguyenxxx04@hcmut.edu.vn', score: 9, feedback: 'Học tốt', attendance: true },
  { id: '123124', name: 'Tran Thi Thuy', email: 'thuy.tranxx@hcmut.edu.vn', score: 8, feedback: 'Học tốt', attendance: false }
]

export const GroupFeedbackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const sid = searchParams.get('sid')
  const navigate = useNavigate()

  const [students, setStudents] = useState<Student[]>(mockStudents)

  const handleScoreChange = (studentId: string, value: number) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, score: value } : s))
  }

  const handleFeedbackChange = (studentId: string, value: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, feedback: value } : s))
  }

  const handleAttendanceChange = (studentId: string, value: boolean) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, attendance: value } : s))
  }

  const handleSave = () => {
    // call API to save feedback for group id / session sid
    console.log('Save feedback for group', id, 'sid', sid, students)
    navigate(-1)
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Student Review</h1>
            <div className="space-x-3">
              <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Stu. ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Score</th>
                  <th className="py-2 px-4 text-left">Feedback</th>
                  <th className="py-2 px-4 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{s.id}</td>
                    <td className="py-2 px-4">{s.name}</td>
                    <td className="py-2 px-4">{s.email}</td>
                    <td className="py-2 px-4">
                      <input type="number" min={0} max={10} value={s.score} onChange={(e) => handleScoreChange(s.id, parseInt(e.target.value || '0'))} className="w-16 border rounded px-2 py-1 text-black" />
                    </td>
                    <td className="py-2 px-4">
                      <input value={s.feedback} onChange={(e) => handleFeedbackChange(s.id, e.target.value)} className="w-full border rounded px-2 py-1 text-black" />
                    </td>
                    <td className="py-2 px-4 text-center">
                      <input type="checkbox" checked={s.attendance} onChange={(e) => handleAttendanceChange(s.id, e.target.checked)} className="w-5 h-5" />
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
