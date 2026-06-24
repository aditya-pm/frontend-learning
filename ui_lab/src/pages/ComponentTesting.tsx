import styles from "./ComponentTesting.module.css";

function ComponentTesting() {
  return (
    <main className={styles.container}>
      <section className={`${styles.panel} light-mode theme-default`}>
        <h2>Light Mode</h2>

        <div className={styles.showcase}>{/* Components */}</div>
      </section>

      <section className={`${styles.panel} dark-mode theme-default`}>
        <h2>Dark Mode</h2>

        <div className={styles.showcase}>{/* Components */}</div>
      </section>
    </main>
  );
}

export default ComponentTesting;
