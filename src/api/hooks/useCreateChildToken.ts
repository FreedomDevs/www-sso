import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  CreateChildTokenRequest,
  CreateChildTokenResponse,
  ErrorResponse,
} from '@/src/api/data';
import { createChildToken } from '@/src/api/request';

export const useCreateChildToken = (
  options?: Omit<
    UseMutationOptions<
      CreateChildTokenResponse,
      ErrorResponse,
      CreateChildTokenRequest
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['create-child-token'],
    mutationFn: createChildToken,
    ...options,
  });
