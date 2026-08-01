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

const previewNewOrders = [
  {
    order: {
      orderId: 'preview-216',
      number: 216,
      items: [
        { name: 'Капучино 300', quantity: 2 },
        { name: 'Американо', quantity: 1 },
      ],
      source: 'cashier',
      status: 'new',
      createdAt: '2026-08-01T09:41:00.000Z',
    },
    wait: '6 мин',
  },
  {
    order: {
      orderId: 'preview-217',
      number: 217,
      items: [{ name: 'Латте ванильный', quantity: 1 }],
      source: 'cashier',
      status: 'new',
      createdAt: '2026-08-01T09:42:00.000Z',
    },
    wait: '4 мин',
  },
  {
    order: {
      orderId: 'preview-218',
      number: 218,
      items: [
        { name: 'Матча латте', quantity: 2 },
        { name: 'Чай облепиха', quantity: 1 },
      ],
      source: 'cashier',
      status: 'new',
      createdAt: '2026-08-01T09:43:00.000Z',
    },
    wait: '3 мин',
  },
  {
    order: {
      orderId: 'preview-219',
      number: 219,
      items: [{ name: 'Эспрессо', quantity: 2 }],
      source: 'cashier',
      status: 'new',
      createdAt: '2026-08-01T09:44:00.000Z',
    },
    wait: '2 мин',
  },
] satisfies { order: Order; wait: string }[];

const previewReadyOrders = [
  {
    orderId: 'preview-209',
    number: 209,
    items: [{ name: 'Американо', quantity: 1 }],
    source: 'cashier',
    status: 'ready',
    createdAt: '2026-08-01T09:34:00.000Z',
  },
  {
    orderId: 'preview-210',
    number: 210,
    items: [{ name: 'Капучино 300', quantity: 2 }],
    source: 'cashier',
    status: 'ready',
    createdAt: '2026-08-01T09:35:00.000Z',
  },
  {
    orderId: 'preview-211',
    number: 211,
    items: [{ name: 'Чай жасмин', quantity: 1 }],
    source: 'cashier',
    status: 'ready',
    createdAt: '2026-08-01T09:36:00.000Z',
  },
  {
    orderId: 'preview-212',
    number: 212,
    items: [
      { name: 'Латте', quantity: 1 },
      { name: 'Тарт', quantity: 1 },
    ],
    source: 'cashier',
    status: 'ready',
    createdAt: '2026-08-01T09:37:00.000Z',
  },
] satisfies Order[];

/**
 * Доска очереди. Пока показывает данные preview; REST-снапшот заменит их
 * отдельным шагом, не меняя границы UI-компонентов.
 */
export function OrderBoard() {
  const [nextOrder, ...queueTail] = previewNewOrders;

  return (
    <div className={styles.board}>
      <section aria-labelledby="preparing-orders-heading" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span aria-hidden="true" className={styles.preparingDot} />
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
      </section>

      <section aria-labelledby="queue-heading" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span aria-hidden="true" className={styles.queueDot} />
          <h2 className={styles.sectionTitle} id="queue-heading">
            Очередь
          </h2>
          <span className={styles.sectionCount}>{previewNewOrders.length}</span>
        </div>
        <article className={styles.nextOrder}>
          <div className={styles.nextOrderHeadline}>
            <span className={styles.nextOrderNumber}>{nextOrder.order.number}</span>
            <span className={styles.nextOrderBadge}>Следующий</span>
            <span className={styles.nextOrderWait}>ждёт {nextOrder.wait}</span>
          </div>
          <ul className={styles.nextOrderItems}>
            {nextOrder.order.items.map((item) => (
              <li className={styles.nextOrderItem} key={item.name}>
                {item.name} <span className={styles.quantity}>×{item.quantity}</span>
              </li>
            ))}
          </ul>
          <AdvanceOrderStatusButton label="Взять в работу" targetStatus="preparing" />
        </article>
        <div className={styles.queueTail}>
          {queueTail.map(({ order, wait }) => (
            <div className={styles.queueTailItem} key={order.orderId}>
              <span className={styles.queueTailNumber}>{order.number}</span>
              <span className={styles.queueTailSummary}>
                {order.items.map((item) => `${item.name} ×${item.quantity}`).join(' · ')}
              </span>
              <span className={styles.queueTailWait}>{wait}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="ready-orders-heading"
        className={`${styles.section} ${styles.readySection}`}
      >
        <div className={styles.sectionHeader}>
          <span aria-hidden="true" className={styles.readyDot} />
          <h2 className={styles.readyTitle} id="ready-orders-heading">
            Готовы
          </h2>
          <span className={styles.readyCount}>{previewReadyOrders.length}</span>
        </div>
        <div className={styles.readyOrders}>
          {previewReadyOrders.map((order) => (
            <div className={styles.readyOrder} key={order.orderId}>
              <span className={styles.readyOrderNumber}>{order.number}</span>
              <span className={styles.readyOrderSummary}>
                {order.items.map((item) => `${item.name} ×${item.quantity}`).join(' · ')}
              </span>
            </div>
          ))}
        </div>
        <span className={styles.readyFooter}>Исчезают сами через 5 минут</span>
      </section>
    </div>
  );
}
