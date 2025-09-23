# TutorHub Frontend - Source Code Structure Guide

## 📁 Cấu trúc thư mục `src/`

```
src/
├── app/           # App root files và cấu hình chính
├── asset/         # Static assets (images, icons, fonts)
├── components/    # Reusable UI components
├── context/       # React Context providers
├── features/      # Feature-specific pages và logic
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── styles/        # CSS và styling files
├── types/         # TypeScript type definitions
└── index.ts       # Main export file
```

## 🚀 Quy trình phát triển tính năng mới

### 1. **Phân tích và lên kế hoạch**
- Xác định tính năng thuộc loại gì (page, component, utility)
- Liệt kê các components cần thiết
- Xác định data types và API endpoints

### 2. **Tạo types (nếu cần)**
```typescript
// src/types/user.ts
export interface User {
  id: string
  name: string
  email: string
}

export type UserRole = 'student' | 'tutor' | 'admin'
```

### 3. **Tạo custom hooks (nếu cần)**
```typescript
// src/hooks/useUser.ts
import { useState, useEffect } from 'react'
import type { User } from '../types/user'

export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Logic here...
  
  return { user, loading }
}
```

### 4. **Tạo reusable components**
```typescript
// src/components/UserCard.tsx
import type { User } from '../types/user'

interface UserCardProps {
  user: User
  onClick?: () => void
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div className="user-card" onClick={onClick}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}
```

### 5. **Tạo feature page**
```typescript
// src/features/UserProfile.tsx
import type { Route } from '../../.react-router/types/app/routes/+types/user-profile'
import { useUser } from '../hooks/useUser'
import { UserCard } from '../components/UserCard'

export function meta({ params }: Route.MetaArgs) {
  return [{ title: 'User Profile' }]
}

export default function UserProfile() {
  const { user, loading } = useUser('123')
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>User Profile</h1>
      {user && <UserCard user={user} />}
    </div>
  )
}
```

### 6. **Cập nhật exports**
```typescript
// src/components/index.ts
export { UserCard } from './UserCard'

// src/hooks/index.ts
export { useUser } from './useUser'

// src/types/index.ts
export type { User, UserRole } from './user'
```

## 📋 Quy tắc và Best Practices

### **Components (`src/components/`)**
- ✅ Tạo components tái sử dụng được
- ✅ Mỗi component một file riêng
- ✅ Export qua `index.ts`
- ✅ Sử dụng TypeScript interfaces cho props
- ❌ Không chứa business logic phức tạp
- ❌ Không gọi API trực tiếp

### **Features (`src/features/`)**
- ✅ Chứa page components và logic cụ thể
- ✅ Có thể import từ components, hooks, types
- ✅ Xử lý routing và navigation
- ✅ Quản lý state của feature
- ❌ Không tái sử dụng giữa các features khác

### **Hooks (`src/hooks/`)**
- ✅ Logic tái sử dụng được
- ✅ API calls và data fetching
- ✅ State management logic
- ✅ Side effects handling
- ❌ Không chứa UI components

### **Types (`src/types/`)**
- ✅ Định nghĩa interfaces và types
- ✅ Chia theo domain (user, course, etc.)
- ✅ Export qua `index.ts`
- ❌ Không chứa implementation

### **Context (`src/context/`)**
- ✅ Global state management
- ✅ Authentication context
- ✅ Theme/UI context
- ❌ Không lạm dụng cho local state

### **Assets (`src/asset/`)**
- ✅ Images, icons, fonts
- ✅ Tổ chức theo loại file
- ✅ Sử dụng tên file mô tả rõ ràng

### **Styles (`src/styles/`)**
- ✅ Global CSS
- ✅ Theme variables
- ✅ Utility classes
- ❌ Component-specific styles (nên để trong component)

## 🔧 Import Guidelines

### **Absolute imports (khuyến nghị)**
```typescript
import { UserCard } from '../components'
import { useUser } from '../hooks'
import type { User } from '../types'
```

### **Relative imports (khi cần thiết)**
```typescript
import { helper } from './utils'
import config from './config.json'
```

## 🔄 Workflow Example: Tạo tính năng "Course Management"

1. **Tạo types**
   ```bash
   src/types/course.ts
   ```

2. **Tạo hooks**
   ```bash
   src/hooks/useCourse.ts
   src/hooks/useCourseList.ts
   ```

3. **Tạo components**
   ```bash
   src/components/CourseCard.tsx
   src/components/CourseForm.tsx
   ```

4. **Tạo feature pages**
   ```bash
   src/features/CourseList.tsx
   src/features/CourseDetail.tsx
   src/features/CourseEdit.tsx
   ```

5. **Cập nhật exports**
   ```bash
   src/types/index.ts
   src/hooks/index.ts
   src/components/index.ts
   ```

6. **Tạo routes trong app/**
   ```bash
   app/routes/courses.tsx
   app/routes/courses.$id.tsx
   ```

## 🚨 Common Mistakes

- ❌ Import trực tiếp từ file thay vì qua index
- ❌ Đặt business logic trong components
- ❌ Tạo components quá specific, không tái sử dụng được
- ❌ Không định nghĩa types cho props và data
- ❌ Lạm dụng context cho local state

## 📚 Resources

- [React Router v7 Docs](https://reactrouter.com/docs)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [React Hooks Guide](https://react.dev/reference/react)

---

**Lưu ý:** Luôn chạy `npm run build` để kiểm tra lỗi trước khi commit code!
