import type { ConsultationSession } from 'src/types'

export const sampleData: ConsultationSession[] = [
  {
    id: 1,
    conId: '#1',
    generalDetails: {
      title: 'Tư vấn lộ trình thực hiện nghiên cứu lần 1',
      description: 'Các tài liệu phục vụ cho nghiên cứu:',
      links: [
        'https://www.vnulib.edu.vn/index.php/tai-lieu-dien-tu',
        'https://lib.hcmut.edu.vn/uploads/files/HD%20Dang%20ky%20tai%20khoa%20truy%20cap%20CSDL%20truc%20tuyen.pdf',
        'https://www.vnulib.edu.vn/index.php/general/36-dich-vu-thu-vien/150-dang-ky-tk-csdl-truc-tuyen'
      ]
    },
    timeAndLocation: {
      time: '15h - 16h50',
      date: '12/12/2025',
      location: 'H6 - 201'
    },
    students: '22/30',
    status: 'Allow Register'
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
        'https://www.vnulib.edu.vn/index.php/general/36-dich-vu-thu-vien/150-dang-ky-tk-csdl-truc-tuyen'
      ]
    },
    timeAndLocation: {
      time: '15h - 16h50',
      date: '12/12/2025',
      location: '',
      meetingLink: 'Open meeting'
    },
    students: '22/30',
    status: 'Completed'
  }
]
