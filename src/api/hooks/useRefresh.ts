import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { RefreshRequest } from '@/src/api/data';
import type { RefreshResponse } from '@/src/api/data/RefreshResponse';
import { refresh } from '@/src/api/request';

export const useRefresh = (
  options?: Omit<
    UseMutationOptions<RefreshResponse, unknown, RefreshRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['refresh'],
    mutationFn: refresh,
    ...options,
  });
