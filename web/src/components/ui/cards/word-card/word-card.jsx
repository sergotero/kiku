import { useNavigate } from "react-router";
import styles from "./word-card.module.css";

function WordCard({ term }){
  const navigate = useNavigate();
  const {
    word = [],
    readings = [],
    senses = [],
    id
  } = term;

  //Kanji and kana readings
  const [ firstWord = {} ] = word;
  const [ firstReading = {} ] = readings;
  const kanjiWord = firstWord.text || null;
  const kanaWord = firstReading.text || "Lectura no disponible";

  //Gloses
  const [{ glosses }] = senses;
  const { eng: eng = [], spa: spa = [] } = glosses;
  const engMeaning = eng.map((word) => capitalizeFirstLetter(word)).join(", ");
  const spaMeaning = spa?.map((word) => capitalizeFirstLetter(word)).join(", ");


  return (
    <article className={styles["word-card"]} id={id}>
        {kanjiWord ? (
          <div className={styles.header}>
            <h2 className={styles.kanji}>{kanjiWord}</h2>
            <span className={styles.reading}>（{kanaWord}）</span>
            <button className={styles.details} onClick={() => navigate(`/dictionary/word/${id}`)}>Detalles</button>
          </div>
        ):
        (
          <div className={styles.header}>
            <h2 className={styles["kana-only"]}>{kanaWord}</h2>
            <button type="button" className={styles.details} onClick={() => navigate(`/dictionary/word/${id}`)}>Detalles</button>
          </div>
        )}
        <div className={styles["word-info"]}>

          <p className={styles.english}>
            <span>Meaning:</span> {engMeaning}
          </p>
          <p className={styles.spanish}>
            <span>Significado:</span> {spaMeaning ? spaMeaning : "---" }
          </p>
        </div>

    </article>
  );
}

export default WordCard;


function capitalizeFirstLetter(word){
  const firstLetter = word[0].toUpperCase();
  const rest = word.slice(1).toLowerCase();
  const newWord = firstLetter + rest;
  return newWord;
}