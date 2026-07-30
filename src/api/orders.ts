import type { Order } from '@brewline/api-types';

import { apiGet } from './client';

/**
 * Снапшот активной очереди (GET /orders).
 *
 * Бариста видит ровно тот же снапшот, что и табло в зале: `new` + `preparing`
 * плюс свежие `ready`. Отдельной выборки для бариста на backend нет — очередь
 * одна, и расходиться двум представлениям одной очереди незачем.
 */
export function getOrdersSnapshot(): Promise<Order[]> {
  return apiGet<Order[]>('/orders');
}
