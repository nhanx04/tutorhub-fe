import type { MetaFunction } from 'react-router'
import LoginPage from '../../src/features/login'

export const meta: MetaFunction = () => {
  return [{ title: 'Đăng nhập' }, { name: 'description', content: 'Đăng nhập vào TurtorHub' }]
}

export default LoginPage
