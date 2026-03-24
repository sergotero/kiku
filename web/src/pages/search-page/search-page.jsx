import styles from "./search-page.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import wordCategories from "../../data/word-categories.js";
import kanjiCat from "../../data/kanji-categories.js";
import SearchLayout from "./../../components/layouts/search-layout.jsx";
import Search from "./../../components/ui/search/search.jsx";
import Tag from "../../components/ui/tag/tag.jsx";
import * as ApiService from "./../../services/api-service.js";
import { KanjiCard, WordCard } from "../../components/ui/cards/index.js";

function SearchPage() {
  
  const [ queryParams, setQueryParams ] = useSearchParams();
  const [ searchType, setSearchType] = useState(queryParams.get("type"));
  const [ searchValue, setSearchValue ] = useState("");
  const [ searchResult, setSearchResult] = useState([]);
  const [ grammarCategories, setGrammarCategories ] = useState([]);
  const [ kanjiCategories, setKanjiCategories ] = useState([]);
  const [ grammarTags, setGrammarTags ] = useState({});
  const [ selectedWordCategory, setSelectedWordCategory ] = useState("");
  const [ selectedKanjiCategory, setSelectedKanjiCategory ] = useState("");
  const [ wordList, setWordList ] = useState([]);
  const [ kanjiList, setKanjiList ] = useState([]);
  const [ page, setPage ] = useState(0);


  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
    setQueryParams({type: searchType, term: searchValue, page: page});
  }

  const handleOnEnter = async (event) => {
    if (event.key === "Enter") {
      setSelectedWordCategory("");
      setSelectedKanjiCategory("");
      setWordList([]);
      setKanjiList([]);
      setQueryParams({type: searchType, term: searchValue, page: page});

      if (searchType === "kanji"){
        const search = await ApiService.listKanjis({type: searchType, term: searchValue, page: page});
        setSearchResult(search);
        
      }
      if (searchType === "word"){
        const search = await ApiService.listWords({type: searchType, term: searchValue, page: page});
        setSearchResult(search);
      }
    }
  }

  const handleSelection = (category) => {
    setSearchResult([]);
    if (searchType === "word") {
      setSelectedWordCategory(category);
      setQueryParams({type: searchType, category: category});
    } else if (searchType === "kanji") {
      setSelectedKanjiCategory(category);
      setQueryParams({ type: searchType, category: category});
    }
  }

  const handleSearchType = (newType) => {
    setKanjiList([]);
    setWordList([]);
    setSelectedKanjiCategory("");
    setSelectedWordCategory("");
    setSearchType(newType);
    setQueryParams({type: newType});
  }
  
  useEffect(() => {
    const { categories, tags } = orderWordCategories(wordCategories);
    setGrammarCategories(categories);
    setGrammarTags(tags);
    const kanjiTags = orderKanjiCategories(kanjiCat);
    setKanjiCategories(kanjiTags);
  }, []);
  
  useEffect(() => {
    if (searchValue === "") {
      const fetch = async() => {
        const type = queryParams.get("type");
        if (type === "word") {
          const tags = grammarTags.get(selectedWordCategory);
          if (selectedWordCategory) {
            setQueryParams({type: searchType, category: tags, page});
            const words = await ApiService.listWords({type: searchType, page: page, category: tags});
            setWordList(words);
          }
        }
  
        if (type === "kanji") {
          if (selectedKanjiCategory) {
            setQueryParams({type: searchType, category: selectedKanjiCategory, page});
            const kanjis = await ApiService.listKanjis({type: searchType, page: page, category: selectedKanjiCategory});
            setKanjiList(kanjis);
          }
        }
      }
      fetch();
    }
  }, [selectedWordCategory, selectedKanjiCategory, page]);
  
  return (
    <SearchLayout>
      <div className={styles["grammar-cat"]}>
        {searchType === "word"? 
        (grammarCategories?.map( (cat) =>
          <Tag
            key={cat}
            selectedOption={selectedWordCategory}
            handleSelection={handleSelection}
          >{cat}</Tag>)) :
          
        (kanjiCategories?.map( (cat) =>
          <Tag
            key={cat}
            selectedOption={selectedKanjiCategory}
            handleSelection={handleSelection}
          >{cat}</Tag>)) 
        }
      </div>
      <Search 
        type={searchType} 
        search={searchValue} 
        handleSearchType={handleSearchType} 
        handleOnChange={handleOnChange}
        handleOnEnter={handleOnEnter}
      />
      <div className={styles.results}>
        {wordList?.map((word) => {
          return <WordCard key={word.id} term={word}/>
        })}
        {kanjiList?.map((kanji) => {
          return <KanjiCard key={kanji.id} term={kanji}/>
        })}
        {searchType === "kanji" && searchResult?.map((kanji) => {
          return <KanjiCard key={kanji.id} term={kanji} />
        })}
        {searchType === "word" && searchResult?.map((word) => {
          return <WordCard key={word.id} term={word} />
        })}
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={() => {setPage(page - 1)}} disabled={page === 0? true : false}><i className="fa-solid fa-angle-left"></i> Anterior</button>
        <button type="button" onClick={() => {setPage(page + 1)}}>Siguiente <i className="fa-solid fa-angle-right"></i></button>
      </div>
    </SearchLayout>
  );
}

