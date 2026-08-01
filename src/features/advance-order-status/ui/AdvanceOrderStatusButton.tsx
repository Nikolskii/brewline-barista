import styles from './AdvanceOrderStatusButton.module.scss';

type AdvanceOrderStatusButtonProps = {
  label: string;
  onClick?: () => void;
};

/** Визуальная часть действия; реальная mutation появится отдельным шагом. */
export function AdvanceOrderStatusButton({ label, onClick }: AdvanceOrderStatusButtonProps) {
  return (
    <button className={styles.button} onClick={onClick} type="button">
      {label}
    </button>
  );
}
