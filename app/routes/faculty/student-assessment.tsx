import type { MetaFunction } from 'react-router'
import { StudentAssessmentPage } from 'src/features'

export const meta: MetaFunction = () => {
  return [{ title: 'Student Assessment' }, { name: '', content: 'Đánh giá sinh viên' }]
}

export default StudentAssessmentPage
