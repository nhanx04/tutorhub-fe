import React, { useEffect, useState } from 'react';
import { consultationService } from 'src/services/consultationService';
import type { StudentReview } from 'src/types/tutor/reviews';

interface StudentListModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultationId: number;
}

export const StudentListModal: React.FC<StudentListModalProps> = ({ isOpen, onClose, consultationId }) => {
  const [students, setStudents] = useState<StudentReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchStudents = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await consultationService.getReviewableStudents(consultationId);
          setStudents(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch student list.');
        } finally {
          setLoading(false);
        }
      };
      fetchStudents();
    }
  }, [isOpen, consultationId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Registered Students</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full text-black">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map(s => (
                    <tr key={s.studentId} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{s.studentId}</td>
                      <td className="py-2 px-4">{s.studentName}</td>
                      <td className="py-2 px-4">{s.studentEmail}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500">No students have registered for this session yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Close</button>
        </div>
      </div>
    </div>
  );
};

