import type { MetaFunction } from 'react-router'
import { ProfileStudentPage as ProfilePage } from 'src/features/student'

export const meta: MetaFunction = () => {
  return [{ title: 'Student Profile' }, { name: 'Profile', content: 'Trang cá nhân' }]
}

export default ProfilePage
