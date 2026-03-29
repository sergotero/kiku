# Japanese Dictionary Database Build Pipeline

This document describes the **complete process used to generate and import the Japanese dictionary datasets** used by the application.
Following these steps in the same order will allow the databases to be **recreated or updated when new source datasets are released**.

The pipeline integrates the following upstream datasets:

* **JMdict** – Japanese multilingual dictionary
* **KANJIDIC2** – Kanji metadata
* **KanjiVG** – Stroke order diagrams
* **KRADFILE** – Kanji components
* **RADKFILE** – Radical → Kanji mapping

---

# 1. Source Datasets

Download the latest versions from the official EDRDG sources.

Typical files used:

```
JMdict.xml
kanjidic2.xml
kradfile
radkfile
kanjivg.xml (or SVG set)
```

These are converted into JSON files using custom parsing scripts.

---

# 2. Dataset Parsing

Each upstream dataset is parsed into an intermediate JSON file before integration.

Resulting files:

```
JMdict.json      → Words collection
kanji.json       → Kanjis collection
strokes.json     → Strokes collection
krad.json        → Kanji components
radk.json        → Radicals collection
```

---

# 3. KANJIDIC2 Parsing

Script parses:

```
kanjidic2.xml → kanji.json
```

Important transformations applied during parsing:

### Unicode information

```
unicode.codePoint
unicode.hex
```

### Classification

```
classification.gradeLevel
classification.jlptLevel
classification.frequencyRank
```

### Radical changes

Original structure:

```
classification.radicals
radicalNames
```

Converted to:

```
radicals.names
radicals.references
```

---

# 4. KanjiVG Parsing

KanjiVG SVG files are parsed into:

```
strokes.json
```

Each document contains:

```
kanji
kanjiVGId
codepoint
strokeCount
strokes[]
components[]
```

Example:

```
{
  kanji: "亜",
  kanjiVGId: "04e9c",
  codepoint: "04e9c",
  strokes: [...]
}
```

---

# 5. KRADFILE Parsing

KRADFILE generates:

```
krad.json
```

Structure:

```
{
  kanji: "亜",
  components: ["｜","一","口"],
  componentsClean: ["｜","一","口"],
  componentCount: 3
}
```

These components will later be inserted into:

```
Kanjis.radicals.components
```

---

# 6. RADKFILE Parsing

RADKFILE generates:

```
radk.json
```

Structure:

```
{
  radical: "一",
  kanji: ["亜","唖","娃"]
}
```

During database import, the `kanji` array will be converted to **ObjectId references**.

---

# 7. Database Import Script

Main script:

```
datasets/seeds.js
```

This script performs the complete database integration.

## Import order

The collections must be inserted in the following order:

```
1. Strokes
2. Kanjis
3. KRAD components update
4. Radicals
5. Words
6. Kanas
```

---

## Step 1 — Insert Strokes

```
strokes.json → strokes collection
```

A lookup map is created:

```
kanjiVGId → ObjectId
```

---

## Step 2 — Insert Kanjis

```
kanji.json → kanjis collection
```

During insertion:

```
Kanjis.strokes = ObjectId of matching stroke
```

A second lookup map is created:

```
kanji character → ObjectId
```

---

## Step 3 — Insert KRAD Components

Using `krad.json`, update the existing kanji documents:

```
Kanjis.radicals.components
```

---

## Step 4 — Insert Radicals

```
radk.json → radicals collection
```

Transformation:

```
kanji: ["亜","唖","娃"]
```

becomes

```
kanji: [ObjectId, ObjectId, ObjectId]
```

using the kanji map.

---

## Step 5 — Insert Words

```
JMdict.json → words collection
```

Transformation:

```
kanjiCharacters: ["亜","悪"]
```

becomes

```
kanjiCharacters: [ObjectId, ObjectId]
```

---

## Step 6 — Insert Kanas

```
kana.json → kanas collection
```

---

## Step 7 - Post-Import corrections

In some cases the stroke reference may not match due to differences in:

```
codepoint format
leading zeros
letter casing
```

Example mismatch:

```
kanji.unicode.codePoint = 4e9c
strokes.codepoint      = 04e9c
```
This script:

1. Normalizes both values
2. Matches them
3. Updates `Kanjis.strokes` with the correct ObjectId.

---

# 8. Recommended MongoDB Indexes

After import, create the following indexes.

```
db.kanjis.createIndex({ kanji: 1 })
db.kanjis.createIndex({ search: 1 })

db.words.createIndex({ kanjiCharacters: 1 })

db.radicals.createIndex({ radical: 1 })

db.strokes.createIndex({ kanjiVGId: 1 })
db.strokes.createIndex({ codepoint: 1 })
```

These indexes significantly improve lookup performance for:

* kanji search
* word search
* radical search
* stroke retrieval

---

# 9. Complete Update Workflow

When updating the dictionary datasets, run the pipeline in this order:

