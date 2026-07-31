import { SignInForm } from '@/features/auth/sign-in';

import styles from './LoginPage.module.scss';

export function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.brand}>
          <h1 className={styles.title}>Brewline</h1>
        </header>

        <SignInForm />
      </div>
    </main>
  );
}
