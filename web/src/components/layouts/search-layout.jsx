import styles from "./search-layout.module.css";

function SearchLayout({ children }) {
  return(
    <main className={styles.grid}>
      {children}
    </main>
  );
}

export default SearchLayout;