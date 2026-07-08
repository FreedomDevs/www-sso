import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { ConfirmEmailRequest, ConfirmEmailResponse } from '@/src/api/data';
import { confirmEmail } from '@/src/api/request';

export const useConfirmEmail = (
  options?: Omit<
    UseMutationOptions<ConfirmEmailResponse, unknown, ConfirmEmailRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['confirm-email'],
    mutationFn: confirmEmail,
    ...options,
  });
