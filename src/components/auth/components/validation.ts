export const authValidation = {
  email: {
    required: 'Введите email',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Введите корректный email',
    },
  },

  login: {
    required: 'Введите логин',
    minLength: {
      value: 3,
      message: 'Логин минимум 3 символа',
    },
    maxLength: {
      value: 16,
      message: 'Логин максимум 16 символов',
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Только латинские буквы, цифры и символ _',
    },
  },

  password: {
    required: 'Введите пароль',
    minLength: {
      value: 6,
      message: 'Пароль минимум 6 символов',
    },
  },
} as const;
