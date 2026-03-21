import styles from "./search-page.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import wordCategories from "../../data/word-categories.js";
import SearchLayout from "./../../components/layouts/search-layout.jsx";
import Search from "./../../components/ui/search/search.jsx";
import Tag from "../../components/ui/tag/tag.jsx";
import * as ApiService from "./../../services/api-service.js";
import { WordCard } from "../../components/ui/cards/index.js";

function SearchPage() {
  
  const [ queryParams, setQueryParams ] = useSearchParams();
  const [ searchType, setSearchType] = useState(queryParams.get("type"));
  const [ searchValue, setSearchValue ] = useState("");
  const [ grammarCategories, setGrammarCategories ] = useState([]);
  const [ grammarTags, setGrammarTags ] = useState({});
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [ wordList, setWordList ] = useState([]);


  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSelection = (category) => {
    setSelectedCategory(category);
    setQueryParams({type: searchType, category: selectedCategory});
  }

  const handleSearchType = (newType) => {
    setSearchType(newType);
    setQueryParams({type: newType});
  }

  
  useEffect(() => {
    const { categories, tags } = orderCategories(wordCategories);
    setGrammarCategories(categories);
    setGrammarTags(tags);
  }, []);
  
  useEffect(() => {
    const fetch = async() => {
      const type = queryParams.get("type");
      if(type === "word") {
        const tags = grammarTags.get(selectedCategory);
        if (tags !== "undefined") {
          setQueryParams({type: searchType, category: tags});
          const words = await ApiService.listWords({type: searchType, category: tags});
          setWordList(words);
        }
      }
    }
    fetch();
  }, [selectedCategory, queryParams]);
  
  return (
    <SearchLayout>
      <div className={styles["grammar-cat"]}>
        {searchType === "word" &&
        grammarCategories?.map( (cat) =>
          <Tag
            key={cat}
            selectedOption={selectedCategory}
            handleSelection={handleSelection}
          >{cat}</Tag>)}
      </div>
      <Search 
        type={searchType} 
        search={searchValue} 
        handleSearchType={handleSearchType} 
        handleOnChange={handleOnChange}
      />
      <div className={styles.results}>
        {wordList?.map((word) => {
          return <WordCard key={word.id} term={word}/>
        })}
      </div>
    </SearchLayout>
  );
}

export default SearchPage;




function orderCategories(categories) {
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