import styles from "./kanas-page.module.css";
import MainLayout from "../../components/layouts/main-layout.jsx";


function KanasPage() {

  return (
    <>
      <div className={styles.grid}>
        <section className={`${styles.kanas} ${styles.hiragana}`}>
          <h2>Hiragana</h2>
          <p>
            El <i>hiragana</i> (平仮名) nació alrededor del siglo IX como una simplificación cursiva de los caracteres chinos llamados kanji. Originalmente era conocido como <i>onnade</i> o mano de mujer porque en sus inicios las mujeres de la corte imperial lo utilizaban para escribir literatura y diarios personales mientras que los hombres preferían el chino formal. Con el paso del tiempo su uso se extendió a toda la población y se convirtió en la base de la escritura japonesa moderna. En la actualidad, En el japones actual el hiragana se utiliza para palabras de origen japones para las partículas gramaticales y para las terminaciones de los verbos llamadas <i>okurigana</i> (送り仮名).
          </p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>-</th>
                <th>K</th>
                <th>S</th>
                <th>T</th>
                <th>N</th>
                <th>H</th>
                <th>M</th>
                <th>Y</th>
                <th>R</th>
                <th>W</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>A</th>
                <td>あ<br />a</td>
                <td>か<br />ka</td>
                <td>さ<br />sa</td>
                <td>た<br />ta</td>
                <td>な<br />na</td>
                <td>は<br />ha</td>
                <td>ま<br />ma</td>
                <td>や<br />ya</td>
                <td>ら<br />ra</td>
                <td>わ<br />wa</td>
                <td>ん<br />n</td>
              </tr>
              <tr>
                <th>I</th>
                <td>い<br />i</td>
                <td>き<br />ki</td>
                <td>し<br />shi</td>
                <td>ち<br />chi</td>
                <td>に<br />ni</td>
                <td>ひ<br />hi</td>
                <td>み<br />mi</td>
                <td></td>
                <td>り<br />ri</td>
                <td></td>
              </tr>
              <tr>
                <th>U</th>
                <td>う<br />u</td>
                <td>く<br />ku</td>
                <td>す<br />su</td>
                <td>つ<br />tsu</td>
                <td>ぬ<br />nu</td>
                <td>ふ<br />fu</td>
                <td>む<br />mu</td>
                <td>ゆ<br />yu</td>
                <td>る<br />ru</td>
                <td></td>
              </tr>
              <tr>
                <th>E</th>
                <td>え<br />e</td>
                <td>け<br />ke</td>
                <td>せ<br />se</td>
                <td>て<br />te</td>
                <td>ね<br />ne</td>
                <td>へ<br />he</td>
                <td>め<br />me</td>
                <td></td>
                <td>れ<br />re</td>
                <td></td>
              </tr>
              <tr>
                <th>O</th>
                <td>お<br />o</td>
                <td>こ<br />ko</td>
                <td>そ<br />so</td>
                <td>と<br />to</td>
                <td>の<br />no</td>
                <td>ほ<br />ho</td>
                <td>も<br />mo</td>
                <td>よ<br />yo</td>
                <td>ろ<br />ro</td>
                <td>を<br />wo</td>
              </tr>

            </tbody>
          </table>
        </section>

        <section className={`${styles.kanas} ${styles.katakana}`}>
          <h2>Katakana</h2>
          <p>
            El <i>katakana</i> (片仮名) surgió de forma paralela al hiragana pero con un propósito diferente. Fue desarrollado principalmente por monjes budistas que tomaban fragmentos o partes de los kanji para crear anotaciones rápidas y guías de pronunciación en los margenes de los textos religiosos. Esto explica su apariencia mas angulosa y simplificada en comparación con las curvas del hiragana. En la actualidad, el katakana se reserva principalmente para transcribir palabras extranjeras nombres de países onomatopeyas y términos científicos o para dar un énfasis visual similar al uso de la cursiva en occidente.
          </p>
          <table >
            <thead>
              <tr>
                <th></th>
                <th>-</th>
                <th>K</th>
                <th>S</th>
                <th>T</th>
                <th>N</th>
                <th>H</th>
                <th>M</th>
                <th>Y</th>
                <th>R</th>
                <th>W</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>A</th>
                <td>ア<br />a</td>
                <td>カ<br />ka</td>
                <td>サ<br />sa</td>
                <td>タ<br />ta</td>
                <td>ナ<br />na</td>
                <td>ハ<br />ha</td>
                <td>マ<br />ma</td>
                <td>ヤ<br />ya</td>
                <td>ラ<br />ra</td>
                <td>ワ<br />wa</td>
                <td>ン<br />n</td>
              </tr>
              <tr>
                <th>I</th>
                <td>イ<br />i</td>
                <td>キ<br />ki</td>
                <td>シ<br />shi</td>
                <td>チ<br />chi</td>
                <td>ニ<br />ni</td>
                <td>ヒ<br />hi</td>
                <td>ミ<br />mi</td>
                <td></td>
                <td>リ<br />ri</td>
                <td></td>
              </tr>
              <tr>
                <th>U</th>
                <td>ウ<br />u</td>
                <td>ク<br />ku</td>
                <td>ス<br />su</td>
                <td>ツ<br />tsu</td>
                <td>ヌ<br />nu</td>
                <td>フ<br />fu</td>
                <td>ム<br />mu</td>
                <td>ユ<br />yu</td>
                <td>ル<br />ru</td>
                <td></td>
              </tr>
              <tr>
                <th>E</th>
                <td>エ<br />e</td>
                <td>ケ<br />ke</td>
                <td>セ<br />se</td>
                <td>テ<br />te</td>
                <td>ネ<br />ne</td>
                <td>ヘ<br />he</td>
                <td>メ<br />me</td>
                <td></td>
                <td>レ<br />re</td>
                <td></td>
              </tr>
              <tr>
                <th>O</th>
                <td>オ<br />o</td>
                <td>コ<br />ko</td>
                <td>ソ<br />so</td>
                <td>ト<br />to</td>
                <td>ノ<br />no</td>
                <td>ホ<br />ho</td>
                <td>モ<br />mo</td>
                <td>ヨ<br />yo</td>
                <td>ロ<br />ro</td>
                <td>ヲ<br />wo</td>
              </tr>
            </tbody>
          </table>
        </section>
      
      <section className={`${styles.kanas} ${styles.dakuon}`}>
        <h2>Dakuon (〝) y Handakuon (°)</h2>
        <p>
          Los sonidos <i>seion</i> (清音) son los sonidos puros o limpios que componen la base del silabario. Los <i>dakuon</i> (濁音) son sonidos turbios que se crean añadiendo dos pequeñas comas llamadas <i>dakuten</i> (濁点) en la parte superior derecha del carácter cambiando por ejemplo el sonido K por G. Los <i>handakuon</i> (半濁音) son sonidos medio turbios que se marcan con un pequeño circulo llamado <i>handakuten</i> (半濁点) y se aplican exclusivamente a la columna de la H para convertirla en el sonido P.
        </p>
        <table >
          <thead>
            <tr>
              <th></th>
              <th>G (〝)</th>
              <th>Z (〝)</th>
              <th>D (〝)</th>
              <th>B (〝)</th>
              <th>P (°)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>A</th>
              <td>が --- ガ<br />ga</td>
              <td>ざ --- ザ<br />za</td>
              <td>だ --- ダ<br />da</td>
              <td>ば --- バ<br />ba</td>
              <td>ぱ --- パ<br />pa</td>
            </tr>
            <tr>
              <th>I</th>
              <td>ぎ --- ギ<br />gi</td>
              <td>じ --- ジ<br />ji</td>
              <td>ぢ --- ヂ<br />ji</td>
              <td>び --- ビ<br />bi</td>
              <td>ぴ --- ピ<br />pi</td>
            </tr>
            <tr>
              <th>U</th>
              <td>ぐ --- グ<br />gu</td>
              <td>ず --- ズ<br />zu</td>
              <td>づ --- ヅ<br />zu</td>
              <td>ぶ --- ブ<br />bu</td>
              <td>ぷ --- プ<br />pu</td>
            </tr>
            <tr>
              <th>E</th>
              <td>げ --- ゲ<br />ge</td>
              <td>ぜ --- ゼ<br />ze</td>
              <td>で --- デ<br />de</td>
              <td>べ --- ベ<br />be</td>
              <td>ぺ --- ペ<br />pe</td>
            </tr>
            <tr>
              <th>O</th>
              <td>ご --- ゴ<br />go</td>
              <td>ぞ --- ゼ<br />zo</td>
              <td>ど --- ド<br />do</td>
              <td>ぼ --- ボ<br />bo</td>
              <td>ぽ --- ポ<br />po</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={`${styles.kanas} ${styles.yoon}`}>
        <h2>Diptongos</h2>
        <p>
          Los diptongos o <i>yōon</i> (拗音) se forman combinando una silaba que termina en la vocal i con una version pequeña de los caracteres ya yu o yo. Estos sonidos permiten crear silabas compuestas como kya o sho que son esenciales para pronunciar una gran cantidad de palabras de origen chino y términos modernos en japones.
        </p>
        <table >
          <thead>
            <tr>
              <th></th>
              <th>Ky</th>
              <th>Gy</th>
              <th>Sh</th>
              <th>J</th>
              <th>Ch</th>
              <th>Ny</th>
              <th>Hy</th>
              <th>By</th>
              <th>Py</th>
              <th>My</th>
              <th>Ry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Ya</th>
              <td>きゃ --- キャ<br />kya</td>
              <td>ぎゃ --- ギャ<br />gya</td>
              <td>しゃ --- シャ<br />sha</td>
              <td>じゃ --- ジャ<br />ja</td>
              <td>ちゃ --- チャ<br />cha</td>
              <td>にゃ --- ニャ<br />nya</td>
              <td>ひゃ --- ヒャ<br />hya</td>
              <td>びゃ --- ビャ<br />bya</td>
              <td>ぴゃ --- ピャ<br />pya</td>
              <td>みゃ --- ミャ<br />mya</td>
              <td>りゃ --- リャ<br />rya</td>
            </tr>
            <tr>
              <th>Yu</th>
              <td>きゅ --- キュ<br />kyu</td>
              <td>ぎゅ --- ギュ<br />gyu</td>
              <td>しゅ --- シュ<br />shu</td>
              <td>じゅ --- ジュ<br />ju</td>
              <td>ちゅ --- チュ<br />chu</td>
              <td>にゅ --- ニュ<br />nyu</td>
              <td>ひゅ --- ヒュ<br />hyu</td>
              <td>びゅ --- ビュ<br />byu</td>
              <td>ぴゅ --- ピュ<br />pyu</td>
              <td>みゅ --- ミュ<br />myu</td>
              <td>りゅ --- リュ<br />ryu</td>
            </tr>
            <tr>
              <th>Yo</th>
              <td>きょ --- キョ<br />kyo</td>
              <td>ぎょ --- ギョ<br />gyo</td>
              <td>しょ --- ショ<br />sho</td>
              <td>じょ --- ジョ<br />jo</td>
              <td>ちょ --- チョ<br />cho</td>
              <td>にょ --- ニョ<br />nyo</td>
              <td>ひょ --- ヒョ<br />hyo</td>
              <td>びょ --- ビョ<br />byo</td>
              <td>ぴょ --- ピョ<br />pyo</td>
              <td>みょ --- ミョ<br />myo</td>
              <td>りょ --- リョ<br />ryo</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={`${styles.kanas} ${styles.sokuon}`}>
        <h2>Las pausas llamadas <i>sokuon</i> y los sonidos largos</h2>
        <p>
          El <i>sokuon</i> (促音) es una pausa o un salto en la pronunciación que se representa con un pequeño tsu (っ en hiragana o ッ en katakana). No se pronuncia como una sílaba, sino que duplica la consonante que le sigue, como en la palabra "motto". Por otro lado, los sonidos largos o <i>chōon</i> (長音) extienden la duración de una vocal. En hiragana se suele añadir una vocal extra, mientras que en katakana se utiliza una raya horizontal llamada <i>chōonpu</i> (ー) para indicar esta prolongación, algo vital para diferenciar palabras como <i>ojisan</i> (tío) de <i>ojiisan</i> (abuelo).</p>
      </section>
      </div>
    </>
  );
}

export default KanasPage;