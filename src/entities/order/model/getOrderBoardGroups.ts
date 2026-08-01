import type { Order } from '@brewline/api-types';

export type OrderBoardGroups = {
  newOrders: Order[];
  preparingOrders: Order[];
  readyOrders: Order[];
};

/**
 * Приводит REST- или SSE-снапшот к данным трёх секций доски.
 *
 * Сортировка здесь, а не в виджете: порядок FIFO — правило представления
 * очереди, которое одинаково понадобится REST-срезу и будущим SSE-обновлениям.
 */
export function getOrderBoardGroups(orders: Order[]): OrderBoardGroups {
  const orderedOrders = [...orders].sort(
    (firstOrder, secondOrder) =>
      new Date(firstOrder.createdAt).getTime() - new Date(secondOrder.createdAt).getTime(),
  );

  return {
    newOrders: orderedOrders.filter((order) => order.status === 'new'),
    preparingOrders: orderedOrders.filter((order) => order.status === 'preparing'),
    readyOrders: orderedOrders.filter((order) => order.status === 'ready'),
  };
}
