'use client';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';

import styles from './RegisterForm.module.css';
import {
  AuthDivider,
  AuthFooter,
  AuthSocials,
  authValidation,
} from '@/src/components/auth/components';
import { useRegisterForm } from '@/src/components/auth/RegisterForm/useRegisterForm';

export function RegisterForm() {
  const {
    register,
    formState: { errors },
    registerF,
    onSubmit,
  } = useRegisterForm();

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        id="email"
        placeholder="Email"
        variant="default"
        label="Email"
        error={errors.email?.message}
        {...register('email', authValidation.email)}
      />

      <Input
        id="login"
        placeholder="Логин"
        variant="default"
        label="Логин"
        error={errors.login?.message}
        {...register('login', authValidation.login)}
      />

      <Input
        id="password"
        type="password"
        placeholder="Пароль"
        variant="default"
        label="Пароль"
        error={errors.password?.message}
        {...register('password', authValidation.password)}
      />

      {errors.root && (
        <div className={styles.serverError}>{errors.root.message}</div>
      )}

      <Button type="submit" fullWidth variant="primary" size="sm">
        {registerF.isPending ? 'Входим...' : 'Продолжить'}
      </Button>

      <AuthDivider />
      <AuthSocials />

      <AuthFooter
        text="Уже есть аккаунт?"
        linkText="Войти"
        href="/auth/login"
      />
    </form>
  );
}
