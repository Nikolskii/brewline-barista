import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { getSignInErrorMessage } from '../../lib/getSignInErrorMessage';
import { useSignIn } from '../../model/useSignIn';
import styles from './SignInForm.module.scss';

type SignInFormProps = {
  onSignedIn: () => void;
};

type SignInFields = {
  password: string;
};

/** Вход по общему паролю смены; сессию сохраняет httpOnly-cookie backend. */
export function SignInForm({ onSignedIn }: SignInFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<SignInFields>({ defaultValues: { password: '' } });
  const signIn = useSignIn();

  const errorMessage = getSignInErrorMessage(signIn.error);
  const passwordError = form.formState.errors.password?.message;

  function handleSubmit({ password }: SignInFields) {
    signIn.mutate(password, {
      onSuccess: () => {
        form.reset();
        onSignedIn();
      },
    });
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit(handleSubmit)}>
      <label className={styles.label} htmlFor="shift-password">
        Пароль смены
      </label>
      <div className={styles.passwordField}>
        <input
          className={styles.input}
          aria-describedby={passwordError || errorMessage ? 'sign-in-error' : undefined}
          aria-invalid={Boolean(passwordError || errorMessage)}
          disabled={signIn.isPending}
          id="shift-password"
          placeholder="••••••"
          {...form.register('password', {
            required: 'Введите пароль смены.',
            onChange: () => signIn.reset(),
          })}
          type={isPasswordVisible ? 'text' : 'password'}
        />
        <button
          aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
          className={styles.toggle}
          disabled={signIn.isPending}
          onClick={() => setIsPasswordVisible((value) => !value)}
          type="button"
        >
          {isPasswordVisible ? 'Скрыть' : 'Показать'}
        </button>
      </div>
      <button className={styles.submit} disabled={signIn.isPending} type="submit">
        {signIn.isPending ? 'Входим…' : 'Войти в смену'}
      </button>
      {(passwordError || errorMessage) && (
        <p className={styles.error} id="sign-in-error" role="alert">
          {passwordError ?? errorMessage}
        </p>
      )}
      <p className={styles.hint}>Пароль общий на заведение — логина нет</p>
    </form>
  );
}
