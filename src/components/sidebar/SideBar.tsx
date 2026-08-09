'use client'

import styles from './sidebar.module.scss'
import Link from 'next/link';
import { FiLogOut, FiMonitor, FiShield, FiUser } from 'react-icons/fi';
import React from 'react';
import type { IconType } from 'react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { AccessManager } from '@/src/lib/accessManager';
import { SessionManager } from '@/src/lib/sessionManager';

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
    icon: FiMonitor,
  },
];

export function SideBar() {
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
  );
}