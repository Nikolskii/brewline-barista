import styles from './AdvanceOrderStatusButton.module.scss';

type AdvanceOrderStatusButtonProps = {
  label: string;
  onClick?: () => void;
  targetStatus?: 'preparing' | 'ready';
};

/** Визуальная часть действия; реальная mutation появится отдельным шагом. */
export function AdvanceOrderStatusButton({
  label,
  onClick,
  targetStatus = 'ready',
}: AdvanceOrderStatusButtonProps) {
  return (
    <button
      className={`${styles.button} ${targetStatus === 'preparing' ? styles.preparing : ''}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
