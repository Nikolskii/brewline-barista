import { useEffect, useState } from 'react';

import type { OrderQueueConnection } from '@/entities/order';

import { formatCurrentTime } from '../../lib/formatCurrentTime';
import { getConnectionLabel } from '../../lib/getConnectionLabel';
import styles from './WorkspaceHeader.module.scss';

type WorkspaceHeaderProps = {
  connection: OrderQueueConnection;
};

/** Верхняя панель рабочего места с фактическим состоянием SSE-соединения. */
export function WorkspaceHeader({ connection }: WorkspaceHeaderProps) {
  const [currentTime, setCurrentTime] = useState(() => formatCurrentTime(new Date()));
  const connectionLabel = getConnectionLabel(connection);

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
        <div
          aria-label={connectionLabel}
          className={`${styles.connection} ${styles[connection.status]}`}
        >
          <span aria-hidden="true" className={styles.connectionDot} />
          <span className={styles.connectionLabel}>{connectionLabel}</span>
        </div>
        <time className={styles.time}>{currentTime}</time>
      </div>
    </header>
  );
}
