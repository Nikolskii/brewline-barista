# brewline-barista

Интерфейс бариста системы **Brewline** — виртуальной очереди заказов в кофейне.
Бариста видит очередь на своём устройстве и меняет статусы заказов; изменения
синхронно приезжают на табло в зале и клиенту.

Один из контейнеров системы (C4). Соседние репозитории: `brewline-backend`
(API и SSE), `brewline-display` (табло в зале), `brewline-infra` (локальный
docker-compose и деплой), `brewline-docs` (документация, ADR, диаграммы).

## Стек

- React 19 + TypeScript
- Vite
- SCSS Modules
- TanStack Query (появится вместе с транспортным слоем)
- Типы API — из npm-пакета `@brewline/api-types`, генерируемого из контракта backend

## Запуск

```bash
npm install
npm run dev
```

Приложение поднимется на `http://localhost:5173`.

Backend запускается отдельно из репозитория `brewline-backend` (docker-compose с
MongoDB). Фронт ходит к нему **кросс-origin через CORS**, dev-proxy не используется —
так дев повторяет прод (ADR 0004). Адрес API задаётся переменной `VITE_API_URL`.

## Скрипты

| Команда           | Что делает                              |
| ----------------- | --------------------------------------- |
| `npm run dev`     | dev-сервер с HMR                        |
| `npm run build`   | проверка типов (`tsc -b`) и прод-сборка |
| `npm run preview` | локальный просмотр прод-сборки          |

## Лицензия

[MIT](LICENSE)
