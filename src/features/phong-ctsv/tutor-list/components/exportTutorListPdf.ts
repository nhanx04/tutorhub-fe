import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { TutorStat } from 'src/types/ctsv'

export const exportTutorListPdf = (data: TutorStat[]) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })

  doc.setFontSize(18)
  doc.text('Tutor Statistics', 40, 40)

  autoTable(doc, {
    startY: 60,
    head: [['User ID', 'Tutor Name', 'Faculty', 'Groups', 'Consultations']],
    body: data.map((row) => [row.userId, row.userName, row.facultyName, row.groupCount, row.consultationCount]),
    headStyles: {
      fillColor: [40, 80, 160],
      textColor: '#fff',
      fontStyle: 'bold'
    },
    styles: { fontSize: 11, cellPadding: 6 }
  })

  doc.save('tutor-statistics.pdf')
}
