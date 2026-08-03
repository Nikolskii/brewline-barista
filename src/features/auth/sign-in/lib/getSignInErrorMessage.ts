import { ApiError } from '@/shared/api';

/** Переводит техническую ошибку login в текст, понятный бариста. */
export function getSignInErrorMessage(error: unknown): string | null {
  if (error instanceof ApiError && error.status === 401) {
    return 'Неверный пароль смены. Попробуйте ещё раз.';
  }

  return error ? 'Не удалось войти. Проверьте соединение с сервером.' : null;
}
