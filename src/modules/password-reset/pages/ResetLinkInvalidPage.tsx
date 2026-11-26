import Link from 'next/link';
import { LuArrowLeft, LuTriangleAlert } from 'react-icons/lu';
import { ButtonLink } from '@/shared/components/ui';
import styles from '../styles/password-reset.module.scss';
import {
  AuthCard,
  AuthFooter,
  AuthHeader,
  AuthShell,
} from '@/shared/components/auth-layout';

export function ResetLinkInvalidPage() {
  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          tone="danger"
          logo={<LuTriangleAlert />}
          title="Ссылка недействительна"
          description="Срок её действия истёк или она уже была использована"
        />

        <ButtonLink href="/forgot-password" size="lg" fullWidth>
          Запросить новую ссылку
        </ButtonLink>

        <AuthFooter>
          <Link href="/login" className={styles.backLink}>
            <LuArrowLeft /> Вернуться ко входу
          </Link>
        </AuthFooter>
      </AuthCard>
    </AuthShell>
  );
}
