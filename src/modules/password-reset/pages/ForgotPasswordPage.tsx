import Link from 'next/link';
import { LuArrowLeft, LuKeyRound } from 'react-icons/lu';
import { AuthCard, AuthFooter, AuthHeader, AuthShell } from '@/modules/auth';
import { Button, Field, Input } from '@/shared/components/ui';
import styles from '../styles/password-reset.module.scss';

export function ForgotPasswordPage() {
  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          logo={<LuKeyRound />}
          title="Забыли пароль?"
          description="Укажите email, и мы отправим ссылку для сброса"
        />

        <div className={styles.form}>
          <Field label="Email">
            <Input
              type="email"
              name="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </Field>

          <Button type="button" size="lg" fullWidth className={styles.submit}>
            Отправить ссылку
          </Button>
        </div>

        <AuthFooter>
          <Link href="/login" className={styles.backLink}>
            <LuArrowLeft /> Вернуться ко входу
          </Link>
        </AuthFooter>
      </AuthCard>
    </AuthShell>
  );
}
