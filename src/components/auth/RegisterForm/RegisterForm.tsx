'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';

import styles from './RegisterForm.module.css';

type RegisterFormValues = {
  email: string;
  login: string;
  password: string;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      login: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        placeholder="Email"
        variant="default"
        label="Email"
        error={errors.email?.message}
        {...register('email', {
          required: 'Введите email',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Введите корректный email',
          },
        })}
      />

      <Input
        id="login"
        placeholder="Логин"
        variant="default"
        label="Логин"
        error={errors.login?.message}
        {...register('login', {
          required: 'Введите логин',
          minLength: {
            value: 3,
            message: 'Логин минимум 3 символа',
          },
          maxLength: {
            value: 16,
            message: 'Логин максимум 16 символов',
          },
          pattern: {
            value: /^[a-zA-Z_0-9]+$/,
            message: 'Только латинские буквы, цифры и символ _',
          },
        })}
      />

      <Input
        id="password"
        type="password"
        placeholder="Пароль"
        variant="default"
        label="Пароль"
        error={errors.password?.message}
        {...register('password', {
          required: 'Введите пароль',
          minLength: {
            value: 6,
            message: 'Пароль минимум 6 символов',
          },
        })}
      />

      <Button type="submit" fullWidth variant="primary" size="sm">
        Продолжить
      </Button>

      <div className={styles.divider}>
        <span />
        <p>или продолжите с</p>
        <span />
      </div>

      <div className={styles.socials}>
        <Button
          type="button"
          size="sm"
          variant="integrations"
          leftIcon={<FaGoogle />}
          fullWidth
        >
          Google
        </Button>

        <Button
          type="button"
          size="sm"
          variant="integrations"
          leftIcon={<FaGithub />}
          fullWidth
        >
          GitHub
        </Button>
      </div>

      <div className={styles.register}>
        <span>Уже есть аккаунт?</span>

        <Link href="/auth/login">Войти</Link>
      </div>
    </form>
  );
}
