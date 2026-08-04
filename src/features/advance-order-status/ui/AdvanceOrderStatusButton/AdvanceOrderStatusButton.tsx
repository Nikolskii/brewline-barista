import { getAdvanceOrderErrorMessage } from '../../lib/getAdvanceOrderErrorMessage';
import { useAdvanceOrderStatus } from '../../model/useAdvanceOrderStatus';
import styles from './AdvanceOrderStatusButton.module.scss';

type AdvanceOrderStatusButtonProps = {
  label: string;
  orderId: string;
  targetStatus?: 'preparing' | 'ready';
};

/** Действие бариста, которое меняет статус только после подтверждения SSE-снапшотом. */
export function AdvanceOrderStatusButton({
  label,
  orderId,
  targetStatus = 'ready',
}: AdvanceOrderStatusButtonProps) {
  const status = useAdvanceOrderStatus({ orderId, targetStatus });
  const errorMessage = getAdvanceOrderErrorMessage(status.error);
  const isDisabled = status.isPending || status.isAwaitingSnapshot;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${targetStatus === 'preparing' ? styles.preparing : ''}`}
        disabled={isDisabled}
        onClick={status.advance}
        type="button"
      >
        {status.isPending ? 'Обновляем…' : status.isAwaitingSnapshot ? 'Ждём очередь…' : label}
      </button>
      {errorMessage && (
        <span className={styles.error} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
