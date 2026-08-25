import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  ErrorResponse,
  UpdateMyNameRequest,
  UpdateMyNameResponse,
} from '@/src/api/data';
import { updateMyName } from '@/src/api/request';

export const useUpdateMyName = (
  options?: Omit<
    UseMutationOptions<
      UpdateMyNameResponse,
      ErrorResponse,
      UpdateMyNameRequest
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['updateMyName'],
    mutationFn: updateMyName,
    ...options,
  });
