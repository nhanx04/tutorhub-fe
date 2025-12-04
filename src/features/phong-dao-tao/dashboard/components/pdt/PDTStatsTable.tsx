import type { PDTStat } from 'src/types/pdt'
import { exportPDTStatsPdf, exportPDTStatsCsv } from './exportPDTStats'
import { FiDownload } from 'react-icons/fi'
import { LuFileSpreadsheet } from 'react-icons/lu'

type Props = {
  title: string
  dateBadge?: string
  rows: PDTStat[]
}

export default function PDTStatsTable({ title, dateBadge, rows }: Props) {
  return (
    <div className='rounded-lg border border-gray-200 bg-white shadow-sm'>
      <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
        <div className='flex items-center gap-2'>
          <span className='inline-flex h-5 w-5 items-center justify-center rounded bg-indigo-600 text-xs font-bold text-white'>
            ∎
          </span>
          <h4 className='text-sm font-semibold'>{title}</h4>
        </div>
        <div className='flex items-center gap-2'>
          {dateBadge && (
            <span className='rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700'>{dateBadge}</span>
          )}
          <button
            onClick={() => exportPDTStatsPdf(rows, { title, dateBadge })}
            className='inline-flex items-center gap-1 rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700'
            title='Export PDF'
          >
            <FiDownload size={14} /> PDF
          </button>
          <button
            onClick={() => exportPDTStatsCsv(rows, { title, dateBadge })}
            className='inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700'
            title='Export Excel (CSV)'
          >
            <LuFileSpreadsheet size={14} /> Excel
          </button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full text-left text-sm'>
          <thead className='bg-gray-50 text-gray-600'>
            <tr>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2 text-center'>Tutors</th>
              <th className='px-4 py-2 text-center'>Students</th>
              <th className='px-4 py-2 text-center'>Groups</th>
              <th className='px-4 py-2 text-center'>Consultations</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={`${r.id}-${r.name}`} className={idx % 2 ? 'bg-white' : 'bg-gray-50/60'}>
                <td className='px-4 py-2'>{idx + 1}</td>
                <td className='px-4 py-2'>{r.name}</td>
                <td className='px-4 py-2 text-center'>{r.tutorCount}</td>
                <td className='px-4 py-2 text-center'>{r.studentCount}</td>
                <td className='px-4 py-2 text-center'>{r.groupCount}</td>
                <td className='px-4 py-2 text-center'>{r.consultationCount}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className='px-4 py-6 text-center text-gray-500'>
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
