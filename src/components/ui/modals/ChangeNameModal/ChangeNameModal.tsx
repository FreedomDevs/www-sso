'use client';

import { useForm } from 'react-hook-form';
import { FiX, FiEdit3, FiAlertCircle } from 'react-icons/fi';

import styles from './ChangeNameModal.module.scss';

interface ChangeNameModalProps {
  currentName: string;
  onClose: () => void;
}

interface ChangeNameForm {
  name: string;
}

export function ChangeNameModal({
  currentName,
  onClose,
}: ChangeNameModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ChangeNameForm>({
    mode: 'onChange',
    defaultValues: {
      name: currentName,
    },
  });

  const name = watch('name');

  const onSubmit = async (data: ChangeNameForm) => {
    console.log(data.name);
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
            <p>Выберите новое игровое имя для ElysiaID.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.content}>
            <div className={styles.field}>
              <label htmlFor="name">Новое имя</label>

              <input
                id="name"
                autoFocus
                maxLength={16}
                placeholder="Введите новое имя"
                {...register('name', {
                  required: 'Введите новое имя',
                  minLength: {
                    value: 3,
                    message: 'Имя должно содержать минимум 3 символа',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Имя не может быть длиннее 16 символов',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message:
                      'Можно использовать только латинские буквы, цифры и _',
                  },
                  validate: (value) =>
                    value !== currentName ||
                    'Новое имя должно отличаться от текущего',
                })}
              />

              <div className={styles.fieldFooter}>
                <span className={errors.name ? styles.error : ''}>
                  {errors.name?.message ?? 'От 3 до 16 символов'}
                </span>

                <span>{name?.length ?? 0}/16</span>
              </div>
            </div>

            <div className={styles.info}>
              <FiAlertCircle />

              <span>Игровое имя можно изменять один раз в 30 дней.</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </button>

            <button
              type="submit"
              className={styles.submit}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Изменение...' : 'Изменить имя'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
