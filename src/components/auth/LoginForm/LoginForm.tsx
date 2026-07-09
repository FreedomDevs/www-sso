'use client';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';

import styles from './LoginForm.module.css';
import {
  AuthDivider,
  AuthFooter,
  AuthLinks,
  AuthSocials,
} from '@/src/components/auth/components';
import { useLoginForm } from '@/src/components/auth/hooks/useLoginForm';

export function LoginForm() {
  const {
    register,
    formState: { errors },
    login,
    onSubmit,
  } = useLoginForm();

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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

      {errors.root && (
        <div className={styles.serverError}>{errors.root.message}</div>
      )}

      <Button type="submit" fullWidth variant="primary" size="sm">
        {login.isPending ? 'Входим...' : 'Продолжить'}
      </Button>

      <AuthDivider />

      <AuthSocials />

      <AuthLinks />

      <AuthFooter
        text="Нет аккаунта?"
        linkText="Зарегистрироваться"
        href="/auth/register"
      />
    </form>
  );
}
