import { useContext } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { LoginCredentials } from '@/interfaces/auth';

import { TOAST_LOGIN_ERROR_MESSAGE } from '@/contants/message';

import { LoadingContext } from '@/providers/LoadingProvider';

export const useLogin = ({ onSuccess }: { onSuccess: () => void }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange', // Enable real-time validation
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginCredentials) => {
      setIsLoading(true);
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (!result?.ok) {
        form.setError('root', {
          type: 'manual',
          message: result?.error || TOAST_LOGIN_ERROR_MESSAGE,
        });
        setIsLoading(false);

        throw new Error(result?.error || '');
      }

      return result;
    },
    onSuccess: async () => {
      onSuccess();
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    loginMutation.mutate(data);
  };

  return {
    form,
    control: form.control,
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    isSubmitting: loginMutation.isPending,
    onSubmit,
  };
};
