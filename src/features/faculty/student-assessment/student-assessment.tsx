import { MainLayout } from 'src/layouts'
import React, { useState, useMemo, useCallback } from 'react';
import ReusableTable, {type Column} from 'src/components/Table';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
interface TutorItem {
  stuId: string;
  name: string;
  email: string;
  score: number;
  feedback: string;
  tutor: string;
}

// --- Dữ Liệu Mẫu (Sample Data) ---
const tutorData = [
  { stuId: '123123', name: 'Nguyễn Trọng Nhân', email: 'nhan.nguyenxxx04@hcmcut.edu.vn', score: 9, feedback: 'Học tốt', tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123124', name: 'Trần Thị Thuý', email: 'thuy.tran@mail.com', score: 8, feedback: 'Chăm chỉ', tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123125', name: 'Lê Văn Khải', email: 'khai.le@mail.com', score: 10, feedback: 'Xuất sắc, nắm vững kiến thức', tutor: 'Hoàng Giữ Tiên Nhất' },
  { stuId: '123126', name: 'Phan Anh Dũng', email: 'dung.phan@mail.com', score: 7, feedback: 'Cần cải thiện tốc độ', tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123127', name: 'Bùi Thị Lan', email: 'lan.bui@mail.com', score: 9, feedback: 'Phản hồi nhanh', tutor: 'Hoàng Giữ Tiên Nhất' },
  { stuId: '123128', name: 'Đỗ Minh Tuấn', email: 'tuan.do@mail.com', score: 8, feedback: 'Hoàn thành bài tập tốt', tutor: 'Lê Trần Tấn Phát' },
];
// Icon: Search
const Search = (props : IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// Icon: User
const User = (props : IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

// Icon: Mail
const Mail = (props : IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

// Icon: Star
const Star = (props : IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill={props.className?.includes('fill-current') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

// Icon: MessageSquare
const MessageSquare = (props : IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export const StudentAssessmentPage = () => {

  const [keyword, setKeyword] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('');
  const [filteredData, setFilteredData] = useState<TutorItem[]>(tutorData);

  const uniqueTutors = useMemo(() => {
    return [...new Set(tutorData.map((item) => item.tutor))].sort();
  }, []);

  const applyFilter = useCallback(() => {
    const lowerCaseKeyword = keyword.toLowerCase().trim();

    const result = tutorData.filter((item) => {
      const keywordMatch =
        item.name.toLowerCase().includes(lowerCaseKeyword) ||
        item.email.toLowerCase().includes(lowerCaseKeyword) ||
        item.feedback.toLowerCase().includes(lowerCaseKeyword);

      const tutorMatch = selectedTutor === '' || item.tutor === selectedTutor;

      return keywordMatch && tutorMatch;
    });

    setFilteredData(result);
  }, [keyword, selectedTutor]);

  const handleSearch = () => {
    applyFilter();
  };

  const columns: Column<TutorItem>[] = useMemo(() => [
    { header: 'Stu. ID', accessor: 'stuId', width: '10%' },
    {
      header: 'Name',
      accessor: 'name',
      width: '20%',
      render: (row : TutorItem) => (
        <div className="flex items-center gap-2">
           <User size={16} className="text-indigo-500" />
           {row.name}
        </div>
      ),
    },
    {
      header: 'Email',
      accessor: 'email',
      width: '25%',
      render: (row : TutorItem) => (
         <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-500" />
            {row.email}
         </div>
      ),
    },
    {
      header: 'Score',
      accessor: 'score',
      width: '10%',
      render: (row : TutorItem) => (
        <div className={`font-semibold text-center ${row.score >= 9 ? 'text-green-600' : 'text-yellow-600'}`}>
           <Star size={14} className="inline mr-1 fill-current" />
           {row.score}
        </div>
      ),
    },
    {
      header: 'Feedback',
      accessor: 'feedback',
      width: '25%',
      render: (row : TutorItem) => (
         <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-blue-500" />
            <span className='italic'>{row.feedback}</span>
         </div>
      ),
    },
    {
      header: 'Tutor',
      accessor: 'tutor',
      width: '10%',
      render: (row : TutorItem) => (
        <span className="font-medium text-indigo-600">{row.tutor}</span>
      ),
    },
  ], []);
  return (
  <MainLayout>
          <div className='p-8 bg-white shadow-2xl rounded-xl'>
        {/* --- KHỐI LỌC VÀ TÌM KIẾM --- */}
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4 mb-8 items-end p-4 rounded-lg border border-indigo-200'>
          {/* Ô nhập keyword */}
          <div className='col-span-3'>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">Search Keyword (Name, Email, Feedback)</label>
            <input
              type='text'
              id='keyword'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder='Enter keywords to search...'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150'
            />
          </div>

          {/* Dropdown chọn Tutor */}
          <div className='md:col-span-2'>
            <label htmlFor="tutor" className="block text-sm font-medium text-gray-700 mb-1">Tutor</label>
            <select
              id='tutor'
              value={selectedTutor}
              onChange={(e) => setSelectedTutor(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white transition duration-150'
            >
              <option value=''>--- All Tutors ---</option>
              {uniqueTutors.map((tutor, index) => (
                <option key={index} value={tutor}>
                  {tutor}
                </option>
              ))}
            </select>
          </div>

          {/* Nút Search */}
          <div className='flex md:col-span-1'>
            <button
              onClick={handleSearch}
              className='cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-medium shadow-md transition duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* --- TIÊU ĐỀ BẢNG VÀ NÚT EXPORT --- */}
        <div className='flex justify-between items-center mb-5 p-4 bg-blue-100 rounded-lg border border-blue-100'>
            <h3 className='text-xl font-bold text-blue-800 flex items-center gap-2'>
                <img 
                    src="../src/asset/images/std_reviewicon.png" 
                    className='w-6 h-6 object-contain' // Dùng w-6 h-6 để icon có kích thước vừa phải
                />
                Student Review ({filteredData.length} items)
            </h3>
            <button
                onClick={() => console.log("Exporting data...")}
                className='flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium shadow-md transition hover:bg-green-700'
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Export</span>
            </button>
        </div>


        {/* --- BẢNG DỮ LIỆU --- */}
        <ReusableTable columns={columns} data={filteredData} />
      </div>
  </MainLayout>
  );
}
 