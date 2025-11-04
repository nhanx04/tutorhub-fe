import type { MetaFunction } from 'react-router';
import { BookDetailPage } from 'src/features';

export const meta: MetaFunction = () => ([
  { title: 'Library – Chi tiết tài liệu' },
  { name: 'description', content: 'Trang chi tiết tài liệu trong thư viện' },
]);

export default BookDetailPage;
