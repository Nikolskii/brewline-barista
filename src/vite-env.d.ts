/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Базовый адрес backend API (напр. http://localhost:3000). Обязателен — ADR 0004. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
