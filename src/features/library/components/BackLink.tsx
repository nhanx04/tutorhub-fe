import { Link } from 'react-router'
export default function BackLink() {
  return (
    <Link to='/library' className='inline-flex items-center gap-2 text-sm text-blue-600'>
      ← Quay lại thư viện
    </Link>
  )
}
