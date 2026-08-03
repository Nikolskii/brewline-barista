import { useMutation } from '@tanstack/react-query';

import { signInWithShiftPassword } from '../api/signIn';

export function useSignIn() {
  return useMutation({ mutationFn: signInWithShiftPassword });
}
