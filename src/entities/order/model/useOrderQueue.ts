import { useQuery } from '@tanstack/react-query';

import { getOrdersSnapshot } from '../api/orders';
import { ordersQueryKey } from './orderQuery';
import { useOrderQueueStream } from './useOrderQueueStream';

export { ordersQueryKey } from './orderQuery';

/**
 * Очередь заказов для интерфейса бариста.
 *
 * REST даёт начальный снапшот, а SSE обновляет тот же Query-кэш.
 */
export function useOrderQueue() {
  const query = useQuery({
    queryKey: ordersQueryKey,
    queryFn: getOrdersSnapshot,
    refetchOnWindowFocus: false,
  });

  const connection = useOrderQueueStream({
    dataUpdatedAt: query.dataUpdatedAt,
    enabled: query.isSuccess,
  });

  return {
    connection,
    orders: query.data ?? [],
    // Именно isPending, а не isLoading: isLoading гаснет в паузах между
    // повторными попытками, и тогда «сервер недоступен» неотличимо от «очередь
    // пуста» — для бариста это противоположные ситуации.
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
