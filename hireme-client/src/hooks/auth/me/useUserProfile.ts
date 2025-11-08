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
import { getPresignedUrl, uploadFileToS3 } from "@/apiRequests/media/api";

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

      let avatarUrl: string | undefined;

      // 1. Upload avatar to S3 if a new file is selected
      if (data.avatar instanceof File) {
        // Get presigned URL from backend
        const { data: presignedData } = await getPresignedUrl({
          filename: data.avatar.name,
          filesize: data.avatar.size,
        });
        const { uploadUrl, fileUrl } = presignedData;

        // Upload directly to S3
        await uploadFileToS3({
          uploadUrl,
          file: data.avatar,
          fileType: data.avatar.type,
        });

        // Store the final URL for backend
        avatarUrl = fileUrl;
      }

      // 2️. Prepare payload for backend update
      const payload = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        ...(avatarUrl && { avatarUrl }),
      };

      // 3. Call backend API to update profile
      await updateUserProfile(payload);
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

  const onSubmit = (data: Partial<EditInfoFormData>) => {
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