```
1. Download latest datasets
2. Parse KANJIDIC2 → kanji.json
3. Parse KanjiVG → strokes.json
4. Parse KRADFILE → krad.json
5. Parse RADKFILE → radk.json
6. Parse JMdict → JMdict.json
7. Run importDictionary.js
8. Run fix-kanji-strokes.js (if needed)
9. Rebuild indexes
```

---

# Resulting MongoDB Collections

```
kanjis
strokes
radicals
words
```

Relationships:

```
Words → Kanjis
Radicals → Kanjis
Kanjis → Strokes
```

---

# Notes

* The import scripts assume **UTF-8 encoded JSON files**.
* All kanji relationships are stored using **MongoDB ObjectId references**.
* The pipeline is designed so that **only the JSON parsing scripts need to be rerun when updating source datasets**.


**Downloaded files:**

- `JMdict_e.gz` - [JMDict](https://jedict.com/HTML/edict_doc.html) (english only)
- `kanjidic2.xml.gz` - [Kanjidic](https://www.edrdg.org/kanjidic/kanjd2index_legacy.html)
- `kanjivg-20250816-all.zip` - [KanjiVG](https://github.com/KanjiVG/kanjivg/releases)
- `kradzip.zip` - [Kradzip](https://www.edrdg.org/krad/kradinf.html)
- `kana.json`

---

## Entities

Within the project, the following main entities are defined:

| Entity      | Description                                     | Source         |
| ----------- | ----------------------------------------------- | -------------- |
| **Kanji** | Complete information for each kanji             | KANJIDIC       |
| **Word** | Word dictionary entries                         | JMdict         |
| **Radical** | Radicals and their classification               | radkfile       |
| **Kana** | Syllables of the Japanese syllabary             | Internal table |
| **Stroke** | Vector information for drawing kanji            | KanjiVG        |

---

### Word Entity

| Field                  | Type          | Description              | Relationship |
| ---------------------- | ------------- | ------------------------ | ------------ |
| id                     | number        | JMdict ID                | PK           |
| word.text              | string        | Written form             | → Kanji      |
| word.info              | array<string> | Orthographic information | -            |
| word.priority          | array<string> | Frequency                | -            |
| readings.text          | string        | Kana form                | → Kana       |
| readings.noKanji       | boolean       | No kanji used            | -            |
| readings.restrictedTo  | array<string> | Only for certain forms   | -            |
| readings.info          | array<string> | Notes                    | -            |
| readings.priority      | array<string> | Priority                 | -            |
| senses.partOfSpeech    | array<string> | Part of speech           | -            |
| senses.fields          | array<string> | Technical field          | -            |
| senses.misc            | array<string> | Register                 | -            |
| senses.dialect         | array<string> | Dialect                  | -            |
| senses.info            | array<string> | Notes                    | -            |
| senses.crossReferences | array<string> | References               | → Word       |
| senses.antonyms        | array<string> | Antonyms                 | → Word       |
| senses.loanwordSource  | array<object> | Loanword origin          | -            |
| senses.glosses         | object        | Translations             | -            |
| senses.examples        | array<object> | Example sentences        | -            |

### Relationship

| Between       | Type  | Explanation                                                                 |
| ------------- | ----- | --------------------------------------------------------------------------- |
| Word - Kanji  | N - N | A word can have several kanji, a kanji can belong to more than one word.    |

---

### Kanji Entity

| Field                        | Type          | Description                 | Relationship |
| ---------------------------- | ------------- | --------------------------- | ------------ |
| kanji                        | string        | Kanji character             | PK           |
| unicode.codePoint            | string        | Unicode code point          |              |
| unicode.hex                  | string        | Hexadecimal                 |              |
| classification.radicals      | array<object> | Radicals by system          | → Radical    |
| classification.gradeLevel    | number        | Japanese school grade       |              |
| classification.jlptLevel     | number        | JLPT Level                  |              |
| classification.frequencyRank | number        | Frequency rank              |              |
| strokes.count                | number        | Stroke count                |              |
| strokes.alternateCounts      | array<number> | Alternative counts          |              |
| strokes.kanjiVGId            | string        | SVG ID                      | → Stroke     |
| variants                     | array<object> | Graphic variants            |              |
| references.dictionaryCodes   | array<object> | Dictionary references       |              |
| references.queryCodes        | array<object> | Search codes                |              |
| readings.onyomi              | array<object> | ON readings                 |              |
| readings.kunyomi             | array<object> | KUN readings                |              |
| readings.nanori              | array<string> | Name readings               |              |
| readings.chinese             | array<string> | Chinese readings            |              |
| readings.korean              | array<string> | Korean readings             |              |
| readings.vietnamese          | array<string> | Vietnamese readings         |              |
| meanings                     | object        | Meanings by language        |              |
| radicalNames                 | array<string> | Radical name                | → Radical    |

| Between | Type | Explanation                          |
| ------- | ---- | ------------------------------------ |
| Radical | N-N  | A kanji can have several radicals.   |
| Stroke  | 1-1  | A kanji has one SVG.                 |
| Word    | N-N  | A kanji appears in many words.       |

### Radical Entity

| Field    | Type          | Description                             |
| -------- | ------------- | --------------------------------------- |
| radical  | string        | Radical character                       |
| number   | number        | Kangxi radical number                   |
| strokes  | number        | Stroke count                            |
| name     | string        | Radical name                            |
| meanings | object        | Meanings                                |
| kanji    | array<string> | List of kanji containing the radical    |

| Between | Type |
| ------- | ---- |
| Kanji   | N-N  |

### Kana Entity

| Field       | Type   | Description          |
| ----------- | ------ | -------------------- |
| kana        | string | Kana character       |
| romaji      | string | Transcription        |
| type        | string | hiragana / katakana  |
| column      | string | Phonetic column      |
| row         | string | Phonetic row         |
| strokeCount | number | Stroke count         |

### Stroke Entity

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| kanji         | string | Kanji       |
| kanjiVGId     | string | SVG ID      |
| codepoint     | string | Unicode     |
| strokeCount   | number | Stroke count|
| strokes.order | number | Order       |
| strokes.type  | string | Stroke type |
| strokes.path  | string | SVG Path    |

| Between | Type |
| ------- | ---- |
| Kanji   | 1-1  |

---

## Endpoints

### Kanji

| Method | Endpoint          | Description                                         | Required Role |
| ------ | ----------------- | --------------------------------------------------- | ------------- |
| GET    | `/api/kanjis`     | Retrieves all kanjis stored in the database.        | Public        |
| POST   | `/api/kanjis`     | Creates a new kanji in the database.                | Admin         |
| GET    | `/api/kanjis/:id` | Retrieves information for a specific kanji.         | Public        |
| PATCH  | `/api/kanjis/:id` | Modifies information for an existing kanji.         | Admin         |
| DELETE | `/api/kanjis/:id` | Deletes a kanji from the database.                  | Admin         |

### Radicals

| Method | Endpoint            | Description                                         | Required Role |
| ------ | ------------------- | --------------------------------------------------- | ------------- |
| GET    | `/api/radicals`     | Retrieves all radicals stored in the database.      | Public        |
| POST   | `/api/radicals`     | Creates a new radical in the database.              | Admin         |
| GET    | `/api/radicals/:id` | Retrieves information for a specific radical.       | Public        |
| PATCH  | `/api/radicals/:id` | Modifies information for an existing radical.       | Admin         |
| DELETE | `/api/radicals/:id` | Deletes a radical from the database.                | Admin         |

### Kanas

| Method | Endpoint         | Description                                         | Required Role |
| ------ | ---------------- | --------------------------------------------------- | ------------- |
| GET    | `/api/kanas`     | Retrieves all kana stored in the database.          | Public        |
| POST   | `/api/kanas`     | Creates a new kana in the database.                 | Admin         |
| GET    | `/api/kanas/:id` | Retrieves information for a specific kana.          | Public        |
| PATCH  | `/api/kanas/:id` | Modifies information for an existing kana.          | Admin         |
| DELETE | `/api/kanas/:id` | Deletes a kana from the database.                   | Admin         |

### Words

| Method | Endpoint          | Description                                         | Required Role |
| ------ | ----------------- | --------------------------------------------------- | ------------- |
| GET    | `/api/words`      | Retrieves all words registered in the database.     | Public        |
| POST   | `/api/words`      | Creates a new word in the database.                 | Admin         |
| GET    | `/api/words/:id`  | Retrieves information for a specific word.          | Public        |
| PATCH  | `/api/words/:id`  | Modifies a word's information.                      | Admin         |
| DELETE | `/api/words/:id`  | Deletes a word from the database.                   | Admin         |

### Users

| Method | Endpoint          | Description                                         | Required Role |
| ------ | ----------------- | --------------------------------------------------- | ------------- |
| GET    | `/api/users`      | Retrieves all users registered in the database.     | Admin         |
| POST   | `/api/users`      | Creates a new user in the database.                 | Public        |
| PATCH  | `/api/users/:id`  | Modifies a user's permissions or information.       | Admin         |
| DELETE | `/api/users/:id`  | Deletes a user from the database.                   | Admin         |
| GET    | `/api/users/:id`  | Retrieves information for the authenticated user.   | Admin         |

### Login and Logout

| Method | Endpoint         | Description                                                                 | Required Role      |
| ------ | ---------------- | --------------------------------------------------------------------------- | ------------------ |
| POST   | `/api/sessions`  | Registers a new user in the database.                                       | Unregistered User  |
| DELETE | `/api/sessions`  | Verifies user credentials and allows access (usually returns an auth token).| Registered User    |

### Contact / Bug Reporting

| Method | Endpoint         | Description                                                                 | Required Role   |
| ------ | ---------------- | --------------------------------------------------------------------------- | --------------- |
| POST   | `/api/reports`   | Sends a report or error notice related to a system entry.                   | Registered User |