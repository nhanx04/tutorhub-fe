import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import type { PDTStat } from 'src/types/pdt'

type Props = {
  title?: string
  data: PDTStat[]
  loading?: boolean
}

export default function PDTBarChart({ title = 'Statistics', data, loading = false }: Props) {
  return (
    <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='text-base font-semibold'>{title}</h3>
        {loading && <span className='text-xs text-gray-500'>Loading...</span>}
      </div>

      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid stroke='#e5e7eb' vertical={false} />
            <XAxis dataKey='name' tick={{ fill: '#374151' }} tickMargin={8} />
            <YAxis allowDecimals={false} tick={{ fill: '#374151' }} tickMargin={8} />
            <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#e5e7eb' }} />
            <Legend verticalAlign='bottom' height={24} />
            <Bar dataKey='tutorCount' name='Tutors' fill='#4F46E5' barSize={24} radius={[4,4,0,0]} />
            <Bar dataKey='studentCount' name='Students' fill='#10B981' barSize={24} radius={[4,4,0,0]} />
            <Bar dataKey='groupCount' name='Groups' fill='#F59E0B' barSize={24} radius={[4,4,0,0]} />
            <Bar dataKey='consultationCount' name='Consultations' fill='#EF4444' barSize={24} radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

