import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/login', 'routes/login.tsx'),
  route('/dashboard', 'routes/dashboard.tsx'),
  route('/library', 'routes/library.tsx'),
  route('/student/group-detail', 'routes/student/group-detail.tsx'),
  route('/student/profile', 'routes/student/profile-student.tsx')
] satisfies RouteConfig
