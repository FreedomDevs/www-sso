'use client';

import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { LoginRequest } from '@/src/api/data';
import { useLogin } from '@/src/api/hooks';
import { SessionManager } from '@/src/lib/sessionManager';
import { toast } from 'sonner';

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.toString();

  const form = useForm<LoginRequest>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const login = useLogin({
    onSuccess(data, variables) {
      SessionManager.setCurrent({
        username: variables.login,
        masterToken: data.refresh_token,
      });

      if (searchParams.has('client_id')) {
        router.replace(`/auth/confirm?${query}`);
        return;
      }

      router.replace('/');
    },
    onError(error) {
      toast.error(error.error.message);
      form.setError('root', {
        type: 'server',
        message: error.error.message
      })
    }
  });

  return {
    ...form,
    login,
    onSubmit: form.handleSubmit((data) => login.mutate(data)),
  };
}
