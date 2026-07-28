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
  // Dev-proxy сознательно НЕ настраиваем (в отличие от brewline-display): по ADR 0004
  // фронт и API живут на разных origin, и в деве тоже — браузер ходит на backend
  // напрямую через CORS. Так дев повторяет прод, и кросс-origin эффекты (заголовки,
  // куки сессии бариста) всплывают сразу, а не на деплое.
  // Адрес backend приходит из VITE_API_URL — задача B3.
});
