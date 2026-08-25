'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiX, FiEdit3, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { toast } from 'sonner';

import styles from './ChangeNameModal.module.scss';
import { useUpdateMyName } from '@/src/api/hooks';
import type { ErrorResponse } from '@/src/api/data';

interface ChangeNameModalProps {
  currentName: string;
  onClose: () => void;
  onNameChanged: () => void;
}

interface ChangeNameForm {
  name: string;
}

export function ChangeNameModal({
  currentName,
  onClose,
  onNameChanged,
}: ChangeNameModalProps) {
  const [isCooldown, setIsCooldown] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ChangeNameForm>({
    mode: 'onChange',
    defaultValues: {
      name: currentName,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const name = watch('name');

  const updateNameMutation = useUpdateMyName({
    onSuccess: () => {
      toast.success('Игровое имя успешно изменено');

      onNameChanged();
      onClose();
    },

    onError: (error: ErrorResponse) => {
      switch (error.error.code) {
        case 'NAME_CHANGE_COOLDOWN':
          setIsCooldown(true);
          toast.error('Изменение имени временно недоступно');
          break;

        default:
          toast.error('Не удалось изменить игровое имя');
          break;
      }
    },
  });

  const onSubmit = async (data: ChangeNameForm) => {
    if (isCooldown) {
      return;
    }

    await updateNameMutation.mutateAsync({
      name: data.name,
    });
  };

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.modal}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          disabled={updateNameMutation.isPending}
          aria-label="Закрыть"
        >
          <FiX />
        </button>

        <div className={styles.header}>
          <div className={styles.icon}>
            <FiEdit3 />
          </div>

          <div>
            <h2>Изменение имени</h2>
            <p>Это имя будет использоваться в ваших игровых проектах.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.content}>
            <div className={styles.namePreview}>
              <div className={styles.namePreviewItem}>
                <span>Текущее имя</span>
                <strong>{currentName}</strong>
              </div>

              <FiArrowRight className={styles.namePreviewArrow} />

              <div className={styles.namePreviewItem}>
                <span>Новое имя</span>

                <strong
                  className={
                    !name || name === currentName ? styles.placeholder : ''
                  }
                >
                  {name || 'Новое имя'}
                </strong>
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldHeader}>
                <label htmlFor="name">Новое имя</label>

                <span>{name?.length ?? 0}/16</span>
              </div>

              <input
                id="name"
                autoFocus
                maxLength={16}
                placeholder="Введите новое имя"
                disabled={isCooldown || updateNameMutation.isPending}
                className={errors.name ? styles.inputError : ''}
                {...register('name', {
                  required: 'Введите новое имя',

                  minLength: {
                    value: 3,
                    message: 'Минимум 3 символа',
                  },

                  maxLength: {
                    value: 16,
                    message: 'Максимум 16 символов',
                  },

                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'Только латинские буквы, цифры и _',
                  },

                  validate: (value) =>
                    value !== currentName || 'Введите другое имя',
                })}
              />

              <div className={styles.fieldFooter}>
                <span className={errors.name ? styles.error : ''}>
                  {errors.name?.message ?? 'От 3 до 16 символов'}
                </span>
              </div>
            </div>

            <div
              className={`${styles.info} ${isCooldown ? styles.infoError : ''}`}
            >
              <FiAlertCircle />

              <div>
                <strong>
                  {isCooldown
                    ? 'Изменение имени временно недоступно'
                    : 'Ограничение на изменение'}
                </strong>

                <span>
                  {isCooldown
                    ? 'Вы уже меняли игровое имя недавно. Повторная смена будет доступна через 30 дней.'
                    : 'Игровое имя можно изменять один раз в 30 дней.'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
              disabled={updateNameMutation.isPending}
            >
              Отмена
            </button>

            <button
              type="submit"
              className={styles.submit}
              disabled={!isValid || updateNameMutation.isPending || isCooldown}
            >
              {updateNameMutation.isPending
                ? 'Изменение...'
                : isCooldown
                  ? 'Изменение недоступно'
                  : 'Изменить имя'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
