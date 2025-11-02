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
  { stuId: '123123', name: 'Nguyễn Trọng Nhân', email: 'nhan.nguyenxxx04@hcmcut.edu.vn', score: 9, feedback: 'Học tốt', tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123124', name: 'Trần Thị Thuý', email: 'thuy.tran@mail.com', score: 8, feedback: 'Chăm chỉ', tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123125', name: 'Lê Văn Khải', email: 'khai.le@mail.com', score: 10, feedback: 'Xuất sắc, nắm vững kiến thức', tutor: 'Hoàng Giữ Tiên Nhất' },
  { stuId: '123126', name: 'Phan Anh Dũng', email: 'dung.phan@mail.com', score: 7, feedback: 'Cần cải thiện tốc độ', tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123127', name: 'Bùi Thị Lan', email: 'lan.bui@mail.com', score: 9, feedback: 'Phản hồi nhanh', tutor: 'Hoàng Giữ Tiên Nhất' },
  { stuId: '123128', name: 'Đỗ Minh Tuấn', email: 'tuan.do@mail.com', score: 8, feedback: 'Hoàn thành bài tập tốt', tutor: 'Lê Trần Tấn Phát' },
];
