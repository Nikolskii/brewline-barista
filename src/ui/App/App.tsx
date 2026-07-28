import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>Brewline · Бариста</header>
      <main className={styles.queue}>Очередь пуста</main>
    </div>
  );
}

export default App;
