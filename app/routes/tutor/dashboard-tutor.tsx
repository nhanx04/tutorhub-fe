import type { MetaFunction } from 'react-router'
import { TutorDashboardPage } from 'src/features'

export const meta: MetaFunction = () => {
  return [{ title: 'Dashboard' }, { name: '', content: 'Bảng điều khiển' }]
}

export default TutorDashboardPage
