import { apiPost } from '@/shared/api';

/** Гасит server-side сессию и удаляет httpOnly-cookie через backend. */
export function signOut(): Promise<void> {
  return apiPost<void>('/auth/logout', {});
}
