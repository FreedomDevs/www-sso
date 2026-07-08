import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { CheckRefreshTokenRequest, SuccessResponse } from '@/src/api/data';
import { checkRefreshToken } from '@/src/api/request';

export const useCheckRefreshToken = (
  options?: Omit<
    UseMutationOptions<SuccessResponse<null>, unknown, CheckRefreshTokenRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['check-refresh-token'],
    mutationFn: checkRefreshToken,
    ...options,
  });
