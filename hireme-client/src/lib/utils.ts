import { jwtDecode } from 'jwt-decode';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { JwtDecode } from "@/interfaces/auth";
import { MenuItem } from '@/interfaces/menu';

export const decodeToken = (token: string): JwtDecode => {
  return jwtDecode(token);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const updateMenuItemCurrent = (menuItems: MenuItem[], pathname: string): MenuItem[] => {
  return menuItems.map((item) => {
    const updatedItem = { ...item };

    if (updatedItem.href) {
      const isActive =
        pathname === updatedItem.href ||
        (pathname.startsWith(updatedItem.href + '/') &&
          updatedItem.href !== '/');

      updatedItem.current = isActive;
    }

    if (updatedItem.children) {
      updatedItem.children = updateMenuItemCurrent(updatedItem.children, pathname);
      if (updatedItem.children.some((child) => child.current)) {
        updatedItem.current = true;
      }
    }

    return updatedItem;
  });
};

export const getRandomColor = (name: string) => {
    const colors = [
        "bg-blue-500/10 text-blue-500",
        "bg-purple-500/10 text-purple-500",
        "bg-emerald-500/10 text-emerald-500",
        "bg-orange-500/10 text-orange-500",
        "bg-pink-500/10 text-pink-500",
    ];
    return colors[name.length % colors.length];
};