/** Показывает время ожидания, которое можно честно вычислить из createdAt. */
export function formatOrderWait(createdAt: string, now = new Date()): string {
  const elapsedMilliseconds = Math.max(0, now.getTime() - new Date(createdAt).getTime());
  const elapsedMinutes = Math.floor(elapsedMilliseconds / 60_000);

  return elapsedMinutes === 0 ? 'меньше минуты' : `${elapsedMinutes} мин`;
}
