import { Link } from "react-router";
import styles from "./grid-layout.module.css";

function Grid({ data, type }) {
  
  return (
    <div className={styles.grid}>
      {data.map((k) => <Link to={`/kanas/${k.id}`} key={k.id}><div className={styles.kana}>{k[`${type}`].char}</div></Link>)}
    </div>
  );
}


export default Grid;