import { apiEndpoints } from '@/contants/routers';

import { LoginCredentials } from '@/interfaces/auth';
import { EditInfoFormData, RegisterFormData } from '@/interfaces/user';

import api from '@/base/api';

export const login = (data: LoginCredentials) => {
  return api.post(apiEndpoints.AUTH.LOGIN, data);
};

export const registerUser = (data: RegisterFormData) => {
  return api.post(apiEndpoints.AUTH.REGISTER, data);
};

export const getUserProfile = (signal?: AbortSignal) => {
  return api.get(apiEndpoints.SYSTEM.USER_PROFILE, {
    signal,
  });
};

export const updateUserProfile = (data: Partial<EditInfoFormData>) => {
  return api.patch<Partial<EditInfoFormData>>(
    apiEndpoints.SYSTEM.USER_PROFILE,
    data
  );
};