'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';

import styles from './LoginForm.module.css';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '@/src/api/hooks';
import { SessionManager } from '@/src/lib/sessionManager';
import { LoginRequest } from '@/src/api/data';
import { useState } from 'react';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const [login1, setLogin1] = useState('');

  const login = useLogin({
    onSuccess(data) {
      SessionManager.setCurrent({
        username: login1,
        masterToken: data.refresh_token,
      });

      if (searchParams.has('client_id')) {
        router.replace(`/auth/confirm?${query}`);
        return;
      }

      router.replace('/');
    },
    onError(error) {
      console.error(error);
    },
  });

  const onSubmit = (data: LoginRequest) => {
    setLogin1(data.login);
    login.mutate(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="login"
        placeholder="имя пользователя"
        variant="default"
        label="Login"
        error={errors.login?.message}
        {...register('login', {
          required: 'Введите login',
        })}
      />

      <Input
        id="password"
        placeholder="Пароль"
        type="password"
        variant="default"
        label="Password"
        error={errors.password?.message}
        {...register('password', {
          required: 'Введите пароль',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов',
          },
        })}
      />

      <Button type="submit" fullWidth variant="primary" size="sm">
        {login.isPending ? 'Входим...' : 'Продолжить'}
      </Button>

      <div className={styles.divider}>
        <span />
        <p>или продолжите с</p>
        <span />
      </div>

      <div className={styles.socials}>
        <Button
          size="sm"
          variant="integrations"
          leftIcon={<FaGoogle />}
          fullWidth
          type="button"
        >
          Google
        </Button>

        <Button
          size="sm"
          variant="integrations"
          leftIcon={<FaGithub />}
          fullWidth
          type="button"
        >
          GitHub
        </Button>
      </div>

      <div className={styles.links}>
        <Link href="/passwordless">Войти с Passkey</Link>

        <Link href="/forgot-password">Забыли пароль?</Link>
      </div>

      <div className={styles.register}>
        <span>Нет аккаунта?</span>

        <Link href="/auth/register">Зарегистрироваться</Link>
      </div>
    </form>
  );
}
