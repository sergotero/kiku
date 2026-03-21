import styles from "./tag.module.css";

function Tag({ selectedOption, handleSelection, children }) {
  
  return(
    <div className={`${styles.tags} ${selectedOption === children? styles.selected : ""}`} onClick={() => handleSelection(children)}>
      {children}
    </div>
  );
}

export default Tag;