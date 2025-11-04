import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  score: number;
  feedback: string;
  attendance: boolean;
}

interface StudentFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onSave: (feedbackData: Student[]) => void;
}

export const StudentFeedbackModal: React.FC<StudentFeedbackModalProps> = ({ isOpen, onClose, students: initialStudents, onSave }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  if (!isOpen) return null;

  const handleScoreChange = (studentId: string, value: number) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, score: value } : student
      )
    );
  };

  const handleFeedbackChange = (studentId: string, value: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, feedback: value } : student
      )
    );
  };

  const handleAttendanceChange = (studentId: string, value: boolean) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, attendance: value } : student
      )
    );
  };

  const handleSave = () => {
    onSave(students);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-lg p-6 w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6">Student Review</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left font-medium">Stu. ID</th>
                <th className="py-2 px-4 text-left font-medium">Name</th>
                <th className="py-2 px-4 text-left font-medium">Email</th>
                <th className="py-2 px-4 text-left font-medium">Score</th>
                <th className="py-2 px-4 text-left font-medium">Feedback</th>
                <th className="py-2 px-4 text-center font-medium">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-black">{student.id}</td>
                  <td className="py-2 px-4 text-black">{student.name}</td>
                  <td className="py-2 px-4 text-black">{student.email}</td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={student.score}
                      onChange={(e) => handleScoreChange(student.id, parseInt(e.target.value) || 0)}
                      className="w-16 border rounded px-2 py-1 text-black"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={student.feedback}
                      onChange={(e) => handleFeedbackChange(student.id, e.target.value)}
                      className="w-full border rounded px-2 py-1 text-black"
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={student.attendance}
                      onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                      className="w-5 h-5"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};