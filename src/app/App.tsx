import { useBaristaSession } from '@/features/auth/session';
import { BaristaWorkspacePage } from '@/pages/barista-workspace';
import { LoginPage } from '@/pages/login';

import { AppLoader } from './ui/AppLoader/AppLoader';

/** Корневая развилка: сначала проверяем сессию, затем показываем login или рабочее место. */
function App() {
  const session = useBaristaSession();

  if (session.isPending) {
    return <AppLoader />;
  }

  if (session.isError) {
    return <LoginPage onRetry={() => void session.refetch()} state="error" />;
  }

  if (!session.data.authenticated) {
    return <LoginPage onSignedIn={() => void session.refetch()} state="sign-in" />;
  }

  return <BaristaWorkspacePage onSignedOut={() => void session.refetch()} />;
}

export default App;
