import { Link } from "react-router";
import Accordion from "../accordion/accordion";
import styles from "./word-detail.module.css";

function WordDetail({ word }) {
  
  if (!word || Object.keys(word).length === 0) {
    return <div></div>;
  }
  
  return (
    <>
      {/* AREA: TERM */}
      <div className={styles.term}>
        <h1>{word.word[0].text}</h1>
        {word.word.length > 1 && (
          <span style={{color: 'var(--light-grey)', fontSize: '0.9rem'}}>
            Variantes: {word.word.slice(1).map(w => w.text).join(' | ')}
          </span>
        )}
      </div>

      {/* AREA: READ (Top Info & Reading) */}
      <div className={styles.readings}>
        <div className={styles.classInfo}>
          <div className={styles.readingDisplay}>
            {word.readings.map(r => r.text).join(' / ')}
          </div>
          <div className={styles.options}>
            <button className={styles.report}><i className="fa-solid fa-plus"></i> Guardar</button>
          </div>
        </div>
      </div>

      {/* AREA: SENSES (Sustituye a meanings/svg) */}
      <div className={styles.senses}>
        {word.senses.map((sense, index) => (
          <div key={index} className={styles.senseCard}>
            <div className={styles.posTags}>
              {sense.partOfSpeech.map((pos, i) => (
                <span key={i} className={styles.posBadge}>{pos.label}</span>
              ))}
            </div>
            
            <Accordion title={`ACEPCIÓN ${index + 1}`} open={true}>
              <div>
                <div>
                  <strong >ESPAÑOL</strong>
                  <p>{sense.glosses.spa.length > 0 ? sense.glosses.spa.join(', ') : "---"}</p>
                </div>
                <div>
                  <strong>ENGLISH</strong>
                  <p>{sense.glosses.eng.join(', ')}</p>
                </div>
              </div>
            </Accordion>
          </div>
        ))}
      </div>

      {/* AREA: KANJIS (Información de caracteres individuales) */}
      <div className={styles.kanjisSection}>
        <p >CARACTERES EN ESTA PALABRA:</p>
        <div className={styles.kanjiGrid}>
          {word.kanjiCharacters.map((kanji) => (
            <div key={kanji.id} className={styles.kanjiBox}>
              <Link to={`/dictionary/kanji/${kanji.id}`}>
                {kanji.kanji}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WordDetail;