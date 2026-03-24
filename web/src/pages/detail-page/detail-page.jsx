import styles from "./detail-page.module.css";
import DetailLayout from "./../../components/layouts/detail-layout.jsx";
import { useParams } from "react-router";
import * as ApiService from "./../../services/api-service.js";
import { useEffect, useState } from "react";
import KanjiDetail from "../../components/ui/kanji-detail/kanji-detail.jsx";

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
      <DetailLayout>
        <KanjiDetail kanji={term} examples={examples} />
      </DetailLayout>
    </>
  );
}

export default DetailPage;