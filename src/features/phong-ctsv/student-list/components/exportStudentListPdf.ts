import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { StudentRow } from "../mockdata/student-list-data"; // đổi đúng đường dẫn

export const exportStudentListPdf = (data: StudentRow[]) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  // Title
  doc.setFontSize(18);
  doc.text("Student List Report", 40, 40);

  // Build rows
  autoTable(doc, {
    startY: 60,
    head: [["Stu ID", "Name", "Faculty", "Topic", "Tutor"]],
    body: data.map((row) => [
      row.stuId,
      row.name,
      row.faculty,
      row.topic,
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
    },
  });

  doc.save("student-list.pdf");
};
