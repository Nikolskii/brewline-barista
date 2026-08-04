import { ApiError } from '@/shared/api';

/** Переводит отказ backend в короткое объяснение, полезное в процессе работы. */
export function getAdvanceOrderErrorMessage(error: unknown): string | null {
  if (error instanceof ApiError && error.status === 409) {
    return 'Заказ уже изменил другой бариста. Очередь синхронизирована.';
  }

  return error ? 'Не удалось обновить заказ. Попробуйте ещё раз.' : null;
}
