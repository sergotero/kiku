import styles from "./search.module.css";

function Search({ type, search, handleOnChange, handleType, handleOnEnter }) {

  const updateType = (event) => {
    handleType(event.target.value);
  }

  return (
    <div className={styles.search}>
      <select name="searchType" id="searchType" value={type} onChange={updateType}>
        <option value="kanji">Kanji</option>
        <option value="word">Palabra</option>
      </select>
      <input type="text" name="search" placeholder="Busca un kanji, una palabra, romaji..." onChange={handleOnChange} value={search} onKeyDown={handleOnEnter}/>
      <i className="fas fa-search"></i>
    </div>
  );
}

export default Search;