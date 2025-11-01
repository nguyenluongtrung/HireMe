import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { LoadingContext } from "@/providers/LoadingProvider";
import { useToast } from "@/providers/ToastProvider";

import { RegisterFormData } from "@/interfaces/user";

import {
  TOAST_REGISTER_ERROR_MESSAGE,
  TOAST_REGISTER_SUCCESS_MESSAGE,
} from "@/contants/message";

import { registerUser } from "@/apiRequests/auth/api";

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const { showToast } = useToast();

  const form = useForm<RegisterFormData>();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      setIsLoading(true);
      await registerUser(data);
    },
    onSuccess: async () => {
      showToast({
        description: TOAST_REGISTER_SUCCESS_MESSAGE,
        variant: "success",
      });
      onSuccess?.();
      form.reset();
    },
    onError: (error: any) => {
      // Handle error, optionally set form errors
      if (error?.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          if (field in form.getValues()) {
            form.setError(field as keyof RegisterFormData, {
              type: "server",
              message: Array.isArray(message) ? message[0] : message,
            });
          }
        });
      }

      showToast({
        description: error?.message || TOAST_REGISTER_ERROR_MESSAGE,
        variant: "error",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  const handleClearForm = () => {
    form.reset();
  };

  return {
    ...form,
    form,
    isSubmitting: registerMutation.isPending,
    onSubmit,
    handleClearForm,
  };
};
