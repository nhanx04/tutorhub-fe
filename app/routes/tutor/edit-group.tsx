import type { MetaFunction } from 'react-router'
import { editGroup } from 'src/features'

export const meta: MetaFunction = () => {
  return [{ title: 'Edit group' }, { name: '', content: 'Edit group form' }]
}

export default editGroup
