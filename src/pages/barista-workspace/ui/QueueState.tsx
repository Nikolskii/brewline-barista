import styles from './QueueState.module.scss';

type QueueStateProps =
  { kind: 'loading' } | { kind: 'empty' } | { kind: 'error'; onRetry: () => void };

export function QueueState(props: QueueStateProps) {
  if (props.kind === 'loading') {
    return (
      <section aria-label="Загрузка заказов" className={styles.loading}>
        <span className={`${styles.skeleton} ${styles.skeletonHeading}`} />
        <span className={`${styles.skeleton} ${styles.skeletonCard}`} />
        <span className={`${styles.skeleton} ${styles.skeletonCard}`} />
        <span className={`${styles.skeleton} ${styles.skeletonShortCard}`} />
        <span className={`${styles.skeleton} ${styles.skeletonShortCard}`} />
        <span className={styles.loadingLabel}>Загружаем заказы…</span>
      </section>
    );
  }

  if (props.kind === 'error') {
    return (
      <section aria-labelledby="orders-error-title" className={styles.message}>
        <span aria-hidden="true" className={styles.errorIcon}>
          !
        </span>
        <h1 className={styles.title} id="orders-error-title">
          Сервер не ответил
        </h1>
        <p className={styles.description}>
          Заказы не загрузились. Принимайте гостей по номерам на чеках, пока связь не вернётся.
        </p>
        <button className={styles.retryButton} onClick={props.onRetry} type="button">
          Повторить
        </button>
      </section>
    );
  }

  return (
    <section aria-labelledby="orders-empty-title" className={styles.message}>
      <span aria-hidden="true" className={styles.emptyDot} />
      <h1 className={styles.title} id="orders-empty-title">
        Заказов нет
      </h1>
      <p className={styles.description}>
        Новый заказ появится здесь сам. Экран обновляется без вашего участия.
      </p>
    </section>
  );
}
