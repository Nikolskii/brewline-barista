import type { components } from '@brewline/api-types';

import { apiGet } from '@/shared/api';

type BaristaSession = components['schemas']['Session'];

/** Проверяет, есть ли у браузера действующая cookie-сессия бариста. */
export function getBaristaSession(): Promise<BaristaSession> {
  return apiGet<BaristaSession>('/auth/session');
}
