import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { ordersQueryKey } from '@/entities/order';
import { ApiError } from '@/shared/api';

import { advanceOrderStatus } from '../api/advanceOrderStatus';

type UseAdvanceOrderStatusOptions = {
  orderId: string;
  targetStatus: 'preparing' | 'ready';
};

/**
 * PATCH не меняет Query-кэш. После HTTP-успеха интерфейс ждёт SSE-снапшот —
 * только он подтверждает новый статус для всех потребителей очереди.
 */
export function useAdvanceOrderStatus({ orderId, targetStatus }: UseAdvanceOrderStatusOptions) {
  const queryClient = useQueryClient();
  const [awaitingOrderId, setAwaitingOrderId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => advanceOrderStatus(orderId, targetStatus),
    onSuccess: () => {
      setAwaitingOrderId(orderId);
    },
    onError: (error) => {
      if (isConflict(error)) {
        void queryClient.invalidateQueries({ queryKey: ordersQueryKey });
      }
    },
  });

  return {
    error: mutation.error,
    isAwaitingSnapshot: awaitingOrderId === orderId,
    isPending: mutation.isPending,
    advance: () => mutation.mutate(),
  };
}

function isConflict(error: unknown): boolean {
  return error instanceof ApiError && error.status === 409;
}
