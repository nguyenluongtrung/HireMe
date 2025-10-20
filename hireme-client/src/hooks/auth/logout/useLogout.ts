import { signOut } from 'next-auth/react';

export const useLogout = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return { handleSignOut };
};
