import { BaristaWorkspacePage } from '@/pages/barista-workspace';

/**
 * Временный визуальный preview рабочего места. Проверка GET /auth/session
 * появится вместе с auth API и будет выбирать LoginPage или BaristaWorkspacePage.
 */
function App() {
  return <BaristaWorkspacePage />;
}

export default App;
