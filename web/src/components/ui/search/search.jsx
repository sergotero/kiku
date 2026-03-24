import styles from "./search.module.css";
import { useState } from "react";

function Search({ type, search, handleOnChange, handleSearchType, handleOnEnter }) {

  const [searchType = "", setSearchType] = useState(type);
  const updateType = (event) => {
    handleSearchType(event.target.value);
    setSearchType(event.target.value);
  }

  return (
    <div className={styles.search}>
      <select name="searchType" id="searchType" value={searchType} onChange={updateType}>
        <option value="kanji">Kanji</option>
        <option value="word">Palabra</option>
      </select>
      <input type="text" name="search" placeholder="Busca un kanji, una palabra, romaji..." onChange={handleOnChange} value={search} onKeyDown={handleOnEnter}/>
      <i className="fas fa-search"></i>
    </div>
  );
}

export default Search;