import type { MetaFunction } from 'react-router'
import { GroupExplorerPage } from 'src/features/student'

export const meta: MetaFunction = () => {
  return [{ title: 'Group Explorer' }, { name: 'description', content: 'Search and register tutoring groups' }]
}

export default GroupExplorerPage
