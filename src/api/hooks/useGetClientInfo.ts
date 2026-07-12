import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  ClientInfoRequest,
  ClientInfoResponse,
  ErrorResponse,
} from '@/src/api/data';
import { clientInfo } from '@/src/api/request';

export const useGetClientInfo = (
  options?: Omit<
    UseMutationOptions<
      ClientInfoResponse,
      ErrorResponse,
      ClientInfoRequest
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['get-client-info'],
    mutationFn: clientInfo,
    ...options,
  });
