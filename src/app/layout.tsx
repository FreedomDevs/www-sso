import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/shared/components/ui';
import '@/styles/globals.scss';
import { Providers } from '@/core/providers';

const sans = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-next-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ElysiaID',
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-theme="dark" className={sans.variable}>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
