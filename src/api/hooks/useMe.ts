import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { ErrorResponse, MeResponse } from '@/src/api/data';
import { me } from '@/src/api/request';

export const useMe = (
  options?: Omit<
    UseMutationOptions<MeResponse, ErrorResponse, null>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['me'],
    mutationFn: me,
    ...options,
  });
