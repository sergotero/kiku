import styles from "./search.module.css";

function Search({ search, handleOnChange }) {
  return (
    <div className={styles.search}>
      <input type="text" name="search" placeholder="Buscar un título..." onChange={handleOnChange} value={search}/>
      <i className="fas fa-search"></i>
    </div>
  );
}

export default Search;