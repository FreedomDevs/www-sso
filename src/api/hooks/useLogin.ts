import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { LoginRequest, LoginResponse } from '@/src/api/data';
import { login } from '@/src/api/request';

export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, unknown, LoginRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    ...options,
  });
