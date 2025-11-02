export interface TutorItem {
  stuId: string;
  name: string;
  email: string;
  score: number;
  feedback: string;
  tutor: string;
}

// --- Dữ Liệu Mẫu (Sample Data) ---
export const tutorData: TutorItem[] = [
  { stuId: '123123', name: 'Nguyen Trong Nhan', email: 'nhan.nguyenxxx04@hcmcut.edu.vn', score: 9, feedback: 'HHoc tot', tutor: 'Le Tran Tan Phat' },
  { stuId: '123124', name: 'Tran Thi Thuy', email: 'thuy.tran@mail.com', score: 8, feedback: 'Cham chi', tutor: 'Le Tran Tan Phat' },
  { stuId: '123125', name: 'Le Van Khai', email: 'khai.le@mail.com', score: 10, feedback: 'Xuat sac, nam vung kien thuc', tutor: 'Hoang Giu Tien Nhat' },
  { stuId: '123126', name: 'Phan Anh Dung', email: 'dung.phan@mail.com', score: 7, feedback: 'Can cai thien toc do', tutor: 'Le Tran Tan Phat' },
  { stuId: '123127', name: 'Bui Thi Lan', email: 'lan.bui@mail.com', score: 9, feedback: 'Phan hoi nhanh', tutor: 'Hoang Giu Tien Nhat' },
  { stuId: '123128', name: 'Do Minh Tuan', email: 'tuan.do@mail.com', score: 8, feedback: 'Hoan thanh bai tap tot', tutor: 'Le Tran Tan Phat' },
];
