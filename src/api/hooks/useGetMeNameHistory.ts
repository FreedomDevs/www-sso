import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  ErrorResponse,
  NameHistoryResponse,
} from '@/src/api/data';
import { getMyNameHistory } from '@/src/api/request';

export const useGetMeNameHistory = (
  options?: Omit<
    UseMutationOptions<NameHistoryResponse, ErrorResponse, null>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['getMyNameHistory'],
    mutationFn: getMyNameHistory,
    ...options,
  });
