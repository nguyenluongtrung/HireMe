export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JwtDecode {
  exp: number;
  email: string;
  id: number;
}