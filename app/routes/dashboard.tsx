import type { MetaFunction } from 'react-router'
import DashboardPage from 'src/features/student/dashboard/dashboard'

export const meta: MetaFunction = () => {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Bảng điều khiển' }]
}

export default DashboardPage
