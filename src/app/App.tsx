import { LoginPage } from '@/pages/login';

/**
 * Корень приложения выбирает экран по сессии.
 * Проверка GET /auth/session появится вместе с auth API; до неё вход — первый
 * реализуемый визуальный сценарий.
 */
function App() {
  return <LoginPage />;
}

export default App;
