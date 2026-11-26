import { useRouter } from 'next/navigation';
import { useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@elysiac/sdk-react';

import {
  registerSchema,
  type RegisterFormValues,
} from '../schemas/register.schema';
import { useEmailVerification } from '../store/email-verification.store';
import { useServerError } from './use-server-error';

export function useRegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const setVerification = useEmailVerification((s) => s.setVerification);
  const { serverError, clearServerError, failWith } = useServerError();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', terms: false },
  });

  const field = (name: FieldPath<RegisterFormValues>) =>
    form.register(name, { onChange: clearServerError });

  const onSubmit = form.handleSubmit(async (data) => {
    clearServerError();

    try {
      const result = await registerMutation.mutateAsync({
        login: data.username,
        email: data.email,
        password: data.password,
      });

      setVerification(result.email_verefication_token, data.email);
      router.replace('/verify-email');
    } catch (error) {
      form.resetField('password');
      failWith(error, { unauthorized: 'Такой аккаунт уже существует' });
    }
  });

  return {
    field,
    onSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    serverError,
  };
}
