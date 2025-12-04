import { MainLayout } from 'src/layouts'

import { useEffect, useMemo, useState } from 'react'
import DateRangeFilter, { type DateRange } from './components/DateRangeFilter'
import PDTBarChart from './components/pdt/PDTBarChart'
import PDTStatsTable from './components/pdt/PDTStatsTable'
import { statisticsService } from 'src/services/statisticsService'
import type { PDTStat } from 'src/types/pdt'
import { toBadge } from './utils/date'

export const PDTDashboardPage = () => {
  const [range, setRange] = useState<DateRange>({ from: '2025-01-01', to: '2025-12-31' })
  const [facultyStats, setFacultyStats] = useState<PDTStat[]>([])
  const [topicStats, setTopicStats] = useState<PDTStat[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (r: DateRange) => {
    try {
      setLoading(true)
      setError(null)
      const { from, to } = r
      const [byFaculty, byTopic] = await Promise.all([
        statisticsService.getByFaculty({ startDate: from!, endDate: to! }),
        statisticsService.getByTopic({ startDate: from!, endDate: to! })
      ])
      setFacultyStats(byFaculty)
      setTopicStats(byTopic)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Cannot load statistics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchData(range)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const badge = `${toBadge(range.from)} - ${toBadge(range.to)}`

  return (
    <MainLayout>
      <div className='p-6'>
        {/* Filter */}
        <div className='mb-4'>
          <DateRangeFilter
            initial={range}
            onApply={(r) => {
              setRange(r)
              void fetchData(r)
            }}
          />
        </div>

        {error && <div className='mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700'>{error}</div>}

        {/* Charts */}
        <div className='grid gap-4 md:grid-cols-2'>
          <PDTBarChart title='By Faculty' data={facultyStats} loading={loading} />
          <PDTBarChart title='By Topic' data={topicStats} loading={loading} />
        </div>

        {/* Tables */}
        <div className='mt-4 grid gap-4 md:grid-cols-2'>
          <PDTStatsTable title='Faculty Statistic' dateBadge={badge} rows={facultyStats} />
          <PDTStatsTable title='Topic Statistic' dateBadge={badge} rows={topicStats} />
        </div>
      </div>
    </MainLayout>
  )
}
