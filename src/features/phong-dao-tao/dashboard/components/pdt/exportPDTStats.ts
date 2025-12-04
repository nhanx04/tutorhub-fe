import type { PDTStat } from 'src/types/pdt'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportPDTStatsPdf(rows: PDTStat[], opts?: { title?: string; dateBadge?: string; fileName?: string }) {
  const title = opts?.title ?? 'PDT Statistics'
  const dateBadge = opts?.dateBadge ? ` (${opts.dateBadge})` : ''
  const fileName = opts?.fileName ?? toSafeFileName(`${title}${dateBadge}.pdf`)

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  doc.setFontSize(16)
  doc.text(`${title}${dateBadge}`, 40, 40)

  const body = rows.map((r, i) => [
    i + 1,
    r.name,
    r.tutorCount,
    r.studentCount,
    r.groupCount,
    r.consultationCount
  ])

  autoTable(doc, {
    startY: 60,
    head: [[ '#', 'Name', 'Tutors', 'Students', 'Groups', 'Consultations' ]],
    body,
    headStyles: { fillColor: [49, 79, 170], textColor: '#ffffff', fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 }
  })

  doc.save(fileName)
}

export function exportPDTStatsCsv(rows: PDTStat[], opts?: { title?: string; dateBadge?: string; fileName?: string }) {
  const title = opts?.title ?? 'PDT Statistics'
  const dateBadge = opts?.dateBadge ? ` (${opts.dateBadge})` : ''
  const fileName = opts?.fileName ?? toSafeFileName(`${title}${dateBadge}.csv`)

  const header = ['#', 'Name', 'Tutors', 'Students', 'Groups', 'Consultations']
  const lines = [header.join(',')]
  rows.forEach((r, i) => {
    const vals = [i + 1, escapeCsv(r.name), r.tutorCount, r.studentCount, r.groupCount, r.consultationCount]
    lines.push(vals.join(','))
  })

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

function toSafeFileName(name: string) {
  return name.replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, '_')
}

