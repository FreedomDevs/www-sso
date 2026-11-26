'use client';

import Link from 'next/link';
import {
  Button,
  Checkbox,
  Field,
  Input,
  PasswordInput,
} from '@/shared/components/ui';
import {
  AuthCard,
  AuthFooter,
  AuthHeader,
  AuthShell,
} from '@/shared/components/auth-layout';

import { useRegisterForm } from '../hooks/use-register-form';
import styles from '../styles/auth.module.scss';

export function RegisterPage() {
  const { field, onSubmit, errors, isSubmitting, serverError } =
    useRegisterForm();

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          title="ElysiaID"
          description="Присоединяйтесь к экосистеме Elysia"
        />

        <form onSubmit={onSubmit} className={styles.form}>
          <Field label="Login" error={errors.username?.message}>
            <Input
              {...field('username')}
              placeholder="username"
              autoComplete="username"
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <Input
              {...field('email')}
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </Field>

          <Field
            label="Пароль"
            hint="Не менее 8 символов"
            error={errors.password?.message}
          >
            <PasswordInput
              {...field('password')}
              placeholder="Придумайте пароль"
              autoComplete="new-password"
            />
          </Field>

          <div className={styles.termsField}>
            <Checkbox
              {...field('terms')}
              label={
                <>
                  Я принимаю <Link href="/terms">условия использования</Link> и{' '}
                  <Link href="/privacy">политику конфиденциальности</Link>
                </>
              }
            />
            {errors.terms?.message && (
              <div role="alert" className={styles.formError}>
                {errors.terms.message}
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            className={styles.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Создаём аккаунт...' : 'Создать аккаунт'}
          </Button>

          {serverError && (
            <div role="alert" className={styles.formError}>
              {serverError}
            </div>
          )}
        </form>

        <AuthFooter>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </AuthFooter>
      </AuthCard>
    </AuthShell>
  );
}

export default RegisterPage;
