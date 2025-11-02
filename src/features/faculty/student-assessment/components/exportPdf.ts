import type { TutorItem } from "../mockdata/mock-data";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const exportStudentPdf = (data: TutorItem[]) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  doc.setFontSize(18);
  doc.text("Student Assessment Report", 40, 40);

  autoTable(doc, {
    startY: 60,
    head: [["Stu. ID", "Name", "Email", "Score", "Feedback", "Tutor"]],
    body: data.map((row) => [
      row.stuId,
      row.name,
      row.email,
      row.score.toString(),
      row.feedback,
      row.tutor,
    ]),
    headStyles: {
      fillColor: [49, 79, 170],
      textColor: "#ffffff",
      fontStyle: "bold",
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
    }
  });

  doc.save("student-assessment.pdf");
};
