import { type Order, OrderCard } from '@/entities/order';
import { AdvanceOrderStatusButton } from '@/features/advance-order-status';

import styles from './OrderBoard.module.scss';

const previewPreparingOrders = [
  {
    orderId: 'preview-214',
    number: 214,
    items: [
      { name: 'Флэт уайт', quantity: 1 },
      { name: 'Круассан миндальный', quantity: 2 },
    ],
    source: 'cashier',
    status: 'preparing',
    createdAt: '2026-08-01T09:39:00.000Z',
  },
  {
    orderId: 'preview-215',
    number: 215,
    items: [{ name: 'Раф кокосовый', quantity: 2 }],
    source: 'cashier',
    status: 'preparing',
    createdAt: '2026-08-01T09:40:00.000Z',
  },
] satisfies Order[];

/**
 * Доска очереди. Пока показывает данные preview; REST-снапшот заменит их
 * отдельным шагом, не меняя границы UI-компонентов.
 */
export function OrderBoard() {
  return (
    <section aria-labelledby="preparing-orders-heading" className={styles.board}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span aria-hidden="true" className={styles.sectionDot} />
          <h2 className={styles.sectionTitle} id="preparing-orders-heading">
            В работе
          </h2>
          <span className={styles.sectionCount}>{previewPreparingOrders.length}</span>
        </div>
        <div className={styles.orders}>
          {previewPreparingOrders.map((order) => (
            <OrderCard
              action={<AdvanceOrderStatusButton label="Готов" />}
              key={order.orderId}
              meta="В работе"
              order={order}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
