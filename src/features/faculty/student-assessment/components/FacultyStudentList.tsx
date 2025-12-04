import { useEffect, useMemo, useState } from 'react'
import { facultyService } from 'src/services/facultyService'
import type { FacultyStudent } from 'src/types'
import Table, { type Column } from './Table'
import { useAuth } from 'src/hooks'
import { exportFacultyStudentsPdf, exportFacultyStudentsCsv } from './exportFacultyStudents'
import { FiDownload } from 'react-icons/fi'
import { LuFileSpreadsheet } from 'react-icons/lu'

export default function FacultyStudentList() {
  const { user } = useAuth()
  const facultyId = user?.facultyId
  const [students, setStudents] = useState<FacultyStudent[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const columns: Column<FacultyStudent>[] = useMemo(
    () => [
      { header: 'Student ID', accessor: 'studentId', width: '10%', textAlign: 'center' },
      { header: 'Name', accessor: 'studentName', width: '20%' },
      { header: 'Email', accessor: 'email', width: '20%' },
      { header: 'Group', width: '15%', render: (row) => row.groupName ?? '-' },
      { header: 'Score', width: '10%', render: (row) => row.score ?? '-', textAlign: 'center' },
      { header: 'Attendance', width: '10%', render: (row) => (row.attendance ? 'Yes' : 'No'), textAlign: 'center' },
      { header: 'Feedback', accessor: 'feedback', width: '25%' }
    ],
    []
  )

  const fetchStudents = async () => {
    try {
      if (!facultyId) {
        setError('Missing facultyId from current user. Please relogin or contact admin.')
        setStudents([])
        return
      }
      setLoading(true)
      setError(null)

      const data = await facultyService.getFacultyStudents(facultyId)
      setStudents(data)
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to load faculty students.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facultyId])

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    if (!kw) return students
    return students.filter((s) =>
      [s.studentName, s.email, s.groupName ?? ''].some((v) => v?.toLowerCase().includes(kw))
    )
  }, [keyword, students])

  return (
    <div className='mt-0'>
      {/* Keyword search */}
      <div className='mb-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 rounded-lg border border-indigo-200 bg-white'>
        <div className='md:col-span-3'>
          <label className='block text-xs font-medium text-gray-700'>Search</label>
          <input
            type='text'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Enter keyword (name, email, group name)'
            className='w-full px-4 py-2 border rounded-lg'
            disabled={loading}
          />
        </div>
        <div className='flex gap-2 md:col-span-1'>
          <button
            onClick={() => void fetchStudents()}
            disabled={loading || !facultyId}
            className='flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-gray-400'
          >
            Refresh
          </button>
        </div>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
        <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
          <h4 className='text-sm font-semibold'>Faculty Students {facultyId ? `(Faculty ${facultyId})` : ''}</h4>
          <div className='flex items-center gap-2'>
            <span className='rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700'>
              {filtered.length} students
            </span>
            <button
              onClick={() => exportFacultyStudentsPdf(filtered)}
              className='inline-flex items-center gap-1 rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700'
              title='Export PDF'
            >
              <FiDownload size={14} /> PDF
            </button>
            <button
              onClick={() => exportFacultyStudentsCsv(filtered)}
              className='inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700'
              title='Export Excel (CSV)'
            >
              <LuFileSpreadsheet size={14} /> Excel
            </button>
          </div>
        </div>
        <div className='p-4'>
          {loading && <p className='text-center text-gray-500'>Loading...</p>}
          {error && <p className='text-center text-red-500'>{error}</p>}
          {!loading && !error && <Table columns={columns} data={filtered} />}
        </div>
      </div>
    </div>
  )
}
