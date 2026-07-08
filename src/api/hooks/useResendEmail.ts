import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { ResendEmailRequest, SuccessResponse } from '@/src/api/data';
import { resendEmail } from '@/src/api/request';

export const useResendEmail = (
  options?: Omit<
    UseMutationOptions<SuccessResponse<null>, unknown, ResendEmailRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['resend-email'],
    mutationFn: resendEmail,
    ...options,
  });
