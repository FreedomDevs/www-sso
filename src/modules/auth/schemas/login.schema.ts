import { z } from 'zod';

const usernameSchema = z
  .string()
  .min(3, 'Логин должен содержать минимум 3 символа')
  .max(16, 'Логин не может содержать больше 16 символов')
  .regex(
    /^[a-zA-Z0-9_]+$/,
    'Логин может содержать только латинские буквы, цифры и _'
  );

const emailSchema = z.string().email('Введите корректный email');

export const loginSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, 'Введите email или логин')
    .refine(
      (value) =>
        emailSchema.safeParse(value).success ||
        usernameSchema.safeParse(value).success,
      'Введите корректный email или логин'
    ),

  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
