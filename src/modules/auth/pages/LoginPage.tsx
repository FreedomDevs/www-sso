'use client';

import Link from 'next/link';
import { Button, Field, Input, PasswordInput } from '@/shared/components/ui';
import {
  AuthCard,
  AuthFooter,
  AuthHeader,
  AuthShell,
} from '@/shared/components/auth-layout';

import { useLoginForm } from '../hooks/use-login-form';
import styles from '../styles/auth.module.scss';

export function LoginPage() {
  const { field, onSubmit, errors, isSubmitting, serverError } = useLoginForm();

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          title="ElysiaID"
          description="Войдите в свой аккаунт, чтобы продолжить"
        />

        <form onSubmit={onSubmit} className={styles.form}>
          <Field label="Email или логин" error={errors.login?.message}>
            <Input
              {...field('login')}
              type="text"
              placeholder="name@example.com или username"
              autoComplete="username"
            />
          </Field>

          <Field
            label="Пароль"
            error={errors.password?.message}
            labelAction={<Link href="/forgot-password">Забыли пароль?</Link>}
          >
            <PasswordInput
              {...field('password')}
              placeholder="Введите пароль"
              autoComplete="current-password"
            />
          </Field>

          <Button
            type="submit"
            size="lg"
            fullWidth
            className={styles.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Входим...' : 'Войти'}
          </Button>

          {serverError && (
            <div role="alert" className={styles.formError}>
              {serverError}
            </div>
          )}
        </form>

        <AuthFooter>
          Нет аккаунта? <Link href="/register">Создать</Link>
        </AuthFooter>
      </AuthCard>
    </AuthShell>
  );
}

export default LoginPage;
