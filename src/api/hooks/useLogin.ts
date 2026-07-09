import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  ErrorResponse,
  LoginRequest,
  LoginResponse,
} from '@/src/api/data';
import { login } from '@/src/api/request';

export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, ErrorResponse, LoginRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    ...options,
  });
