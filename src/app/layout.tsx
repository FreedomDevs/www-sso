import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.scss';
import { Toaster } from 'sonner';
import { TanstackQueryProvider } from '@/src/providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ElysiaID',
  icons: {
    icon: [
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <TanstackQueryProvider>
          {children}
          <Toaster
            theme="dark"
            position="top-center"
            richColors
            toastOptions={{
              className: 'toast',
            }}
          />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
