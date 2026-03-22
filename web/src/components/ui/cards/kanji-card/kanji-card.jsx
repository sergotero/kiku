import { useNavigate } from "react-router";
import styles from "./kanji-card.module.css";

function KanjiCard({ term }){
  const navigate = useNavigate();
  const {
    kanji,
    classification: {gradeLevel: grade, jlptLevel: jlpt, frequencyRank: frequency},
    meanings,
    id
  } = term;

  const { en: english, es: spanish } = meanings;
  const engMeaning = english.map((word) => capitalizeFirstLetter(word)).join(", ");
  const spaMeaning = spanish?.map((word) => capitalizeFirstLetter(word)).join(", ");


  return (
    <article className={styles["kanji-card"]} id={id}>
        {kanji && (
          <div className={styles.header}>
            <h2 className={styles.kanji}>{kanji}</h2>
            <button className={styles.details} onClick={() => navigate(`/dictionary/kanji/${id}`)}>Detalles</button>
          </div>
        )}
        <div className={styles["kanji-info"]}>

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

export default KanjiCard;


function capitalizeFirstLetter(word){
  const firstLetter = word[0].toUpperCase();
  const rest = word.slice(1).toLowerCase();
  const newWord = firstLetter + rest;
  return newWord;
}