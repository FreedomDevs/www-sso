import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConfirmEmail, useResendEmail } from '@elysiac/sdk-react';

import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from '../schemas/verify-email.schema';
import { useEmailVerification } from '../store/email-verification.store';
import { useServerError } from './use-server-error';
import { useCompleteAuth } from './use-complete-auth';
import { useCooldown } from './use-cooldown';

const RESEND_COOLDOWN = 60;

export function useVerifyEmailForm() {
  const router = useRouter();
  const confirmEmail = useConfirmEmail();
  const resendEmail = useResendEmail();
  const completeAuth = useCompleteAuth();

  const email = useEmailVerification((s) => s.email);
  const token = useEmailVerification((s) => s.token);
  const clearVerification = useEmailVerification((s) => s.clearVerification);

  const { serverError, clearServerError, failWith } = useServerError();
  const cooldown = useCooldown(RESEND_COOLDOWN);

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: '' },
  });

  const { isSubmitting } = form.formState;
  const isResending = resendEmail.isPending;
  const isBusy = isSubmitting || isResending;

  const onSubmit = form.handleSubmit(async ({ code }) => {
    if (!token) return;
    clearServerError();

    let refreshToken: string;
    try {
      const result = await confirmEmail.mutateAsync({
        email_verefication_token: token,
        code,
      });
      refreshToken = result.refresh_token;
    } catch (error) {
      failWith(error, { unauthorized: 'Неверный код' });
      return;
    }

    try {
      await completeAuth(refreshToken, { onAdopted: clearVerification });
    } catch (error) {
      failWith(error);
    }
  });

  const onResend = async () => {
    if (!token || cooldown.isActive || isBusy) return;
    clearServerError();

    try {
      await resendEmail.mutateAsync({ email_verification_token: token });
      cooldown.restart();
    } catch (error) {
      failWith(error);
    }
  };

  return {
    // состояние
    email,
    isAvailable: Boolean(email && token),
    control: form.control,
    codeError: form.formState.errors.code?.message,
    serverError,
    isSubmitting,
    isResending,
    isBusy,
    resendCooldown: cooldown.left,
    canResend: !cooldown.isActive && !isBusy,
    // действия
    onSubmit,
    onResend,
    onCodeChange: clearServerError,
    goToRegister: () => router.replace('/register'),
  };
}
