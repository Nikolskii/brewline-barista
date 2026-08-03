import { SignInForm } from '@/features/auth/sign-in';

import styles from './LoginPage.module.scss';

type LoginPageProps =
  { state: 'error'; onRetry: () => void } | { state: 'sign-in'; onSignedIn: () => void };

/** Полноэкранный сценарий входа и проверки существующей сессии бариста. */
export function LoginPage(props: LoginPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.brand}>
          <h1 className={styles.title}>Brewline</h1>
        </header>

        {props.state === 'error' && (
          <div className={styles.status} role="alert">
            <p>Не удалось проверить сессию. Проверьте соединение с сервером.</p>
            <button className={styles.retry} onClick={props.onRetry} type="button">
              Повторить
            </button>
          </div>
        )}
        {props.state === 'sign-in' && <SignInForm onSignedIn={props.onSignedIn} />}
      </div>
    </main>
  );
}
