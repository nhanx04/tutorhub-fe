import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/login', 'routes/login.tsx'),
  route('/library', 'routes/library.tsx'),
  route('/library/:id', 'routes/library.$id.tsx'),
  route('/dashboard', 'routes/dashboard.tsx'),
  route('/student/group-detail', 'routes/student/group-detail.tsx'),
  route('/student/group-explorer', 'routes/student/group-explorer.tsx'),
  route('/student/profile', 'routes/student/profile-student.tsx'),
  route('/faculty/student-assessment', 'routes/faculty/student-assessment.tsx'),
  route('/phong-ctsv/student-list', 'routes/phong-ctsv/student-list.tsx'),
  route('/phong-ctsv/tutor-list', 'routes/phong-ctsv/tutor-list.tsx'),
  route('/phong-dao-tao/dashboard', 'routes/phong-dao-tao/dashboard.tsx'),
  route('/tutor/dashboard-tutor', 'routes/tutor/dashboard-tutor.tsx'),
  route('/tutor/create-group', 'routes/tutor/create-group.tsx'),
  route('/tutor/edit-group/:id', 'routes/tutor/edit-group.tsx'),
  route('/tutor/group-detail/:id', 'routes/tutor/group-detail.tsx'),
  route('/tutor/profile-tutor', 'routes/tutor/profile-tutor.tsx')
] satisfies RouteConfig
