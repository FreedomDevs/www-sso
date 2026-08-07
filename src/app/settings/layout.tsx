'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiUser, FiShield, FiKey, FiLogOut } from 'react-icons/fi';
import type { IconType } from 'react-icons';

import styles from './layout.module.scss';
import { AccessManager } from '@/src/lib/accessManager';
import { SessionManager } from '@/src/lib/sessionManager';
import { AuthProvider } from '@/src/providers/AuthProvider';

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

const navigation: NavItem[] = [
  {
    label: 'Профиль',
    href: '/settings/account',
    icon: FiUser,
  },
  {
    label: 'Безопасность',
    href: '/settings/security',
    icon: FiShield,
  },
  {
    label: 'Сессии',
    href: '/settings/sessions',
    icon: FiKey,
  },
];

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SettingsContent>{children}</SettingsContent>
    </AuthProvider>
  );
}

function SettingsContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  function exit() {
    AccessManager.remove();
    SessionManager.removeAll();

    router.push('/auth');
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span>ElysiaID</span>
        </div>

        <nav className={styles.navigation}>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${
                  isActive(item.href) ? styles.active : ''
                }`}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button className={styles.logout} onClick={exit}>
          <FiLogOut />
          <span>Выйти</span>
        </button>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
