import { type FormEvent, useState } from 'react';

import styles from './SignInForm.module.scss';

/**
 * Визуальная часть входа. Отправка пароля появится после выпуска auth API.
 */
export function SignInForm() {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="shift-password">
        Пароль смены
      </label>
      <div className={styles.passwordField}>
        <input
          className={styles.input}
          id="shift-password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••"
          type={isPasswordVisible ? 'text' : 'password'}
          value={password}
        />
        <button
          aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          className={styles.toggle}
          onClick={() => setIsPasswordVisible((value) => !value)}
          type="button"
        >
          {isPasswordVisible ? 'Скрыть' : 'Показать'}
        </button>
      </div>
      <button className={styles.submit} type="submit">
        Войти в смену
      </button>
      <p className={styles.hint}>Пароль общий на заведение — логина нет</p>
    </form>
  );
}
