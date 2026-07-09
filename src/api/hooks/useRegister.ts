import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type {
  ErrorResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/src/api/data';
import { register } from '@/src/api/request';

export const useRegister = (
  options?: Omit<
    UseMutationOptions<RegisterResponse, ErrorResponse, RegisterRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    ...options,
  });
