import type { MetaFunction } from 'react-router'
import { PDTDashboardPage } from 'src/features'

export const meta: MetaFunction = () => {
  return [{ title: 'PĐT - Statistics' }, { name: 'description', content: 'Phòng Đào Tạo - Thống kê' }]
}

export default PDTDashboardPage

