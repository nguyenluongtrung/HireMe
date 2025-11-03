'use client';

import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getUserProfile, updateUserProfile } from '@/apiRequests/auth/api';

import { ERROR_COMMON_MESSAGE, TOAST_UPDATE_SUCCESS_MESSAGE } from '@/contants/message';

import { User } from '@/interfaces/user';

import { useSessionCache } from '@/providers/SessionCacheProvider';
import { useToast } from '@/providers/ToastProvider';
import { LoadingContext } from '@/providers/LoadingProvider';

interface UseUserProfileProps {
  onSuccess?: (profile: User) => void;
  onUpdateSuccess?: () => void;
  enabled?: boolean;
}

const useUserProfile = ({
  onSuccess,
  onUpdateSuccess,
  enabled = true,
}: UseUserProfileProps = {}) => {
  const { data: session } = useSessionCache();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const {setIsLoading} = useContext(LoadingContext)
  const token = session?.accessToken;

  // Handle call API get user profile
  const fetchUserProfile = async (signal?: AbortSignal) => {
    const { data } = await getUserProfile(signal);
    return {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      avatarUrl: data.avatar,
      id: data.id,
    };
  };

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['user-profile'],
    queryFn: ({ signal }) => fetchUserProfile(signal),
    enabled: enabled && !!token,
    retry: 1,
    staleTime: 1 * 60 * 1000, // 1 minute
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      showToast({
        variant: 'error',
        description: ERROR_COMMON_MESSAGE,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<User>) => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      showToast({
        variant: 'success',
        description: TOAST_UPDATE_SUCCESS_MESSAGE,
      });
      onUpdateSuccess?.();
    },
    onError: () => {
      showToast({
        variant: 'error',
        description: ERROR_COMMON_MESSAGE,
      });
    },
  });

  return {
    profile: data as User,
    refetch,
    isLoading,
    isError,
    error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
};

export default useUserProfile;
