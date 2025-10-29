import type { MetaFunction } from 'react-router'
import { StudentListPage } from 'src/features'

export const meta: MetaFunction = () => {
  return [{ title: 'Student List' }, { name: '', content: 'Danh sách sinh viên' }]
}

export default StudentListPage
