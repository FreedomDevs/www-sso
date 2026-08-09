'use client';

import styles from './sidebar.module.scss';
import Link from 'next/link';
import {
  FiLogOut,
  FiMonitor,
  FiShield,
  FiUser,
  FiChevronLeft,
} from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import type { IconType } from 'react-icons';
import { usePathname, useRouter } from 'next/navigation';
import { AccessManager } from '@/src/lib/accessManager';
import { SessionManager } from '@/src/lib/sessionManager';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

const navigation: NavItem[] = [
  { label: 'Профиль', href: '/settings/account', icon: FiUser },
  { label: 'Безопасность', href: '/settings/security', icon: FiShield },
  { label: 'Сессии', href: '/settings/sessions', icon: FiMonitor },
];

export function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCollapsed(mobile);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile && !collapsed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(true);
    }
  }, [pathname, isMobile]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  function exit() {
    AccessManager.remove();
    SessionManager.removeAll();
    router.push('/auth');
  }

  return (
    <>
      <aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}
      >
        <div className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="ElysiaID"
            width={34}
            height={34}
            priority
          />
          <span>ElysiaID</span>
        </div>

        <nav className={styles.navigation}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
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

        <button
          type="button"
          className={styles.collapse}
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
        >
          <FiChevronLeft />
        </button>
      </aside>

      {isMobile && !collapsed && (
        <div
          className={styles.overlay}
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
