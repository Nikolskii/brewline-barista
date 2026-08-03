import type { components } from '@brewline/api-types';

import { apiPost } from '@/shared/api';

type LoginRequest = components['schemas']['LoginRequest'];
type BaristaSession = components['schemas']['Session'];

/** Открывает сессию: cookie ставит браузеру backend, пароль в приложении не хранится. */
export function signInWithShiftPassword(password: string): Promise<BaristaSession> {
  const request: LoginRequest = { password };

  return apiPost<BaristaSession>('/auth/login', request);
}
