import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Минимум 3 символа')
    .max(16, 'Максимум 16 символов')
    .regex(/^[a-zA-Z0-9_]+$/, 'Только латинские буквы, цифры и _'),

  email: z
    .string()
    .trim()
    .min(1, 'Введите email')
    .email('Введите корректный email'),

  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),

  terms: z
    .boolean()
    .refine((value) => value, 'Необходимо принять условия использования'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
