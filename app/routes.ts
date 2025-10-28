import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/login', 'routes/login.tsx'),
  route('/dashboard', 'routes/dashboard.tsx'),
  route('/student/group-detail', 'routes/student/group-detail.tsx')
] satisfies RouteConfig
