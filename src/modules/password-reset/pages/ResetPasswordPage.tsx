import { LuLockKeyhole } from 'react-icons/lu';
import { Button, Field, PasswordInput } from '@/shared/components/ui';
import styles from '../styles/password-reset.module.scss';
import {
  AuthCard,
  AuthHeader,
  AuthShell,
} from '@/shared/components/auth-layout';

export function ResetPasswordPage() {
  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          logo={<LuLockKeyhole />}
          title="Новый пароль"
          description="Придумайте пароль для вашего аккаунта"
        />

        <div className={styles.form}>
          <Field label="Новый пароль" hint="Не менее 8 символов">
            <PasswordInput
              name="password"
              placeholder="Новый пароль"
              autoComplete="new-password"
            />
          </Field>

          <Field label="Повторите пароль">
            <PasswordInput
              name="confirmPassword"
              placeholder="Ещё раз"
              autoComplete="new-password"
            />
          </Field>

          <Button type="button" size="lg" fullWidth className={styles.submit}>
            Сохранить пароль
          </Button>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
