import MainLayout from "../../components/layouts/main-layout";
import Accordion from "../../components/ui/accordion/accordion";
import styles from "./home-page.module.css";
import kiku from "../../assets/images/logo/kiku_paper_logo.png";

function HomePage() {

  return (
    <MainLayout>
      <section className={styles.intro}>
        <Accordion name="intro" title="Idioma, pensamiento y cerebro" open={true}>
          <p>
            Aprender una lengua no es solo adquirir una herramienta de comunicación; es adoptar una nueva lente para observar la realidad. El idioma que hablamos moldea nuestra estructura mental y, por extensión, nuestra propia cultura. Es más, existen ejemplos fascinantes sobre cómo el vocabulario influye en nuestra percepción:
          </p>
          <ul>
              <li>
                <strong>Orientación espacial:</strong> Mientras que en español o inglés usamos términos relativos (izquierda, derecha), los hablantes de <em>Kuuk Thaayorre</em> (Australia) usan puntos cardinales absolutos. Esto les otorga una brújula interna biológica que la mayor parte de los humanos no poseen.
              </li>
              <li>
                <strong>La percepción del color:</strong> Idiomas como el ruso o el griego tienen palabras obligatorias distintas para el "azul claro" y el "azul oscuro" y hay estudios que demuestran que sus hablantes son capaces de distinguir matices cromáticos más rápido que un hablante de inglés, donde ambos son simplemente <i>blue</i>.
              </li>
              <li>
                <strong>El concepto del tiempo:</strong> En alemán, la estructura gramatical a menudo requiere especificar el final de una acción, lo que suele correlacionarse con una cultura enfocada en la planificación y los resultados.
              </li>
          </ul>

          <p>No es una metáfora: aprender un idioma modifica físicamente tu cerebro (un concepto conocido como <em>neuroplasticidad</em>). De hecho, varios estudios en materia de neurociencia han demostrado que el bilingüismo aumenta la densidad de la materia gris en la corteza parietal inferior izquierda y fortalece la integridad de la materia blanca (razón por la cuál el estudio de idiomas es uno de los mejores métodos para prevenir y retrasar la aparición de enfermedades como el Alzheimer).</p>
        </Accordion>
        <Accordion name="intro" title="El poder de la comparación">
          <p>A veces, una sola lengua se queda corta para entender los matices. A aquí es donde entra Kiku en acción. Nosotros usamos "puentes" lingüísticos con otros idiomas para que el aprendizaje sea intuitivo (lo que se conoce como <em>lingüística comparativa</em>):</p>

          <h3>1. Matices de Vocabulario</h3>
          <table>
            <thead>
              <tr>
                <th>Concepto</th>
                <th colSpan={2}>Japonés</th>
                <th>Traducción</th>
                <th>Matiz</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Calor</strong>
                </td>
                <td>
                  <span className={styles["jp-line"]}><ruby>暑<rt>あつ</rt>い</ruby></span><br />Atsui
                </td>
                <td>
                  <span className={styles["jp-line"]}><ruby>熱<rt>あつ</rt>い</ruby></span><br />Atsui
                </td>
                <td>
                  Caliente
                </td>
                <td>
                  Pese a que ambas palabras se lean igual, en japonés queda claro que una es usada en referencia a objetos (<span className={styles["jp-line"]}>暑い</span>), mientras que la otra en relación al clima (<span className={styles["jp-line"]}>熱い</span>). Sin embargo, este matiz es evidente cuando usamos el alemán como comparación que sí distingue entre <em>warm</em> y <em>heiß</em>.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Solo</strong>
                </td>
                <td>
                  <span className={styles["jp-line"]}><ruby>一人<rt>ひとり</rt></ruby></span><br />Hitori
                </td>
                <td>
                  <span className={styles["jp-line"]}><ruby>寂<rt>さび</rt>しい</ruby></span><br />Sabishii
                </td>
                <td>
                  Solo
                </td>
                <td>
                  En este otro ejemplo, es todavía más evidente la pérdida del matiz si tan sólo tenemos el español como referencia. El inglés, sin embargo, nos ayuda distinguir entre el hecho de estar solo físicamente (<strong>Alone</strong>) y el sentirse solo (<strong>Lonely</strong>).
                </td>
              </tr>
            </tbody>
          </table>

          <h3>2. Estructuras Gramaticales</h3>
          <p>El orden del pensamiento japonés puede parecer un laberinto, pero otros idiomas nos dan la brújula:</p>
          <ul>
            <li><strong>El verbo al final (SOV):</strong> Si conoces el alemán, ya tienes ventaja. Al igual que en las oraciones subordinadas alemanas (<em>...dass ich das Buch lese</em>), el japonés reserva el verbo para el cierre, dándole el poder final a la acción.</li>
            <li><strong>Cortesía y Registro:</strong> El <em>Keigo</em> (lenguaje honorífico) va más allá del "Usted" del español. Se asemeja a las jerarquías de lenguas con niveles de formalidad estrictos, donde el lenguaje cambia dinámicamente según la posición social del interlocutor.</li>
          </ul>
        </Accordion>
        <Accordion name="intro" title="¿Por qué Kiku?">
          <p>
            El nombre que hemos elegido es, en realidad, una suerte de juego de palabras nacido de la rica polisemia del japonés. Kiku, como veréis a continuación, captura tres pilares fundamentales de nuestra metodología:
          </p>
          <table>
            <thead>
              <th>Palabra</th>
              <th>Lectura</th>
              <th>Significado</th>
              <th>Simbolismo</th>
            </thead>
            <tbody>
              <tr>
                <td><span className={styles["jp-line"]}>聴く</span></td>
                <td>Kiku</td>
                <td>Escuchar</td>
                <td>La base de toda compresión auditiva y fonética</td>
              </tr>
              <tr>
                <td><span className={styles["jp-line"]}>聞く</span></td>
                <td>Kiku</td>
                <td>Preguntar/Pedir</td>
                <td>La curiosidad activa que te impulsa a resolver dudas.</td>
              </tr>
              <tr>
                <td><span className={styles["jp-line"]}>菊</span></td>
                <td>Kiku</td>
                <td>Crisantemo</td>
                <td>
                  El crisantemo en la cultura nipona es el emblema de la Familia Imperial. Representa la longevidad, la nobleza y la perfección. Su presencia en el pasaporte japonés nos recuerda que aprender esta lengua es abrir una puerta a una cultura de resiliencia y belleza estacional.
                </td>
              </tr>
            </tbody>
          </table>
        </Accordion>
      <img className={styles.kiku} src={kiku} alt="Cristantemo"/>
      </section>
      <section className={styles.options}>
        <div className={styles["option-buttons"]}>
          <div className={styles.kanji}>
            <div className={styles.titleGroup}>
              <h2>漢字</h2>
              <p>Kanji</p>
            </div>
          </div>
          <div className={styles.kotoba}>
            <div className={styles.titleGroup}>
              <h2>語彙</h2>
              <p>Vocabulario</p>
            </div>
          </div>
          <div className={styles.bunpou}>
            <div className={styles.titleGroup}>
              <h2>文法</h2>
              <p>Gramática</p>
            </div>
            <img src="" alt="" />
          </div>
          <div className={styles.kanas}>
            <div className={styles.titleGroup}>
              <h2>カナ</h2>
              <p>Silabarios</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default HomePage;