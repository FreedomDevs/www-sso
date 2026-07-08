import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { RegisterRequest, RegisterResponse } from '@/src/api/data';
import { register } from '@/src/api/request';

export const useRegister = (
  options?: Omit<
    UseMutationOptions<RegisterResponse, unknown, RegisterRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    ...options,
  });
