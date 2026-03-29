const fs = require("fs");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = "kiku";
const kana = 'kanas';

const FILES = {
  kanji: "./kanji.json",
  strokes: "./strokes.json",
  radicals: "./radk.json",
  krad: "./krad.json",
  words: "./JMdict.json"
};

async function run() {

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);

  const Kanjis = db.collection("kanjis");
  const Strokes = db.collection("strokes");
  const Radicals = db.collection("radicals");
  const Words = db.collection("words");

  console.log("Loading JSON files...");

  const kanjiData = JSON.parse(fs.readFileSync(FILES.kanji));
  const strokesData = JSON.parse(fs.readFileSync(FILES.strokes));
  const radicalsData = JSON.parse(fs.readFileSync(FILES.radicals));
  const kradData = JSON.parse(fs.readFileSync(FILES.krad));
  const wordsData = JSON.parse(fs.readFileSync(FILES.words));

  console.log("Creating maps...");

  const strokeMap = new Map();
  const kanjiMap = new Map();

  /*
  -------------------------
  INSERT STROKES
  -------------------------
  */

  console.log("Inserting strokes...");

  const strokeResult = await Strokes.insertMany(strokesData);

  strokesData.forEach((stroke, i) => {
    const id = strokeResult.insertedIds[i];
    strokeMap.set(stroke.kanjiVGId, id);
  });

  /*
  -------------------------
  PREPARE KANJIS
  -------------------------
  */

  console.log("Preparing kanjis...");

  const kanjiDocs = kanjiData.map(k => {

    const vgId = k.strokes?.kanjiVGId;
    const strokeId = strokeMap.get(vgId);

    const newDoc = {
      ...k,
      strokes: strokeId || null
    };

    return newDoc;
  });

  console.log("Inserting kanjis...");

  const kanjiResult = await Kanjis.insertMany(kanjiDocs);

  kanjiDocs.forEach((kanji, i) => {
    const id = kanjiResult.insertedIds[i];
    kanjiMap.set(kanji.kanji, id);
  });

  /*
  -------------------------
  ADD KRAD COMPONENTS
  -------------------------
  */

  console.log("Adding radical components...");

  const kradBulk = [];

  kradData.forEach(entry => {

    const id = kanjiMap.get(entry.kanji);
    if (!id) return;

    kradBulk.push({
      updateOne: {
        filter: { _id: id },
        update: {
          $set: {
            "radicals.components": entry.componentsClean
          }
        }
      }
    });

  });

  if (kradBulk.length) {
    await Kanjis.bulkWrite(kradBulk);
  }

  /*
  -------------------------
  PREPARE RADICALS
  -------------------------
  */

  console.log("Preparing radicals...");

  const radicalDocs = radicalsData.map(rad => {

    const kanjiIds = rad.kanji
      .map(k => kanjiMap.get(k))
      .filter(Boolean);

    return {
      ...rad,
      kanji: kanjiIds
    };

  });

  console.log("Inserting radicals...");

  await Radicals.insertMany(radicalDocs);

  /*
  -------------------------
  PREPARE WORDS
  -------------------------
  */

  console.log("Preparing words...");

  const wordDocs = wordsData.map(word => {

    const kanjiIds = (word.kanjiCharacters || [])
      .map(k => kanjiMap.get(k))
      .filter(Boolean);

    return {
      ...word,
      kanjiCharacters: kanjiIds
    };

  });

  console.log("Inserting words...");

  const batchSize = 5000;

  for (let i = 0; i < wordDocs.length; i += batchSize) {

    const batch = wordDocs.slice(i, i + batchSize);

    await Words.insertMany(batch);

    console.log(`Inserted words: ${i + batch.length}/${wordDocs.length}`);
  }

  console.log("Import completed.");

  await client.close();
}

