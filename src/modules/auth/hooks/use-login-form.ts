import { useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@elysiac/sdk-react';

import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { useServerError } from './use-server-error';
import { useCompleteAuth } from './use-complete-auth';

export function useLoginForm() {
  const loginMutation = useLogin();
  const completeAuth = useCompleteAuth();
  const { serverError, clearServerError, failWith } = useServerError();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
  });

  const field = (name: FieldPath<LoginFormValues>) =>
    form.register(name, { onChange: clearServerError });

  const onSubmit = form.handleSubmit(async (data) => {
    clearServerError();

    let refreshToken: string;
    try {
      const result = await loginMutation.mutateAsync(data);
      refreshToken = result.refresh_token;
    } catch (error) {
      form.resetField('password');
      failWith(error, { unauthorized: 'Неверный логин или пароль' });
      return;
    }

    try {
      await completeAuth(refreshToken);
    } catch (error) {
      failWith(error);
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
