export interface Credentials {
  email: string

  password: string
}

export interface User {
  user_id: string

  name: string

  email: string

  role: string

  // Optional: faculty ID for users belonging to a faculty (e.g., faculty role)
  facultyId?: number
}