export default SearchPage;



function orderKanjiCategories(categories) {
  const newCategories = [];
  
  for (const key in categories) {
    const element = categories[key];
    if (!Array.isArray(element)) {
      for (const k in element) {
        const itemArray = element[k];
        for (let i = 0; i < itemArray.length; i++) {
        const tag = itemArray[i].tag;
        newCategories.push(tag);
      }
      }
    }
    
    if (Array.isArray(element)) {
      for (let i = 0; i < element.length; i++) {
        const tag = element[i].tag;
        newCategories.push(tag);
      }
    }
  }
  return newCategories;
}


function orderWordCategories(categories) {
  const orderedCategories = [];
  const tags = new Map();
    for (const category in categories) {

        switch(category) {
          case "adjectivesI":
            orderedCategories.push("Adjetivos ～い");
            tags.set("Adjetivos ～い", categories[category].map((el) => el.tag));
          break;
          case "adjectivesNa":
            orderedCategories.push("Adjetivos ～な");
            tags.set("Adjetivos ～な", categories[category].map((el) => el.tag));
          break;
          case "adjectivesNo":
            orderedCategories.push("Adjetivos ～の");
            tags.set("Adjetivos ～の", categories[category].map((el) => el.tag));
          break;
          case "adjectivesPrenominal":
            orderedCategories.push("Adjetivos prenominales");
            tags.set("Adjetivos prenominales", categories[category].map((el) => el.tag));
          break;
          case "verbsModern":
            orderedCategories.push("Verbos (Forma moderna)");
            tags.set("Verbos (Forma moderna)", categories[category].map((el) => el.tag));
          break;
          case "verbsArchaic":
            orderedCategories.push("Verbos (Forma arcaica)");
            tags.set("Verbos (Forma arcaica)", categories[category].map((el) => el.tag));
          break;
          case "nouns":
            orderedCategories.push("Sustantivos");
            tags.set("Sustantivos", categories[category].map((el) => el.tag));
          break;
          case "pronouns":
            orderedCategories.push("Pronombres");
            tags.set("Pronombres", categories[category].map((el) => el.tag));
          break;
          case "adverbsAndOno":
            orderedCategories.push("Adverbios");
            tags.set("Adverbios", categories[category].map((el) => el.tag));
          break;
          case "structure":
            orderedCategories.push("Componentes lingüísticos");
            tags.set("Componentes lingüísticos", categories[category].map((el) => el.tag));
          break;
          case "affixes":
            orderedCategories.push("Prefijos y Sufijos");
            tags.set("Prefijos y Sufijos", categories[category].map((el) => el.tag));
          break;
          case "quantifiers":
            orderedCategories.push("Números y Contadores");
            tags.set("Números y Contadores", categories[category].map((el) => el.tag));
          break;
          case "miscellaneous":
            orderedCategories.push("Expresiones");
            tags.set("Expresiones", categories[category].map((el) => el.tag));
          break;
        }
      
    }

    orderedCategories.sort((a,b) => a.localeCompare(b));

    return {categories: orderedCategories, tags};
}