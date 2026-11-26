import { z } from 'zod';

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(1, 'Введите код подтверждения')
    .regex(/^\d{6}$/, 'Введите все 6 цифр'),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
