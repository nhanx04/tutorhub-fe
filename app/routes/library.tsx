import type { MetaFunction } from 'react-router'
import { LibraryPage } from "src/features";

export const meta: MetaFunction = () => {
  return [{ title: 'Library' }, { name: 'Library', content: 'Thư viện' }]
}

export default LibraryPage
