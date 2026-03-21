import { Link } from "react-router";
import styles from "./grid.module.css";

function Grid({children}) {
  
  return (
    <div className={styles.grid}>
      {children}
    </div>
  );
}


export default Grid;