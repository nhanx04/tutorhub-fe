import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { TutorSummary } from "../mockdata/tutor-data";

export const exportTutorListPdf = (data: TutorSummary[]) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  // Title
  doc.setFontSize(18);
  doc.text("Tutor List Report", 40, 40);

  autoTable(doc, {
    startY: 60,
    head: [
      ["Tutor ID", "Tutor Name", "Faculties", "Total Groups", "Total Sessions"]
    ],
    body: data.map((row) => [
      row.tutorId,
      row.tutor,
      row.faculties,
      row.totalGroups.toString(),
      row.totalSessions.toString(),
    ]),
    headStyles: {
      fillColor: [40, 80, 160],
      textColor: "#fff",
      fontStyle: "bold",
    },
    styles: {
      fontSize: 11,
      cellPadding: 6,
    },
  });

  doc.save("tutor-list.pdf");
};
