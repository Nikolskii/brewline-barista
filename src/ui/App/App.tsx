import { useOrderQueue } from '@/useOrderQueue';

import styles from './App.module.scss';

/**
 * Временная страница: подтверждает, что связка «типы контракта → запрос →
 * данные из Mongo» работает end-to-end. Вёрстка появится по макету отдельной
 * задачей, поэтому здесь намеренно голый список без оформления карточек.
 */
function App() {
  const { orders, isPending, isError, error } = useOrderQueue();

  return (
    <div className={styles.app}>
      <header className={styles.header}>Brewline · Бариста</header>

      <main className={styles.queue}>
        {isPending && <p className={styles.state}>Загрузка очереди…</p>}

        {isError && (
          <p className={styles.state}>
            Не удалось загрузить очередь: {error instanceof Error ? error.message : 'ошибка сети'}
          </p>
        )}

        {!isPending && !isError && orders.length === 0 && (
          <p className={styles.state}>Очередь пуста</p>
        )}

        {orders.length > 0 && (
          <ul className={styles.list}>
            {orders.map((order) => (
              <li key={order.orderId} className={styles.item}>
                <span className={styles.number}>№{order.number}</span>
                <span className={styles.items}>
                  {order.items.map((item) => `${item.name} ×${item.quantity}`).join(', ')}
                </span>
                <span className={styles.status}>{order.status}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
