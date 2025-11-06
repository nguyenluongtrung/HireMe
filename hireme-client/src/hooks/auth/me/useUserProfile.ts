"use client";

import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { getUserProfile, updateUserProfile } from "@/apiRequests/auth/api";

import {
  ERROR_COMMON_MESSAGE,
  TOAST_PROFILE_UPDATE_ERROR_MESSAGE,
  TOAST_PROFILE_UPDATE_SUCCESS_MESSAGE,
} from "@/contants/message";

import { EditInfoFormData, User } from "@/interfaces/user";

import { useSessionCache } from "@/providers/SessionCacheProvider";
import { useToast } from "@/providers/ToastProvider";
import { LoadingContext } from "@/providers/LoadingProvider";

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
  const { setIsLoading } = useContext(LoadingContext);
  const token = session?.accessToken;

  const form = useForm<EditInfoFormData>();

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
    queryKey: ["user-profile"],
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
        variant: "error",
        description: ERROR_COMMON_MESSAGE,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<EditInfoFormData>) => {
      setIsLoading(true);
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        // Skip undefined or null values
        if (value === undefined || value === null) return;

        // If avatar is a File object, append it directly
        if (key === "avatar" && value instanceof File) {
          formData.append("avatar", value);
        } else {
          formData.append(key, value as string);
        }
      });

      await updateUserProfile(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      showToast({
        variant: "success",
        description: TOAST_PROFILE_UPDATE_SUCCESS_MESSAGE,
      });
      form.reset();
      onUpdateSuccess?.();
    },
    onError: (error: any) => {
      // Handle error, optionally set form errors
      if (error?.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          if (field in form.getValues()) {
            form.setError(field as keyof EditInfoFormData, {
              type: "server",
              message: Array.isArray(message) ? message[0] : message,
            });
          }
        });
      }

      showToast({
        description: error?.message || TOAST_PROFILE_UPDATE_ERROR_MESSAGE,
        variant: "error",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: EditInfoFormData) => {
    updateProfileMutation.mutate(data);
  };

  return {
    profile: data as User,
    form,
    ...form,
    isLoading,
    isError,
    error,
    isUpdating: updateProfileMutation.isPending,
    refetch,
    updateProfile: updateProfileMutation.mutate,
    onSubmit,
  };
};

export default useUserProfile;
