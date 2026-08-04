import type { Order, UpdateOrderStatusRequest } from '@brewline/api-types';

import { apiPatch } from '@/shared/api';

type AdvanceOrderStatus = 'preparing' | 'ready';

/** Переводит заказ только вперёд по автомату статусов на backend. */
export function advanceOrderStatus(orderId: string, status: AdvanceOrderStatus): Promise<Order> {
  const request: UpdateOrderStatusRequest = { status };

  return apiPatch<Order>(`/orders/${orderId}/status`, request);
}
