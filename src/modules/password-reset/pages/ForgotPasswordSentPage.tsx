import Link from 'next/link';
import { LuArrowLeft, LuMailCheck } from 'react-icons/lu';
import { AuthCard, AuthFooter, AuthHeader, AuthShell } from '@/modules/auth';
import { Button } from '@/shared/components/ui';
import styles from '../styles/password-reset.module.scss';

export type ForgotPasswordSentPageProps = {
  email?: string;
};

export function ForgotPasswordSentPage({
  email = 'name@example.com',
}: ForgotPasswordSentPageProps) {
  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          logo={<LuMailCheck />}
          title="Проверьте почту"
          description={
            <>
              Если аккаунт с адресом{' '}
              <span className={styles.email}>{email}</span> существует, мы
              отправили на него ссылку для сброса пароля
            </>
          }
        />

        <div className={styles.form}>
          <p className={styles.hint}>
            Ссылка действует 30 минут. Если письма нет, загляните в папку
            «Спам».
          </p>

          <Button type="button" variant="secondary" size="lg" fullWidth>
            Отправить ещё раз
          </Button>
        </div>

        <AuthFooter>
        <span>
          Ошиблись в адресе? <Link href="/forgot-password">Изменить</Link>
        </span>
        <Link href="/login" className={styles.backLink}>
          <LuArrowLeft /> Вернуться ко входу
        </Link>
      </AuthFooter>
      </AuthCard>
    </AuthShell>
  );
}
