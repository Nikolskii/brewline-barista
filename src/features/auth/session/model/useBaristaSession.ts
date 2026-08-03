import { useQuery } from '@tanstack/react-query';

import { getBaristaSession } from '../api/getBaristaSession';

export const baristaSessionQueryKey = ['barista-session'] as const;

/**
 * Единственная проверка сессии при старте приложения. Повторять её автоматически
 * не нужно: при будущем PATCH код 401 будет явно возвращать бариста на login.
 */
export function useBaristaSession() {
  return useQuery({
    queryKey: baristaSessionQueryKey,
    queryFn: getBaristaSession,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