async function migrate() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Conectado a MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(kana);

        // 1. Leer el archivo original
        const fileContent = fs.readFileSync('kana.json', 'utf8');
        let rawData = JSON.parse(fileContent);

        // CORRECCIÓN: Si por alguna razón los datos vienen envueltos en una propiedad,
        // o si necesitamos validar que sea un array antes de iterar.
        if (!Array.isArray(rawData)) {
            // A veces, si exportaste desde una herramienta, los datos vienen en rawData.data o similar
            rawData = rawData.kanas || Object.values(rawData)[0] || [];
        }

        if (rawData.length === 0) {
            throw new Error("No se encontraron datos válidos para procesar.");
        }

        const preparedData = [];

        // 2. Ahora forEach no fallará
        rawData.forEach(entry => {

            // Procesar Seion (Sonido base)
            preparedData.push(transformEntry(entry, 'seion'));

            // Procesar Dakuon si existe
            if (entry.dakuon) {
                preparedData.push(transformEntry(entry, 'dakuon'));
            }

            // Procesar Handakuon si existe
            if (entry.handakuon) {
                preparedData.push(transformEntry(entry, 'handakuon'));
            }
        });

        // 3. Limpiar colección e insertar
        await collection.deleteMany({}); // Opcional: limpia antes de subir
        const result = await collection.insertMany(preparedData);
        
        console.log(`🚀 Éxito: Se insertaron ${result.insertedCount} documentos.`);

    } catch (err) {
        console.error("❌ Error en la migración:", err);
    } finally {
        await client.close();
    }
}

/**
 * Función auxiliar para normalizar cada tipo de sonido
 */
function transformEntry(item, soundCategory) {
    const isCompound = item.seion.romaji.length > 2 && !["shi", "chi", "tsu", "dji", "dzu"].includes(item.seion.romaji); // Ejemplo: "kya" vs "ka"
    
    const data = item[soundCategory];
    
    // Si no hay datos de trazos (común en diptongos), se hereda del padre o se calcula
    // En Dakuon/Handakuon sumamos los trazos de las marcas (") o (°)
    let hStrokes = item.strokes ? item.strokes.hiragana : null;
    let kStrokes = item.strokes ? item.strokes.katakana : null;

    if (soundCategory === 'dakuon' && hStrokes) {
        hStrokes += 2; // +2 por el dakuten
        kStrokes += 2;
    } else if (soundCategory === 'handakuon' && hStrokes) {
        hStrokes += 1; // +1 por el círculo
        kStrokes += 1;
    }

    return {
        romaji: data.romaji,
        type: isCompound ? "diphthong" : "basic",
        category: soundCategory,
        hiragana: {
            char: data.hiragana,
            strokes: hStrokes
        },
        katakana: {
            char: data.katakana,
            strokes: kStrokes
        },
        is_compound: isCompound,
        updated_at: new Date()
    };
}

async function fixStrokeLinks() {

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);

  const Kanjis = db.collection("kanjis");
  const Strokes = db.collection("strokes");

  console.log("Loading strokes...");

  const strokeMap = new Map();

  const strokes = await Strokes.find().toArray();

  strokes.forEach(s => {

    const key = s.codepoint.replace(/^0+/, "").toLowerCase();

    strokeMap.set(key, s._id);

  });

  console.log("Stroke map size:", strokeMap.size);

  const cursor = Kanjis.find({ strokes: null });

  let updated = 0;
  let missing = 0;

  while (await cursor.hasNext()) {

    const kanji = await cursor.next();

    const cp = kanji.unicode?.codePoint;

    if (!cp) continue;

    const key = cp.replace(/^0+/, "").toLowerCase();

    const strokeId = strokeMap.get(key);

    if (!strokeId) {
      missing++;
      continue;
    }

    await Kanjis.updateOne(
      { _id: kanji._id },
      { $set: { strokes: strokeId } }
    );

    updated++;

  }

  console.log("Updated:", updated);
  console.log("Missing:", missing);

  await client.close();
}


run().catch(console.error);
migrate();
fixStrokeLinks();