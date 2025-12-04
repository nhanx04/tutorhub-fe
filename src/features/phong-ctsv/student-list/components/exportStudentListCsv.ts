import type { StudentStat } from 'src/types/ctsv'

export const exportStudentListCsv = (rows: StudentStat[], fileName = 'student-statistics.csv') => {
  const header = ['User ID', 'Name', 'Faculty', 'Groups', 'Consultations']
  const lines = [header.join(',')]
  for (const r of rows) {
    const vals = [
      r.userId,
      escapeCsv(r.userName),
      escapeCsv(r.facultyName),
      r.groupCount,
      r.consultationCount
    ]
    lines.push(vals.join(','))
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function escapeCsv(val: string | number) {
  const s = String(val)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

