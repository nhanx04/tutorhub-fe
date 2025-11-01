import type { MetaFunction } from 'react-router'
import { createGroupForm } from 'src/features'

export const meta: MetaFunction = () => {
  return [{ title: 'Create new group' }, { name: '', content: 'Create new group form' }]
}

export default createGroupForm
