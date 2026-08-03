import styles from './AppLoader.module.scss';

/** Нейтральный экран на время стартовой проверки cookie-сессии. */
export function AppLoader() {
  return (
    <main aria-busy="true" className={styles.loader}>
      <div className={styles.content}>
        <h1 className={styles.brand}>Brewline</h1>
        <div aria-hidden="true" className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
        <p className={styles.label}>Восстанавливаем смену…</p>
      </div>
    </main>
  );
}
