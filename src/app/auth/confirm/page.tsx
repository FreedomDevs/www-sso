import { Metadata } from 'next';
import { PageCtx } from '@/src/app/auth/confirm/PageCtx';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'ElysiaID | Подтверждение',
};

type Props = {
  searchParams: Promise<{
    client_id?: string;
  }>;
};

export default async function ConfirmPage({ searchParams }: Props) {
  const { client_id } = await searchParams;

  if (!client_id) {
    redirect('/auth');
  }


  return <PageCtx client_id={client_id}/>;
}
