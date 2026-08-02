import type { OrderQueueConnection } from '@/entities/order';

import { formatCurrentTime } from './formatCurrentTime';

export function getConnectionLabel(connection: OrderQueueConnection): string {
  if (connection.status === 'connecting') {
    return 'Подключаемся…';
  }

  if (connection.status === 'reconnecting') {
    return connection.lastUpdatedAt
      ? `Нет обновлений · данные на ${formatCurrentTime(connection.lastUpdatedAt)}`
      : 'Нет обновлений';
  }

  return 'На связи';
}
