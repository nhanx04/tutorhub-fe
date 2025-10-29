import type { MetaFunction } from 'react-router'
import { TutorListPage } from 'src/features'

export const meta: MetaFunction = () => {
  return [{ title: 'Tutor List' }, { name: '', content: 'Danh sách giảng viên' }]
}

export default TutorListPage
