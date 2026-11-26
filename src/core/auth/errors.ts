import { ElysiaError } from '@elysiac/sdk';

// Ключ: ElysiaError.code. Коды backend в SDK не перечислены, поэтому
// сюда добавляйте реальные коды по мере того, как увидите их в консоли.
const MESSAGES: Record<string, string> = {
  NETWORK_ERROR:
    'Нет соединения с сервером. Проверьте интернет и попробуйте ещё раз.',

  USER_NOT_FOUND: 'Неверный логин или пароль',
  INVALID_PASSWORD: 'Неверный логин или пароль',
};

const GENERIC = 'Не удалось выполнить запрос. Попробуйте ещё раз.';

type Options = {
  /** Что показать при статусе 401 в этом конкретном месте (например, на логине). */
  unauthorized?: string;
};

export function getErrorMessage(error: unknown, options: Options = {}): string {
  if (error instanceof ElysiaError) {
    const mapped = MESSAGES[error.code];
    if (mapped) return mapped;

    if (error.status === 401 && options.unauthorized) {
      return options.unauthorized;
    }
    if (error.status === 429) {
      return 'Слишком много попыток. Подождите немного и повторите.';
    }
    if (error.status && error.status >= 500) {
      return 'Сервер временно недоступен. Попробуйте позже.';
    }
  }

  // Сообщение backend пользователю не показываем: его язык и формулировки
  // мы не контролируем. Неизвестные случаи видны в консоли.
  return GENERIC;
}

/** Пишет детали в консоль и возвращает текст для UI. */
export function handleAuthError(error: unknown, options?: Options): string {
  if (error instanceof ElysiaError) {
    console.error('[auth]', {
      code: error.code,
      status: error.status,
      traceId: error.traceId,
      message: error.message,
      ...(process.env.NODE_ENV !== 'production' && { details: error.details }),
    });
  } else {
    console.error('[auth]', error);
  }

  return getErrorMessage(error, options);
}
