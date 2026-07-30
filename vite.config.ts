import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@' → /src. Разрешается Vite на сборке (в отличие от backend, где чистый Node).
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Порт фиксирован: 5173 занимает табло, а список разрешённых origin в backend
    // задан явно (CORS_ORIGINS). strictPort не даёт Vite молча уехать на соседний
    // порт — иначе запросы упирались бы в CORS с непонятной для новичка ошибкой.
    port: 5174,
    strictPort: true,
  },
  // Dev-proxy сознательно НЕ настраиваем (в отличие от brewline-display): по ADR 0004
  // фронт и API живут на разных origin, и в деве тоже — браузер ходит на backend
  // напрямую через CORS. Так дев повторяет прод, и кросс-origin эффекты (заголовки,
  // куки сессии бариста) всплывают сразу, а не на деплое.
  // Адрес backend приходит из VITE_API_URL (см. .env.example).
});
