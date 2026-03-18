import styles from "./filter.module.css";

function Filter({ handleSelection, filter, children }) {

  return (
    <span className={`${styles.filter} ${filter === children ? styles.active : ""}`} onClick={() => handleSelection(children)}>{ children }</span>
  );
}

export default Filter;