'use client';

import { Controller } from 'react-hook-form';
import { LuMail } from 'react-icons/lu';

import {
  AuthCard,
  AuthHeader,
  AuthShell,
} from '@/shared/components/auth-layout';
import { Button, OtpInput } from '@/shared/components/ui';

import { useVerifyEmailForm } from '../hooks/use-verify-email-form';
import styles from '../styles/auth.module.scss';

export function VerifyEmailPage() {
  const v = useVerifyEmailForm();

  if (!v.isAvailable) {
    return (
      <AuthShell>
        <AuthCard>
          <AuthHeader
            logo={<LuMail />}
            title="Подтверждение недоступно"
            description="Данные для подтверждения email не найдены. Возможно, вы обновили страницу или срок действия сессии истёк."
          />
          <Button type="button" size="lg" fullWidth onClick={v.goToRegister}>
            Вернуться к регистрации
          </Button>
        </AuthCard>
      </AuthShell>
    );
  }

  const resendLabel = v.isResending
    ? 'Отправляем...'
    : v.resendCooldown > 0
      ? `Отправить ещё раз (${v.resendCooldown} сек.)`
      : 'Отправить ещё раз';

  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          logo={<LuMail />}
          title="Подтвердите email"
          description={
            <>
              Мы отправили 6-значный код на{' '}
              <span className={styles.email}>{v.email}</span>
            </>
          }
        />

        <form className={styles.form} onSubmit={v.onSubmit}>
          <Controller
            name="code"
            control={v.control}
            render={({ field, fieldState }) => (
              <OtpInput
                name={field.name}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  v.onCodeChange();
                }}
                invalid={fieldState.invalid}
                disabled={v.isBusy}
                autoFocus
              />
            )}
          />

          {v.codeError && (
            <div role="alert" className={styles.formError}>
              {v.codeError}
            </div>
          )}

          <p className={styles.hint}>
            Код действует 10 минут. Проверьте папку «Спам», если письма нет.
          </p>

          <Button
            type="submit"
            size="lg"
            fullWidth
            className={styles.submit}
            disabled={v.isBusy}
          >
            {v.isSubmitting ? 'Подтверждаем...' : 'Подтвердить'}
          </Button>

          {v.serverError && (
            <div role="alert" className={styles.formError}>
              {v.serverError}
            </div>
          )}

          <p className={styles.resend}>
            Не получили код?{' '}
            <button
              type="button"
              className={styles.linkButton}
              disabled={!v.canResend}
              onClick={v.onResend}
            >
              {resendLabel}
            </button>
          </p>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
