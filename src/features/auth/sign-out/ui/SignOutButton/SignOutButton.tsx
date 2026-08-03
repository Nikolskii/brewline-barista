import { useSignOut } from '../../model/useSignOut';
import styles from './SignOutButton.module.scss';

type SignOutButtonProps = {
  onSignedOut: () => void;
};

/** Неакцентное действие для общего устройства: завершает смену текущего бариста. */
export function SignOutButton({ onSignedOut }: SignOutButtonProps) {
  const signOut = useSignOut();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={signOut.isPending}
        onClick={() => signOut.mutate(undefined, { onSuccess: onSignedOut })}
        type="button"
      >
        {signOut.isPending ? 'Выходим…' : 'Выйти'}
      </button>
      {signOut.isError && (
        <span className={styles.error} role="alert">
          Не удалось выйти
        </span>
      )}
    </div>
  );
}
