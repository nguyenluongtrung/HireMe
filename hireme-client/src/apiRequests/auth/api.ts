import { apiEndpoints } from '@/contants/routers';

import { LoginCredentials } from '@/interfaces/auth';

import api from '@/base/api';

export const login = (data: LoginCredentials) => {
  return api.post(apiEndpoints.AUTH.LOGIN, data);
};