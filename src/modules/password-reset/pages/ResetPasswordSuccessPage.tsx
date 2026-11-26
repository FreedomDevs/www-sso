import { LuCircleCheck } from 'react-icons/lu';
import { ButtonLink } from '@/shared/components/ui';
import {
  AuthCard,
  AuthHeader,
  AuthShell,
} from '@/shared/components/auth-layout';

export function ResetPasswordSuccessPage() {
  return (
    <AuthShell>
      <AuthCard>
        <AuthHeader
          tone="success"
          logo={<LuCircleCheck />}
          title="Пароль изменён"
          description="Теперь вы можете войти с новым паролем"
        />

        <ButtonLink href="/login" size="lg" fullWidth>
          Войти
        </ButtonLink>
      </AuthCard>
    </AuthShell>
  );
}