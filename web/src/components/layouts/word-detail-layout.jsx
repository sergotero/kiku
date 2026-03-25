import styles from "./word-detail-layout.module.css";

function WordDetailLayout({ children }) {
  return (
    <main className={styles.grid}>
      {children}
    </main>
  );
}

export default WordDetailLayout;