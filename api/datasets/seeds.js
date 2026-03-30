import fs from "fs";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "kiku";
const kanaCollectionName = 'kanas';

const FILES = {
    kanji: "./datasets/kanji.json",
    strokes: "./datasets/strokes.json",
    radicals: "./datasets/radk.json",
    krad: "./datasets/krad.json",
    words: "./datasets/JMdict.json",
    kana: "./datasets/kana.json"
};

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("✅ Conectado a MongoDB - Iniciando carga de semillas");

        // 0. Limpieza previa para evitar errores de duplicados o memoria
        console.log("Cleaning collections...");
        await db.collection("kanjis").deleteMany({});
        await db.collection("strokes").deleteMany({});
        await db.collection("radicals").deleteMany({});
        await db.collection("words").deleteMany({});

        const strokeMap = new Map();
        const kanjiMap = new Map();

        // 1. STROKES
        console.log("Step 1: Processing strokes...");
        const strokesData = JSON.parse(fs.readFileSync(FILES.strokes));
        const strokeResult = await db.collection("strokes").insertMany(strokesData);
        strokesData.forEach((stroke, i) => {
            strokeMap.set(stroke.kanjiVGId, strokeResult.insertedIds[i]);
        });
        console.log(`✔ Strokes inserted: ${strokesData.length}`);

        // 2. KANJIS
        console.log("Step 2: Processing kanjis...");
        const kanjiData = JSON.parse(fs.readFileSync(FILES.kanji));
        const kanjiDocs = kanjiData.map(k => ({
            ...k,
            strokes: strokeMap.get(k.strokes?.kanjiVGId) || null
        }));
        
        const kanjiResult = await db.collection("kanjis").insertMany(kanjiDocs);
        kanjiDocs.forEach((kanji, i) => {
            kanjiMap.set(kanji.kanji, kanjiResult.insertedIds[i]);
        });
        console.log(`✔ Kanjis inserted: ${kanjiDocs.length}`);

        // 3. KRAD COMPONENTS (Bulk update)
        console.log("Step 3: Adding radical components...");
        const kradData = JSON.parse(fs.readFileSync(FILES.krad));
        const kradBulk = [];
        kradData.forEach(entry => {
            const id = kanjiMap.get(entry.kanji);
            if (id) {
                kradBulk.push({
                    updateOne: {
                        filter: { _id: id },
                        update: { $set: { "radicals.components": entry.componentsClean } }
                    }
                });
            }
        });
        if (kradBulk.length) await db.collection("kanjis").bulkWrite(kradBulk);
        console.log("✔ Krad components updated");

        // 4. RADICALS
        console.log("Step 4: Processing radicals...");
        const radicalsData = JSON.parse(fs.readFileSync(FILES.radicals));
        const radicalDocs = radicalsData.map(rad => ({
            ...rad,
            kanji: rad.kanji.map(k => kanjiMap.get(k)).filter(Boolean)
        }));
        await db.collection("radicals").insertMany(radicalDocs);
        console.log(`✔ Radicals inserted: ${radicalDocs.length}`);

        // 5. WORDS (Batch processing para memoria)
        console.log("Step 5: Processing words (this may take a while)...");
        const wordsData = JSON.parse(fs.readFileSync(FILES.words));
        const batchSize = 5000;
        for (let i = 0; i < wordsData.length; i += batchSize) {
            const batch = wordsData.slice(i, i + batchSize).map(word => ({
                ...word,
                kanjiCharacters: (word.kanjiCharacters || []).map(k => kanjiMap.get(k)).filter(Boolean)
            }));
            await db.collection("words").insertMany(batch);
            console.log(`Inserted words: ${i + batch.length}/${wordsData.length}`);
        }

        console.log("⭐ All primary seeds completed successfully.");
    } catch (err) {
        console.error("❌ Error en función run():", err);
    } finally {
        await client.close();
    }
}

async function migrate() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(kanaCollectionName);

        console.log("Step 6: Migrating Kanas...");
        const fileContent = fs.readFileSync(FILES.kana, 'utf8');
        let rawData = JSON.parse(fileContent);

        if (!Array.isArray(rawData)) {
            rawData = rawData.kanas || Object.values(rawData)[0] || [];
        }

        const preparedData = [];
        rawData.forEach(entry => {
            preparedData.push(transformEntry(entry, 'seion'));
            if (entry.dakuon) preparedData.push(transformEntry(entry, 'dakuon'));
            if (entry.handakuon) preparedData.push(transformEntry(entry, 'handakuon'));
        });

        await collection.deleteMany({});
        const result = await collection.insertMany(preparedData);
        console.log(`🚀 Éxito Kanas: Se insertaron ${result.insertedCount} documentos.`);
    } catch (err) {
        console.error("❌ Error en la migración de Kanas:", err);
    } finally {
        await client.close();
    }
}

function transformEntry(item, soundCategory) {
    const isCompound = item.seion.romaji.length > 2 && !["shi", "chi", "tsu", "dji", "dzu"].includes(item.seion.romaji);
    const data = item[soundCategory];
    let hStrokes = item.strokes ? item.strokes.hiragana : null;
    let kStrokes = item.strokes ? item.strokes.katakana : null;

    if (soundCategory === 'dakuon' && hStrokes) { hStrokes += 2; kStrokes += 2; }
    else if (soundCategory === 'handakuon' && hStrokes) { hStrokes += 1; kStrokes += 1; }

    return {
        romaji: data.romaji,
        type: isCompound ? "diphthong" : "basic",
        category: soundCategory,
        hiragana: { char: data.hiragana, strokes: hStrokes },
        katakana: { char: data.katakana, strokes: kStrokes },
        is_compound: isCompound,
        updated_at: new Date()
    };
}

async function fixStrokeLinks() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const Kanjis = db.collection("kanjis");
        const Strokes = db.collection("strokes");

        console.log("Step 7: Fixing stroke links...");
        const strokeMap = new Map();
        const strokes = await Strokes.find().toArray();
        strokes.forEach(s => {
            const key = s.codepoint.replace(/^0+/, "").toLowerCase();
            strokeMap.set(key, s._id);
        });

        const cursor = Kanjis.find({ strokes: null });
        let updated = 0;
        while (await cursor.hasNext()) {
            const kanji = await cursor.next();
            const cp = kanji.unicode?.codePoint;
            if (!cp) continue;
            const key = cp.replace(/^0+/, "").toLowerCase();
            const strokeId = strokeMap.get(key);
            if (strokeId) {
                await Kanjis.updateOne({ _id: kanji._id }, { $set: { strokes: strokeId } });
                updated++;
            }
        }
        console.log(`✔ Links fixed: ${updated}`);
    } catch (err) {
        console.error("❌ Error en fixStrokeLinks:", err);
    } finally {
        await client.close();
    }
}

// Ejecución secuencial para proteger la memoria RAM
async function main() {
    await run();
    await migrate();
    await fixStrokeLinks();
    console.log("🏁 IMPORTACIÓN TOTAL FINALIZADA");
    process.exit(0);
}

main().catch(err => {
    console.error("💥 Error crítico en el proceso principal:", err);
    process.exit(1);
});