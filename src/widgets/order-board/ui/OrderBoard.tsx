import { formatOrderWait, getOrderBoardGroups, type Order, OrderCard } from '@/entities/order';
import { AdvanceOrderStatusButton } from '@/features/advance-order-status';

import styles from './OrderBoard.module.scss';

type OrderBoardProps = {
  orders: Order[];
};

/** Представляет снапшот очереди в трёх рабочих секциях бариста. */
export function OrderBoard({ orders }: OrderBoardProps) {
  const { newOrders, preparingOrders, readyOrders } = getOrderBoardGroups(orders);
  const [nextOrder, ...queueTail] = newOrders;

  return (
    <div className={styles.board}>
      <section aria-labelledby="preparing-orders-heading" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span aria-hidden="true" className={styles.preparingDot} />
          <h2 className={styles.sectionTitle} id="preparing-orders-heading">
            В работе
          </h2>
          <span className={styles.sectionCount}>{preparingOrders.length}</span>
        </div>
        <div className={styles.orders}>
          {preparingOrders.map((order) => (
            <OrderCard
              action={<AdvanceOrderStatusButton label="Готов" />}
              key={order.orderId}
              meta="В работе"
              order={order}
            />
          ))}
          {preparingOrders.length === 0 && (
            <p className={styles.sectionEmpty}>
              Ничего не готовится — возьмите верхний заказ из очереди.
            </p>
          )}
        </div>
      </section>

      <section
        aria-labelledby="queue-heading"
        className={`${styles.section} ${styles.queueSection}`}
      >
        <div className={styles.sectionHeader}>
          <span aria-hidden="true" className={styles.queueDot} />
          <h2 className={styles.sectionTitle} id="queue-heading">
            Очередь
          </h2>
          <span className={styles.sectionCount}>{newOrders.length}</span>
        </div>
        {nextOrder ? (
          <article className={styles.nextOrder}>
            <div className={styles.nextOrderHeadline}>
              <span className={styles.nextOrderNumber}>{nextOrder.number}</span>
              <span className={styles.nextOrderBadge}>Следующий</span>
              <span className={styles.nextOrderWait}>
                ждёт {formatOrderWait(nextOrder.createdAt)}
              </span>
            </div>
            <ul className={styles.nextOrderItems}>
              {nextOrder.items.map((item) => (
                <li className={styles.nextOrderItem} key={item.name}>
                  {item.name} <span className={styles.quantity}>×{item.quantity}</span>
                </li>
              ))}
            </ul>
            <AdvanceOrderStatusButton label="Взять в работу" targetStatus="preparing" />
          </article>
        ) : (
          <p className={styles.sectionEmpty}>Очередь пуста.</p>
        )}
        <div className={styles.queueTail}>
          {queueTail.map((order) => (
            <div className={styles.queueTailItem} key={order.orderId}>
              <span className={styles.queueTailNumber}>{order.number}</span>
              <span className={styles.queueTailSummary}>
                {order.items.map((item) => `${item.name} ×${item.quantity}`).join(' · ')}
              </span>
              <span className={styles.queueTailWait}>{formatOrderWait(order.createdAt)}</span>
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
          <span className={styles.readyCount}>{readyOrders.length}</span>
        </div>
        <div className={styles.readyOrders}>
          {readyOrders.map((order) => (
            <div className={styles.readyOrder} key={order.orderId}>
              <span className={styles.readyOrderNumber}>{order.number}</span>
              <span className={styles.readyOrderSummary}>
                {order.items.map((item) => `${item.name} ×${item.quantity}`).join(' · ')}
              </span>
            </div>
          ))}
        </div>
        <span className={styles.readyFooter}>Исчезают сами через 5 минут</span>
        <span className={styles.readyPassive}>без действий</span>
      </section>
    </div>
  );
}
