import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  ErrorResponse,
  RefreshPasswordRequest,
  RefreshPasswordResponse,
} from '@/src/api/data';
import { refreshPassword } from '@/src/api/request';

export const useRefreshPassword = (
  options?: Omit<
    UseMutationOptions<
      RefreshPasswordResponse,
      ErrorResponse,
      RefreshPasswordRequest
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['refreshPassword'],
    mutationFn: refreshPassword,
    ...options,
  });
