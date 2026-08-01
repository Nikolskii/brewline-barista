import { WorkspaceHeader } from '@/widgets/workspace-header';

import styles from './BaristaWorkspacePage.module.scss';

export function BaristaWorkspacePage() {
  return (
    <main className={styles.page}>
      <WorkspaceHeader />
    </main>
  );
}
