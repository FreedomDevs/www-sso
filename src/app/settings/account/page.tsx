'use client';

import { useEffect, useState } from 'react';
import {
  FiArrowRight,
  FiCopy,
  FiShield,
  FiMonitor,
  FiArrowDown,
} from 'react-icons/fi';
import Link from 'next/link';
import { toast } from 'sonner';
import clsx from 'clsx';

import styles from './page.module.scss';
import { useMe } from '@/src/api/hooks/useMe';
import { Loader } from '@/src/components/ui/Loader/Loader';
import { useGetMeNameHistory } from '@/src/api/hooks';

export default function AccountPage() {
  const meMutation = useMe();
  const getHistoryMutations = useGetMeNameHistory();

  useEffect(() => {
    meMutation.mutate(null);
  }, []);

  const [showNameHistory, setShowNameHistory] = useState(false);

  const user = meMutation.data;

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  const copyUserId = async () => {
    if (!user?.id) return;

    await navigator.clipboard.writeText(user.id);

    toast.success('ID успешно скопирован!');
  };

  if (meMutation.isPending && !user) {
    return (
      <section className={styles.loading}>
        <Loader size="lg" />
        <span>Загрузка аккаунта</span>
      </section>
    );
  }

  const NameHistory = getHistoryMutations.data?.history;

  function nameHistory() {
    setShowNameHistory((prev) => !prev);
    getHistoryMutations.mutate(null);

    console.log(NameHistory)
  }

  return (
    <>
      <span className={clsx(styles.glow, styles.glowLeft)} />
      <span className={clsx(styles.glow, styles.glowRight)} />
      <section className={styles.page}>
        <header className={styles.header}>
          <div className={styles.icon}>
            <FiShield />
          </div>

          <div>
            <h1>Аккаунт</h1>
            <p>Управление данными вашего аккаунта ElysiaID</p>
          </div>
        </header>

        <div className={styles.profile}>
          <div className={styles.profileContent}>
            <span className={styles.profileLabel}>ПРОФИЛЬ</span>
            <div className={styles.profileName}>
              <div className={styles.profileNameBlock}>
                <h2>{user?.name ?? 'Неизвестный пользователь'}</h2>
                <button
                  onClick={() => nameHistory()}
                  className={clsx(
                    showNameHistory ? styles.profileNameBlockButtonActive : ''
                  )}
                >
                  <FiArrowDown />
                </button>
              </div>

              {showNameHistory && (
                <div className={styles.nameHistory}>
                  <div className={styles.nameHistoryHeader}>
                    <span>История никнеймов</span>
                  </div>

                  <div className={styles.nameHistoryList}>
                    {getHistoryMutations.isPending ? (
                      <span>Загрузка {'>_<'}</span>
                    ) : getHistoryMutations.isError ? (
                      <span>Не удалось загрузить историю {'>_<'}</span>
                    ) : NameHistory?.length ? (
                      NameHistory.map((data) => (
                        <span key={data.id}>{data.name}</span>
                      ))
                    ) : (
                      <span>Вы ни разу не меняли ник {'>_<'}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <p>Аккаунт ElysiaID</p>
          </div>

          <div className={styles.profileStatus}>
            <span className={clsx(styles.statusDot, styles.statusDotActive)} />
            Аккаунт активен
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Основная информация</h2>
                <p>Данные вашего профиля</p>
              </div>

              <span>Профиль</span>
            </div>

            <div className={styles.fields}>
              <div className={styles.field}>
                <span className={styles.label}>Имя пользователя</span>

                <span className={styles.value}>{user?.name ?? '—'}</span>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Email</span>

                <span className={styles.value}>—</span>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Дата регистрации</span>

                <span className={styles.value}>{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className={styles.accountCard}>
            <div className={styles.accountCardHeader}>
              <span className={styles.accountLabel}>ACCOUNT ID</span>
            </div>

            <div className={styles.accountId}>
              <code>{user?.id ?? '—'}</code>

              <button
                type="button"
                onClick={copyUserId}
                disabled={!user?.id}
                aria-label="Скопировать ID аккаунта"
              >
                <FiCopy />
              </button>
            </div>

            <p>Используйте этот идентификатор при обращении в поддержку.</p>
          </div>
        </div>

        <div className={styles.quickAccess}>
          <div className={styles.quickHeader}>
            <div>
              <h2>Быстрый доступ</h2>
              <p>Управление основными параметрами аккаунта</p>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/settings/security" className={styles.action}>
              <div className={styles.actionIcon}>
                <FiShield />
              </div>

              <div className={styles.actionContent}>
                <strong>Безопасность</strong>
                <span>Защита аккаунта и способы входа</span>
              </div>

              <FiArrowRight className={styles.actionArrow} />
            </Link>

            <Link href="/settings/sessions" className={styles.action}>
              <div className={styles.actionIcon}>
                <FiMonitor />
              </div>

              <div className={styles.actionContent}>
                <strong>Активные сессии</strong>
                <span>Управление устройствами и входами</span>
              </div>

              <FiArrowRight className={styles.actionArrow} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
