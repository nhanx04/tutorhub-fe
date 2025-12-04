import { useEffect, useMemo, useState } from 'react'
import type { Column } from 'src/features/faculty/student-assessment/components/Table'
import type { StudentStat } from 'src/types/ctsv'
import { statisticsService } from 'src/services/statisticsService'
import { facultyService } from 'src/services/facultyService'
import { topicService } from 'src/services/topicService'

interface Faculty {
  id: number
  name: string
}

interface Topic {
  id: number
  name: string
}

export const useStudentList = () => {
  const [facultyId, setFacultyId] = useState('')
  const [topicId, setTopicId] = useState('')
  const [keyword, setKeyword] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [filteredData, setFilteredData] = useState<StudentStat[]>([])
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    try {
      setLoading(true)
      setError(null)
      const params: any = {}
      if (facultyId) params.facultyId = Number(facultyId)
      if (topicId) params.topicId = Number(topicId)
      if (dateFrom) params.startDate = dateFrom
      if (dateTo) params.endDate = dateTo
      let data = await statisticsService.getByStudent(params)

      // Filter by keyword if provided
      if (keyword.trim()) {
        const kw = keyword.toLowerCase()
        data = data.filter((s) => s.userName.toLowerCase().includes(kw) || s.userId.toLowerCase().includes(kw))
      }

      setFilteredData(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load student statistics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadFacultiesAndTopics = async () => {
      try {
        const [facs, tops] = await Promise.all([facultyService.getAllFaculties(), topicService.getAllTopics()])
        setFaculties(facs)
        setTopics(tops)
      } catch (e) {
        console.error('Failed to load faculties/topics:', e)
      }
    }
    void loadFacultiesAndTopics()
    void handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: Column<StudentStat>[] = useMemo(
    () => [
      { header: 'User ID', accessor: 'userId', width: '12%' },
      { header: 'Name', accessor: 'userName', width: '28%' },
      { header: 'Faculty', accessor: 'facultyName', width: '28%' },
      { header: 'Groups', accessor: 'groupCount', width: '16%', textAlign: 'center' },
      { header: 'Consultations', accessor: 'consultationCount', width: '16%', textAlign: 'center' }
    ],
    []
  )

  return {
    facultyId,
    topicId,
    keyword,
    faculties,
    topics,
    setFacultyId,
    setTopicId,
    setKeyword,
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    filteredData,
    loading,
    error,
    handleSearch,
    columns
  }
}
