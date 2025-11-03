import type { MetaFunction } from 'react-router'
import GroupFeedbackPage from 'src/features/tutor/group-detail/group-feedback-page'

export const meta: MetaFunction = () => {
  return [{ title: 'Group Feedback' }, { name: '', content: 'Đánh giá sinh viên' }]
}

export default GroupFeedbackPage
