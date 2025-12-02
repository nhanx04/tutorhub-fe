import type { MetaFunction } from 'react-router'
import { EditGroupPage } from 'src/features/tutor/dashboard'

export const meta: MetaFunction = () => {
  return [{ title: 'Edit group' }, { name: '', content: 'Edit group form' }]
}

export default EditGroupPage
