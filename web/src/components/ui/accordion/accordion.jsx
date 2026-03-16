import styles from "./accordion.module.css";

function Accordion({ title, open, name = "", children }){
  if (open) {
    return (
    <details name={name} open>
      <summary>{title}</summary>
      <div className={styles.content}>
        {children}
      </div>
    </details>
  );
  } else {
    return (
      <details name={name}>
        <summary>{title}</summary>
        <div className={styles.content}>
          {children}
        </div>
      </details>
    );
  }
}

export default Accordion;