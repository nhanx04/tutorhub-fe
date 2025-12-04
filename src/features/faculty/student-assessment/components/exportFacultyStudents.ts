import type { FacultyStudent } from 'src/types'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportFacultyStudentsPdf(rows: FacultyStudent[], fileName = 'faculty-students.pdf') {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  doc.setFontSize(16)
  doc.text('Faculty Students', 40, 40)

  const body = rows.map((r) => [
    r.studentId,
    r.studentName,
    r.email,
    r.groupName ?? '-',
    r.score ?? '-',
    r.attendance ? 'Yes' : 'No',
    r.feedback ?? '-'
  ])

  autoTable(doc, {
    startY: 60,
    head: [[
      'Student ID',
      'Name',
      'Email',
      'Group',
      'Score',
      'Attendance',
      'Feedback'
    ]],
    body,
    headStyles: { fillColor: [49, 79, 170], textColor: '#ffffff', fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 }
  })

  doc.save(fileName)
}

export function exportFacultyStudentsCsv(rows: FacultyStudent[], fileName = 'faculty-students.csv') {
  const header = ['Student ID','Name','Email','Group','Score','Attendance','Feedback']
  const lines = [header.join(',')]
  for (const r of rows) {
    const vals = [
      r.studentId,
      escapeCsv(r.studentName),
      escapeCsv(r.email),
      escapeCsv(r.groupName ?? '-'),
      r.score ?? '-',
      r.attendance ? 'Yes' : 'No',
      escapeCsv(r.feedback ?? '-')
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

