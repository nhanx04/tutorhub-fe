import type { MetaFunction } from 'react-router'
import { createGroupForm } from 'src/features'

export const meta: MetaFunction = () => {
  return [{ title: 'Tạo nhóm mới' }, { name: '', content: 'Trang tạo nhóm mới' }]
}

export default createGroupForm
