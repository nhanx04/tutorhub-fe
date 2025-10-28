import React from 'react';
import ReusableTable from '../../components/common/Table'; // Import the table component

// Định nghĩa kiểu dữ liệu cho một buổi tư vấn
interface ConsultationSession {
  id: number;
  conId: string;
  generalDetails: {
    title: string;
    description: string;
    links: string[];
  };
  timeAndLocation: {
    time: string;
    date: string;
    location: string;
    meetingLink?: string;
  };
  students: string;
  status: 'Allow Register' | 'Completed';
}

// Dữ liệu mẫu
const sampleData: ConsultationSession[] = [
  {
    id: 1,
    conId: '#1',
    generalDetails: {
      title: 'Tư vấn lộ trình thực hiện nghiên cứu lần 1',
      description: 'Các tài liệu phục vụ cho nghiên cứu:',
      links: [
        'https://www.vnulib.edu.vn/index.php/tai-lieu-dien-tu',
        'https://lib.hcmut.edu.vn/uploads/files/HD%20Dang%20ky%20tai%20khoa%20truy%20cap%20CSDL%20truc%20tuyen.pdf',
        'https://www.vnulib.edu.vn/index.php/general/36-dich-vu-thu-vien/150-dang-ky-tk-csdl-truc-tuyen',
      ],
    },
    timeAndLocation: {
      time: '15h - 16h50',
      date: '12/12/2025',
      location: 'H6 - 201',
    },
    students: '22/30',
    status: 'Allow Register',
  },
  {
    id: 2,
    conId: '#2',
    generalDetails: {
      title: 'Tư vấn lộ trình thực hiện nghiên cứu lần 2',
      description: 'Các tài liệu phục vụ cho nghiên cứu:',
      links: [
        'https://www.vnulib.edu.vn/index.php/tai-lieu-dien-tu',
        'https://lib.hcmut.edu.vn/uploads/files/HD%20Dang%20ky%20tai%20khoa%20truy%20cap%20CSDL%20truc%20tuyen.pdf',
        'https://www.vnulib.edu.vn/index.php/general/36-dich-vu-thu-vien/150-dang-ky-tk-csdl-truc-tuyen',
      ],
    },
    timeAndLocation: {
      time: '15h - 16h50',
      date: '12/12/2025',
      location: '',
      meetingLink: 'Open meeting',
    },
    students: '22/30',
    status: 'Completed',
  },
];

const ConsultationSessionsPage = () => {
  // Định nghĩa các cột cho bảng
  const columns = [
    {
      header: 'Con. ID',
      accessor: 'conId' as keyof ConsultationSession,
      width: '5%',
    },
    {
      header: 'General Details',
      accessor: 'generalDetails' as keyof ConsultationSession,
      width: '40%',
      render: (row: ConsultationSession) => (
        <div>
          <p className="font-semibold">{row.generalDetails.title}</p>
          <p className="text-sm text-gray-600 mt-1">{row.generalDetails.description}</p>
          <ul className="list-disc list-inside mt-1">
            {row.generalDetails.links.map((link, index) => (
              <li key={index} className="text-sm">
                Tài liệu {index + 1}: <a href={link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
        header: 'Time & Location',
        accessor: 'timeAndLocation' as keyof ConsultationSession,
        width: '15%',
        render: (row: ConsultationSession) => (
            <div>
                <p>{row.timeAndLocation.time}</p>
                <p>{row.timeAndLocation.date}</p>
                {row.timeAndLocation.location && <p>{row.timeAndLocation.location}</p>}
                {row.timeAndLocation.meetingLink && <button className="text-blue-500">{row.timeAndLocation.meetingLink}</button>}
            </div>
        )
    },
    {
      header: 'Students',
      accessor: 'students' as keyof ConsultationSession,
      width: '10%',
    },
    {
      header: 'Status',
      accessor: 'status' as keyof ConsultationSession,
      width: '15%',
      render: (row: ConsultationSession) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            row.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id' as keyof ConsultationSession, // Dùng id để xác định hành động
      width: '15%',
      render: (row: ConsultationSession) => (
        <div className="flex flex-col space-y-2">
          {row.status === 'Allow Register' ? (
            <>
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Register</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cancel</button>
            </>
          ) : (
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Feedback</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Consultation Sessions</h1>
      <ReusableTable columns={columns} data={sampleData} />
    </div>
  );
};

export default ConsultationSessionsPage;

