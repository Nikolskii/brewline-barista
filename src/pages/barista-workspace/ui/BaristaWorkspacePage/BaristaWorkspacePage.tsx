import { useOrderQueue } from '@/entities/order';
import { OrderBoard } from '@/widgets/order-board';
import { WorkspaceHeader } from '@/widgets/workspace-header';

import { QueueState } from '../QueueState/QueueState';
import styles from './BaristaWorkspacePage.module.scss';

type BaristaWorkspacePageProps = {
  onSignedOut: () => void;
};

export function BaristaWorkspacePage({ onSignedOut }: BaristaWorkspacePageProps) {
  const { connection, isError, isPending, orders, refetch } = useOrderQueue();

  return (
    <main className={styles.page}>
      <WorkspaceHeader connection={connection} onSignedOut={onSignedOut} />
      {isPending && <QueueState kind="loading" />}
      {isError && <QueueState kind="error" onRetry={() => void refetch()} />}
      {!isPending && !isError && orders.length === 0 && <QueueState kind="empty" />}
      {!isPending && !isError && orders.length > 0 && <OrderBoard orders={orders} />}
    </main>
  );
}
