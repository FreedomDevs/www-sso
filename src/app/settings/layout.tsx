import React from 'react';

import styles from './layout.module.scss';
import { AuthProvider } from '@/src/providers/AuthProvider';
import { SideBar } from '@/src/components/sidebar/SideBar';

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className={styles.layout}>
        <SideBar />

        <main className={styles.content}>{children}</main>
      </div>
    </AuthProvider>
  );
}
