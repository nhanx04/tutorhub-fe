export interface TutorProfile {
  id?: string;
  email: string;
  fullName: string;
  faculty: string;
  studentNo?: string;
  class?: string;
  hometown?: string;
  country?: string;
  address?: string;
  phoneNumber?: string;
  personalEmail?: string;
}

export interface UpdateTutorProfileRequest {
  fullName?: string;
  address?: string;
  phoneNumber?: string;
  personalEmail?: string;
  hometown?: string;
  country?: string;
}