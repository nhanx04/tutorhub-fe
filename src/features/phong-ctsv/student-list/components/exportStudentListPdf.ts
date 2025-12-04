import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { StudentStat } from 'src/types/ctsv'

export const exportStudentListPdf = (data: StudentStat[]) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })

  doc.setFontSize(18)
  doc.text('Student Statistics', 40, 40)

  autoTable(doc, {
    startY: 60,
    head: [['User ID', 'Name', 'Faculty', 'Groups', 'Consultations']],
    body: data.map((row) => [row.userId, row.userName, row.facultyName, row.groupCount, row.consultationCount]),
    headStyles: {
      fillColor: [49, 79, 170],
      textColor: '#ffffff',
      fontStyle: 'bold'
    },
    styles: { fontSize: 10, cellPadding: 5 }
  })

  doc.save('student-statistics.pdf')
}
