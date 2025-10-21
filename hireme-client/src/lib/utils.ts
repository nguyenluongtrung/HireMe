import { jwtDecode } from 'jwt-decode';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { JwtDecode } from "@/interfaces/auth";

export const decodeToken = (token: string): JwtDecode => {
  return jwtDecode(token);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}