import { useEffect, useState } from 'react';

import { formatCurrentTime } from '../lib/formatCurrentTime';
import styles from './WorkspaceHeader.module.scss';

/**
 * Верхняя панель рабочего места. Реальный статус соединения появится вместе с
 * SSE; до этого индикатор показывает визуальное состояние из макета.
 */
export function WorkspaceHeader() {
  const [currentTime, setCurrentTime] = useState(() => formatCurrentTime(new Date()));

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(formatCurrentTime(new Date()));
    }, 60_000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.brand}>Brewline</h1>
      <div className={styles.meta}>
        <div aria-label="Соединение активно" className={styles.connection}>
          <span aria-hidden="true" className={styles.connectionDot} />
          <span className={styles.connectionLabel}>На связи</span>
        </div>
        <time className={styles.time}>{currentTime}</time>
      </div>
    </header>
  );
}
