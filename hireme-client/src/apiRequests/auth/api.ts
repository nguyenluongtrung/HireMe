import { apiEndpoints } from '@/contants/routers';

import { LoginCredentials } from '@/interfaces/auth';
import { RegisterFormData } from '@/interfaces/user';

import api from '@/base/api';

export const login = (data: LoginCredentials) => {
  return api.post(apiEndpoints.AUTH.LOGIN, data);
};

export const registerUser = (data: RegisterFormData) => {
  return api.post(apiEndpoints.AUTH.REGISTER, data);
};