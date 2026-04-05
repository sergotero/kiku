import styles from "./control-panel-layout.module.css";

function ControlPanelLayout({ children }) {
  return(
    <main className={styles.admin}>
      {children}
    </main>
  );
}

export default ControlPanelLayout;