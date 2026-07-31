import { useQuery } from '@tanstack/react-query';

import { getOrdersSnapshot } from '../api/orders';

export const ordersQueryKey = ['orders'] as const;

/**
 * Очередь заказов для интерфейса бариста.
 *
 * Пока только первичный снапшот по REST. Живое обновление через SSE появится
 * отдельной задачей — там снапшоты из потока будут класться прямо в кэш Query.
 */
export function useOrderQueue() {
  const query = useQuery({
    queryKey: ordersQueryKey,
    queryFn: getOrdersSnapshot,
  });

  return {
    orders: query.data ?? [],
    // Именно isPending, а не isLoading: isLoading гаснет в паузах между
    // повторными попытками, и тогда «сервер недоступен» неотличимо от «очередь
    // пуста» — для бариста это противоположные ситуации.
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
