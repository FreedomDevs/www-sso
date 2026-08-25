import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  ErrorResponse,
  GetMyIntegrationsResponse,
} from '@/src/api/data';
import { getMyIntegrations } from '@/src/api/request';

export const useGetMyIntegrations = (
  options?: Omit<
    UseMutationOptions<GetMyIntegrationsResponse, ErrorResponse, null>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['getMyIntegrations'],
    mutationFn: getMyIntegrations,
    ...options,
  });
