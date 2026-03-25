import styles from "./detail-page.module.css";
import KanjiDetailLayout from "../../components/layouts/kanji-detail-layout.jsx";
import WordDetailLayout from "../../components/layouts/word-detail-layout.jsx";
import { useParams } from "react-router";
import * as ApiService from "./../../services/api-service.js";
import { useEffect, useState } from "react";
import KanjiDetail from "../../components/ui/kanji-detail/kanji-detail.jsx";
import WordDetail from "../../components/ui/word-detail/word-detail.jsx";

function DetailPage() {
  const { type, id } = useParams();
  const [ term, setTerm ] = useState({});
  const [ examples, setExamples ] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      
      if (type === "kanji") {
        const kanji = await ApiService.getKanjiDetail(id);
        setTerm(kanji);
        const examples = await ApiService.listWords({example: id});
        setExamples(examples);
      }

      if (type === "word") {
        const word = await ApiService.getWordDetail(id);
        setTerm(word);
      }
    }

    fetch();
  }, []);
  
  return (
    <>
        {type === "kanji" && (
          <KanjiDetailLayout>
            <KanjiDetail kanji={term} examples={examples} />
          </KanjiDetailLayout>
        )}
        {type === "word" && (
          <WordDetailLayout>
            <WordDetail word={term} />
          </WordDetailLayout>
        )}
    </>
  );
}

export default DetailPage;