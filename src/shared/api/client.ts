// Транспортный слой: единственное место, знающее адрес backend и как ходить по HTTP.
//
// Адрес обязателен и приходит из VITE_API_URL на этапе сборки (ADR 0004): фронт
// и API живут на разных origin, Vite-proxy не используется — в деве запрос идёт
// туда же, куда пойдёт в проде, только на localhost.
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  // Падаем сразу и громко. С пустым адресом запросы ушли бы на origin самого
  // фронта, вернули index.html и упали бы в парсинге JSON — ошибка выглядела бы
  // как проблема данных, а не как забытая переменная окружения.
  throw new Error('VITE_API_URL не задан — скопируйте .env.example в .env');
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function apiGet<T>(path: string): Promise<T> {
  return apiRequest<T>(path);
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  return apiRequest<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    // Кука сессии бариста появится в задаче про аутентификацию (ADR 0011).
    // Включено сразу: backend уже отвечает с credentials, а забытый флаг даёт
    // молчаливый 401 вместо понятной ошибки.
    credentials: 'include',
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `${init?.method ?? 'GET'} ${path} → HTTP ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export { API_URL };
