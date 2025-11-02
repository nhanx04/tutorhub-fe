import type { ConsulSession } from 'src/types'

export const consultationData: ConsulSession[] = [
  {
    id: 1,
    groupName: 'Đồ án chuyên ngành Hệ thống thông tin',
    groupDescription: 'Nhóm hỗ trợ sinh viên trong việc hoàn thiện đồ án chuyên ngành Hệ thống thông tin.',
    sessions: [
      {
        sid: 1,
        generalDetails: {
          topic: 'Tư vấn lộ trình thực hiện nghiên cứu lần 1',
          description: 'Các tài liệu phục vụ cho nghiên cứu:',
          links: ['https://www.vnulib.edu.vn/index.php/tai-lieu-dien-tu']
        },
        timeAndLocation: {
          time: ['7h', '8h', '9h', '10h', '11h', '12h'],
          date: '12/12/2025',
          location: 'H6 - 201',
          meetingLink: ''
        },
        students: '22/30',
        status: 'Allow Register'
      },
      {
        sid: 2,
        generalDetails: {
          topic: 'Tư vấn lộ trình thực hiện nghiên cứu lần 2',
          description: 'Các tài liệu phục vụ cho nghiên cứu:',
          links: ['https://www.vnulib.edu.vn/index.php/tai-lieu-dien-tu']
        },
        timeAndLocation: {
          time: ['12h', '13h', '14h'],
          date: '12/12/2025',
          location: '',
          meetingLink: 'https://meet.google.com/vbe-ozrn-gdu'
        },
        students: '22/30',
        status: 'Completed'
      },
      {
        sid: 3,
        generalDetails: {
          topic: 'Tư vấn lộ trình thực hiện nghiên cứu lần 3',
          description: 'Các tài liệu phục vụ cho nghiên cứu:',
          links: [
            'https://www.vnulib.edu.vn/index.php/tai-lieu-dien-tu',
            'https://www.vnulib.edu.vn/index.php/tai-lieu-dien-tu',
            'https://www.vnulib.edu.vn/index.php/tai-lieu-dien-tu'
          ]
        },
        timeAndLocation: {
          time: ['12h', '13h', '14h'],
          date: '12/10/2025',
          location: '',
          meetingLink: 'https://meet.google.com/vbe-ozrn-gdu'
        },
        students: '10/30',
        status: 'Canceled'
      }
    ]
  }
]
