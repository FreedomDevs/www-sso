import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  ErrorResponse,
} from '@/src/api/data';
import { confirmEmail } from '@/src/api/request';

export const useConfirmEmail = (
  options?: Omit<
    UseMutationOptions<ConfirmEmailResponse, ErrorResponse, ConfirmEmailRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['confirm-email'],
    mutationFn: confirmEmail,
    ...options,
  });
