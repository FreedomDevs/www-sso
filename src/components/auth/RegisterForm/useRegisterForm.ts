'use client';

import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  ErrorResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/src/api/data';
import { useRegister } from '@/src/api/hooks';
import { toast } from 'sonner';

export function useRegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<RegisterRequest>({
    defaultValues: {
      email: '',
      login: '',
      password: '',
    },
  });

  const registerF = useRegister({
    onSuccess(data: RegisterResponse): void {
      const params = new URLSearchParams(searchParams.toString());
      params.set('emailToken', data.email_verification_token);
      router.replace(`/auth/confirm_email?emailToken=${data.email_verification_token}`);
    },
    onError(error: ErrorResponse): void {
      toast.error(error.error.message);
      form.setError('root', {
        type: 'server',
        message: error.error.message,
      });
    },
  });

  return {
    ...form,
    registerF,
    onSubmit: form.handleSubmit((data) => registerF.mutate(data)),
  };
}
