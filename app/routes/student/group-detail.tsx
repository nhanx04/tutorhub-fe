import type { MetaFunction } from 'react-router'
import { ConsultationSessionsPage } from 'src/features/student/group-detail'

export const meta: MetaFunction = () => {
  return [{ title: 'Group Detail' }, { name: 'description', content: 'Chi tiết nhóm' }]
}

export default ConsultationSessionsPage
