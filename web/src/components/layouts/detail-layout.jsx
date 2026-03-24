import styles from "./detail-layout.module.css";

function DetailLayout({ children }) {
  return (
    <main className={styles.grid}>
      {children}
    </main>
  );
}

export default DetailLayout;