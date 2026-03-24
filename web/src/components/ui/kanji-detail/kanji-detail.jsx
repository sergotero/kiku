import styles from "./kanji-detail.module.css";
import Accordion from "../accordion/accordion";
import SVG from "../svg/svg";
import SVGGenerator from "../svg/svg";

function KanjiDetail({ kanji, examples }) {

  if (!kanji || Object.keys(kanji).length === 0) {
    return <div></div>;
  }

  const { classification, meanings, readings, strokes: strokesData } = kanji;
  const jlpt = classification?.jlptLevel ?? "N/A";
  const grade = classification?.gradeLevel ?? "N/A";
  const spanish = meanings?.es || [];
  const english = meanings?.en || [];
  const { onyomi = [], kunyomi = [] } = readings || {};
  const kanjiStrokes = strokesData?.strokes || [];

  const renderReading = (kana) => {
    const text = kana.reading;
    if (!text.includes('.')) {
      return <span className={styles.readingItem}>{text}</span>;
    }
    const [root, inflection] = text.split('.');
    return (
      <span className={styles.readingItem}>
        <span className={styles.root}>{root}</span>
        <span className={styles.inflection}>{inflection}</span>
      </span>
    );
  };


  return (
    <>
      <div className={styles.term}>
        <h1>{kanji.kanji}</h1>
      </div>
      
      <div className={styles.readings}>
        {/* KANJI INFO */}
        <div className={styles["class-info"]}>
          <div className={styles.options}>
            <button className={styles.report} type="button"><i className="fa-solid fa-triangle-exclamation"></i> Reportar error</button>
            <button className={styles["add-list"]} type="button"><i className="fa-solid fa-plus"></i> Añadir a lista</button>
          </div>
          <span className={styles.tags}>{`Grado - ${grade}`}</span>
          <span className={styles.tags}>{`JLPT - ${jlpt}`}</span>
          
        </div>
        
        {/* READINGS */}
        <div className={styles.kunyomi}>
          <p><span>KUNYOMI (訓読み):</span></p>
          <div className={styles.readingList}>
            {kunyomi.map((k, index) => (
              <span key={index} className={styles.readingWrapper}>
                {renderReading(k)}
                {index < kunyomi.length - 1 && <span className={styles.separator}></span>}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.onyomi}>
          <p><span>ONYOMI (音読み):</span></p>
          <div className={styles.readingList}>
            {onyomi.map((o, index) => (
              <span key={index} className={styles.readingWrapper}>
                {renderReading(o)}
                {index < onyomi.length - 1 && <span className={styles.separator}></span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MEANINGS */}
      <div className={styles.meanings}>
        <Accordion title={"ESPAÑOL"} open={true} name={""}>
          {spanish.length > 0 ? spanish.join(", ") : "No disponible"}
        </Accordion>
        <Accordion title={"ENGLISH"} open={false} name={""}>
          {english.length > 0 ? english.join(", ") : "No disponible"}
        </Accordion>
      </div>
      
      {/* STROKES */}
      <div className={styles.svg}>
        <SVGGenerator svgs={kanjiStrokes} />
      </div>

      {/* EXAMPLES */}
      <div className={styles.examples}>
        <p>Estos son algunos ejemplos de palabras que utilizan el kanji {kanji.kanji} :</p>
        <table>
          <thead>
            <tr>
              <th>言葉</th>
              <th>読み方</th>
              <th>Español</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((ex) => (
            <tr>
              <td>{ex.word[0].text}</td>
              <td>{ex.readings[0].text}</td>
              <td>{ex.senses[0].glosses.spa[0] === undefined? "---" : ex.senses[0].glosses.spa[0]}</td>
              <td>{ex.senses[0].glosses.eng[0]}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* <details className={styles.debug}>
        <summary>Ver JSON completo</summary>
        <pre>{JSON.stringify(kanji, null, 2)}</pre>
      </details> */}
    </>
  );
}

export default KanjiDetail;