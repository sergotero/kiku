import styles from "./search-page.module.css";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import wordCategories from "./../../data/word-categories.js";
import kanjiCat from "./../../data/kanji-categories.js";
import SearchLayout from "./../../components/layouts/search-layout.jsx";
import Search from "./../../components/ui/search/search.jsx";
import Tag from "./../../components/ui/tag/tag.jsx";
import * as ApiService from "./../../services/api-service.js";
import { KanjiCard, WordCard } from "./../../components/ui/cards/index.js";
import { orderKanjiCategories, orderWordCategories } from "./../../utils/categories-generator.js";

function SearchPage() {

  const [queryParams, setQueryParams] = useSearchParams();

  const type = queryParams.get("type");
  const category = queryParams.get("category");
  const page = queryParams.get("page") || 0;

  const { categories, tags } = useMemo(() => orderWordCategories(wordCategories));
  const kanjiCategories = useMemo(() => orderKanjiCategories(kanjiCat));

  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);



  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
    setQueryParams({ type, term: searchValue, page });
  }

  const handleOnEnter = async (event) => {
    if (event.key === "Enter") {
      setWordList([]);
      setKanjiList([]);
      setQueryParams({ type, term: searchValue, page });

      if (type === "kanji") {
        const search = await ApiService.listKanjis({ type, term: searchValue, page });
        setResult(search);

      }
      if (type === "word") {
        const search = await ApiService.listWords({ type, term: searchValue, page });
        setResult(search);
      }
    }
  }

  const handleSelection = (category) => {
    console.log("selected cat: ", category);
    setResult([]);
    setQueryParams({ type, category, page });

  }

  const handleSearchType = (type) => {
    setResult([]);
    setQueryParams({ type });
  }


  useEffect(() => {
    if (searchValue === "") {
      const fetch = async () => {
        if (category) {
          if (type === "word") {
            const cat = tags.get(category);
            const words = await ApiService.listWords({ type, page, category: cat });
            setResult(words);
          }
          if (type === "kanji") {
            const kanjis = await ApiService.listKanjis({ type, page, category });
            setResult(kanjis);
          }
        }
      }
      fetch();
    }
  }, [type, category, page]);

  return (
    <SearchLayout>
      <div className={styles["grammar-cat"]}>
        {type === "word" ?
          (categories?.map((cat, index) =>
            <Tag
              key={`${cat}-${index}`}
              selectedOption={category}
              handleSelection={handleSelection}
            >{cat}</Tag>)) :

          (kanjiCategories?.map((cat, index) =>
            <Tag
              key={`${cat}-${index}`}
              selectedOption={category}
              handleSelection={handleSelection}
            >{cat}</Tag>))
        }
      </div>
      <Search
        type={type}
        search={searchValue}
        handleSearchType={handleSearchType}
        handleOnChange={handleOnChange}
        handleOnEnter={handleOnEnter}
      />
      <div className={styles.results}>
        {type === "kanji" && result?.map((kanji) => {
          return <KanjiCard key={kanji.id} term={kanji} />
        })}
        {type === "word" && result?.map((word) => {
          return <WordCard key={word.id} term={word} />
        })}
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => setQueryParams({ type, category, page: +page - 1 })}
          disabled={+page === 0 ? true : false}>
          <i className="fa-solid fa-angle-left"></i> Anterior
        </button>
        <button
          type="button"
          onClick={() => setQueryParams({ type, category, page: +page + 1 })}>
          Siguiente <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </SearchLayout>
  );
}

export default SearchPage;