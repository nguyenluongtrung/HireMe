export interface User {
  id?: string;
  name: string;
  phoneNumber: string;
  email: string;
  avatarUrl?: string;
}

export interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface EditInfoFormData {
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: File | null;
}
