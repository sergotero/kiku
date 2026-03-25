import styles from "./kanji-detail-layout.module.css";

function KanjiDetailLayout({ children }) {
  return (
    <main className={styles.grid}>
      {children}
    </main>
  );
}

export default KanjiDetailLayout;