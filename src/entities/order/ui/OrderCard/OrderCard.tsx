import type { Order } from '@brewline/api-types';
import type { ReactNode } from 'react';

import styles from './OrderCard.module.scss';

type OrderCardProps = {
  action: ReactNode;
  meta: string;
  order: Order;
};

export function OrderCard({ action, meta, order }: OrderCardProps) {
  return (
    <article className={`${styles.card} ${styles[order.status]}`}>
      <div className={styles.details}>
        <div className={styles.headline}>
          <span className={styles.number}>{order.number}</span>
          <span className={styles.meta}>{meta}</span>
        </div>
        <ul className={styles.items}>
          {order.items.map((item) => (
            <li className={styles.item} key={item.name}>
              {item.name} <span className={styles.quantity}>×{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
      {action}
    </article>
  );
}
