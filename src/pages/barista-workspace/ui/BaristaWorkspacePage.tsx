import { useOrderQueue } from '@/entities/order';
import { OrderBoard } from '@/widgets/order-board';
import { WorkspaceHeader } from '@/widgets/workspace-header';

import styles from './BaristaWorkspacePage.module.scss';
import { QueueState } from './QueueState';

export function BaristaWorkspacePage() {
  const { isError, isPending, orders, refetch } = useOrderQueue();

  return (
    <main className={styles.page}>
      <WorkspaceHeader />
      {isPending && <QueueState kind="loading" />}
      {isError && <QueueState kind="error" onRetry={() => void refetch()} />}
      {!isPending && !isError && orders.length === 0 && <QueueState kind="empty" />}
      {!isPending && !isError && orders.length > 0 && <OrderBoard orders={orders} />}
    </main>
  );
}
