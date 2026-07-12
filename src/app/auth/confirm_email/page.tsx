import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PageCtx from '@/src/app/auth/confirm_email/PageCtx';

export const metadata: Metadata = {
  title: 'ElysiaID | Подтверждение email',
};

type Props = {
  searchParams: Promise<{
    email?: string;
    emailToken?: string;
    login?: string;
    client_id?: string;
  }>;
};

export default async function OtpPage({ searchParams }: Props) {
  const { email, emailToken, login, client_id } = await searchParams;

  if (!email || !emailToken  || !login) {
    redirect('/auth');
  }

  return <PageCtx email={email} emailToken={emailToken} login={login} client_id={client_id}/>;
}
