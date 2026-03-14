import styles from "./main-layout.module.css";

function MainLayout({ children }) {
  return (
    <main className={styles.main}>
      { children }
    </main>
  );
}

export default MainLayout;