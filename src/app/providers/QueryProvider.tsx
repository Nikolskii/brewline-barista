import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

import { baristaSessionQueryKey } from '@/features/auth/session';
import { ApiError } from '@/shared/api';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: handleMutationError,
  }),
});

function handleMutationError(error: unknown) {
  // PATCH сообщает, что cookie истекла или удалена. App читает этот кэш и
  // сразу возвращает к login; feature смены статуса о feature auth не знает.
  if (error instanceof ApiError && error.status === 401) {
    queryClient.setQueryData(baristaSessionQueryKey, { authenticated: false });
  }
}

/** Единственное приложение-владение Query-кэшем и его React-провайдером. */
export function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
