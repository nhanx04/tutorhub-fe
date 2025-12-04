import type { MetaFunction } from 'react-router'
import { CreateGroupPage } from 'src/features/tutor/dashboard'

export const meta: MetaFunction = () => {
  return [{ title: 'Create New Group' }, { name: 'description', content: 'Create a new research group.' }]
}

export default CreateGroupPage
