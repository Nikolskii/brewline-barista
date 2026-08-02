import type { Order } from '@brewline/api-types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { API_URL } from '@/shared/api';

import { ordersQueryKey } from './orderQuery';
import type { OrderQueueConnection } from './orderQueueConnection';

type UseOrderQueueStreamOptions = {
  dataUpdatedAt: number;
  enabled: boolean;
};

function toDate(timestamp: number): Date | null {
  return timestamp === 0 ? null : new Date(timestamp);
}

/**
 * Подписывает бариста на SSE-снапшоты очереди и обновляет тот же Query-кэш,
 * который первоначально наполняет GET /orders.
 */
export function useOrderQueueStream({
  dataUpdatedAt,
  enabled,
}: UseOrderQueueStreamOptions): OrderQueueConnection {
  const queryClient = useQueryClient();
  const latestDataUpdatedAt = useRef(dataUpdatedAt);
  const [connection, setConnection] = useState<OrderQueueConnection>({
    status: 'connecting',
    lastUpdatedAt: toDate(dataUpdatedAt),
  });

  useEffect(() => {
    latestDataUpdatedAt.current = dataUpdatedAt;
  }, [dataUpdatedAt]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setConnection({
      status: 'connecting',
      lastUpdatedAt: toDate(latestDataUpdatedAt.current),
    });

    const stream = new EventSource(`${API_URL}/orders/stream`);

    const handleSnapshot = (event: Event) => {
      try {
        const snapshot = JSON.parse((event as MessageEvent<string>).data) as unknown;

        if (!Array.isArray(snapshot)) {
          return;
        }

        const receivedAt = new Date();
        queryClient.setQueryData<Order[]>(ordersQueryKey, snapshot);
        setConnection({ status: 'live', lastUpdatedAt: receivedAt });
      } catch {
        // Невалидный payload не должен стирать последнюю известную очередь.
      }
    };

    stream.onopen = () => {
      setConnection((currentConnection) => ({
        ...currentConnection,
        status: 'live',
      }));
    };
    stream.onerror = () => {
      // EventSource сам повторно подключается; до нового snapshot сохраняем
      // последнюю очередь, но явно показываем, что она может устареть.
      setConnection((currentConnection) => ({
        ...currentConnection,
        status: 'reconnecting',
      }));
    };
    stream.addEventListener('snapshot', handleSnapshot);

    return () => {
      stream.removeEventListener('snapshot', handleSnapshot);
      stream.close();
    };
  }, [enabled, queryClient]);

  return connection;
}
