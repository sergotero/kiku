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
importDictionary.js
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

# 8. Post-Import Repair Script

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

Repair script:

```
fix-kanji-strokes.js
```

This script:

1. Normalizes both values
2. Matches them
3. Updates `Kanjis.strokes` with the correct ObjectId.

---

# 9. Recommended MongoDB Indexes

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

# 10. Complete Update Workflow

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


**Archivos descargados:**

- `JMdict_e.gz` (solo inglés)
- `kanjidic2.xml.gz`
- `kanjivg-20250816-all.zip`
- `kradzip.zip`
- `kana.json`

> Descarga: [Kanjidic](https://www.edrdg.org/kanjidic/kanjd2index_legacy.html)  
> Descarga: [JMDict](https://jedict.com/HTML/edict_doc.html)

---

## Entidades

Dentro del proyecto se definen las siguientes entidades principales:

| Entidad     | Descripción                              | Fuente        |
| ----------- | ---------------------------------------- | ------------- |
| **Kanji**   | Información completa de cada kanji       | KANJIDIC      |
| **Word**    | Entradas del diccionario de palabras     | JMdict        |
| **Radical** | Radicales y su clasificación             | radkfile      |
| **Kana**    | Sílabas del silabario japonés            | tabla interna |
| **Stroke**  | Información vectorial para dibujar kanji | KanjiVG       |

---

### Entidad Word

Estructura diseñada a partir de los campos del XML:

```JSON
{
  "_id": "69ab6170a04f50558e3796ed",
  "id_XML": 1000800,
  "word": [
    {
      "text": "可憐しい",
      "info": [
        {
          "code_XML": "sK",
          "label": "search-only kanji form"
        }
      ],
      "priority": []
    }
  ],
  "readings": [
    {
      "text": "いじらしい",
      "noKanji": false,
      "restrictedTo": [],
      "info": [],
      "priority": []
    }
  ],
  "senses": [
    {
      "restrictedToKanji": [],
      "restrictedToReading": [],
      "partOfSpeech": [
        {
          "code_XML": "adj-i",
          "label": "adjective (keiyoushi)"
        }
      ],
      "fields": [],
      "misc": [],
      "dialect": [],
      "info": [],
      "crossReferences": [],
      "antonyms": [],
      "loanwordSource": [],
      "glosses": {},
      "examples": []
    }
  ]
}
```

> Comentario: `Word` contiene información completa sobre formas, lecturas, significados, ejemplos, préstamos lingüísticos y traducciones por idioma.

| Campo                  | Tipo          | Descripción              | Relación |
| ---------------------- | ------------- | ------------------------ | -------- |
| id                     | number        | ID JMdict                | PK       |
| word.text              | string        | Forma escrita            | → Kanji  |
| word.info              | array<string> | Información ortográfica  | -        |
| word.priority          | array<string> | Frecuencia               | -        |
| readings.text          | string        | Forma en kana            | → Kana   |
| readings.noKanji       | boolean       | No usa kanji             | -        |
| readings.restrictedTo  | array<string> | Solo para ciertas formas | -        |
| readings.info          | array<string> | Notas                    | -        |
| readings.priority      | array<string> | Prioridad                | -        |
| senses.partOfSpeech    | array<string> | Categoría gramatical     | -        |
| senses.fields          | array<string> | Campo técnico            | -        |
| senses.misc            | array<string> | Registro                 | -        |
| senses.dialect         | array<string> | Dialecto                 | -        |
| senses.info            | array<string> | Notas                    | -        |
| senses.crossReferences | array<string> | Referencias              | → Word   |
| senses.antonyms        | array<string> | Antónimos                | → Word   |
| senses.loanwordSource  | array<object> | Origen préstamo          | -        |
| senses.glosses         | object        | Traducciones             | -        |
| senses.examples        | array<object> | Frases ejemplo           | -        |

### Relación 

| Con           |  Tipo  | Explicación                                                                          |
| ------------- |  ----  | ------------------------------------------------------------------------------------ |
| Word - Kanji  | N - N  | Una palabra puede tener varios kanji, un kanji puede pertenecer a más de una palabra |

---

### Entidad Kanji

Estructura diseñada a partir de los campos del XML:

```JSON
{
  "_id":  "69abe9c59df83af4f92f9748",
  "kanji": "愛",
  "unicode": {
    "codePoint": "611b",
    "hex": "0x611b",
    "additional": [
      {
        "type": "jis208",
        "value": "1-16-06"
      }
    ]
  },
  "classification": {
    "radicals": [
      {
        "system": "classical",
        "number": 61
      },
      {
        "system": "nelson_c",
        "number": 87
      }
    ],
    "gradeLevel": 4,
    "jlptLevel": 2,
    "frequencyRank": 640
  },
  "strokes": {
    "count": 13,
    "alternateCounts": [],
    "kanjiVGId": "0611B"
  },
  "variants": [],
  "references": {
    "dictionaryCodes": [
      {
        "dictionary": "nelson_c",
        "entry": "2829",
        "volume": null,
        "page": null
      },
    ],
    "queryCodes": [
      {
        "type": "skip",
        "value": "2-4-9",
        "misclassification": null
      }
    ]
  },
  "readings": {
    "onyomi": [
      {
        "reading": "アイ",
        "common": false
      }
    ],
    "kunyomi": [
      {
        "reading": "いと.しい",
        "common": false
      },
      {
        "reading": "かな.しい",
        "common": false
      },
      {
        "reading": "め.でる",
        "common": false
      },
      {
        "reading": "お.しむ",
        "common": false
      },
      {
        "reading": "まな",
        "common": false
      }
    ],
    "nanori": ["あ", "あし", "え", "かな", "なる", "めぐ", "めぐみ", "よし","ちか"],
    "chinese": ["ai4"],
    "korean": ["ae"],
    "vietnamese": ["Ái"]
  },
  "meanings": {
    "en": [
      "Love",
      "Affection",
      "Favourite"
    ],
    "fr": [
      "Amour",
      "Affection",
      "Favori"
    ],
    "es": [
      "Amor",
      "Afecto",
      "Favorito"
    ],
    "pt": [
      "Amor",
      "Afeição",
      "Favorito"
    ]
  },
  "radicalNames": [],
  "components": ["心", "爪", "冖", "夂"]
}
```

> Comentario: Incluye todo lo necesario para mostrar, animar y relacionar cada kanji dentro de la app.


| Campo                        | Tipo          | Descripción                | Relación  |
| ---------------------------- | ------------- | -------------------------- | --------- |
| kanji                        | string        | Carácter kanji             | PK        |
| unicode.codePoint            | string        | Código Unicode             |           |
| unicode.hex                  | string        | Hexadecimal                |           |
| classification.radicals      | array<object> | Radicales según sistemas   | → Radical |
| classification.gradeLevel    | number        | Nivel escolar japonés      |           |
| classification.jlptLevel     | number        | Nivel JLPT                 |           |
| classification.frequencyRank | number        | Frecuencia                 |           |
| strokes.count                | number        | Número de trazos           |           |
| strokes.alternateCounts      | array<number> | Conteos alternativos       |           |
| strokes.kanjiVGId            | string        | ID del SVG                 | → Stroke  |
| variants                     | array<object> | Variantes gráficas         |           |
| references.dictionaryCodes   | array<object> | Referencias a diccionarios |           |
| references.queryCodes        | array<object> | Códigos de búsqueda        |           |
| readings.onyomi              | array<object> | Lecturas ON                |           |
| readings.kunyomi             | array<object> | Lecturas KUN               |           |
| readings.nanori              | array<string> | Lecturas de nombre         |           |
| readings.chinese             | array<string> | Lecturas chinas            |           |
| readings.korean              | array<string> | Lecturas coreanas          |           |
| readings.vietnamese          | array<string> | Lecturas vietnamitas       |           |
| meanings                     | object        | Significados por idioma    |           |
| radicalNames                 | array<string> | Nombre del radical         | → Radical |


| Con     | Tipo | Explicación                           |
| ------- | ---- | ------------------------------------- |
| Radical | N-N  | un kanji puede tener varios radicales |
| Stroke  | 1-1  | un kanji tiene un SVG                 |
| Word    | N-N  | un kanji aparece en muchas palabras   |

### Entidad Radical

| Campo    | Tipo          | Descripción                             |
| -------- | ------------- | --------------------------------------- |
| radical  | string        | Carácter radical                        |
| number   | number        | Número radical Kangxi                   |
| strokes  | number        | Nº trazos                               |
| name     | string        | Nombre del radical                      |
| meanings | object        | Significados                            |
| kanji    | array<string> | Lista de kanji que contienen el radical |


| Con   | Tipo |
| ----- | ---- |
| Kanji | N-N  |

### Entidad Kana

| Campo       | Tipo   | Descripción         |
| ----------- | ------ | ------------------- |
| kana        | string | Carácter kana       |
| romaji      | string | Transcripción       |
| type        | string | hiragana / katakana |
| column      | string | Columna fonética    |
| row         | string | Fila fonética       |
| strokeCount | number | Nº trazos           |

### Entidad Stroke

| Campo         | Tipo   | Descripción   |
| ------------- | ------ | ------------- |
| kanji         | string | Kanji         |
| kanjiVGId     | string | ID del SVG    |
| codepoint     | string | Unicode       |
| strokeCount   | number | Nº trazos     |
| strokes.order | number | Orden         |
| strokes.type  | string | Tipo de trazo |
| strokes.path  | string | Path SVG      |

| Con   | Tipo |
| ----- | ---- |
| Kanji | 1-1  |

---

## Endpoints

### Kanji

| Método | Endpoint          | Descripción                                                | Rol requerido |
| ------ | ----------------- | ---------------------------------------------------------- | ------------- |
| GET    | `/api/kanjis`     | Recupera todos los kanjis almacenados en la base de datos. | Público       |
| POST   | `/api/kanjis`     | Crea un nuevo kanji en la base de datos.                   | Administrador |
| GET    | `/api/kanjis/:id` | Recupera la información de un kanji específico.            | Público       |
| PATCH  | `/api/kanjis/:id` | Modifica la información de un kanji existente.             | Administrador |
| DELETE | `/api/kanjis/:id` | Elimina un kanji de la base de datos.                      | Administrador |


### Radicales

| Método | Endpoint            | Descripción                                                   | Rol requerido |
| ------ | ------------------- | ------------------------------------------------------------- | ------------- |
| GET    | `/api/radicals`     | Recupera todos los radicales almacenados en la base de datos. | Público       |
| POST   | `/api/radicals`     | Crea un nuevo radical en la base de datos.                    | Administrador |
| GET    | `/api/radicals/:id` | Recupera la información de un radical específico.             | Público       |
| PATCH  | `/api/radicals/:id` | Modifica la información de un radical existente.              | Administrador |
| DELETE | `/api/radicals/:id` | Elimina un radical de la base de datos.                       | Administrador |


### Kanas

| Método | Endpoint         | Descripción                                              | Rol requerido |
| ------ | ---------------- | -------------------------------------------------------- | ------------- |
| GET    | `/api/kanas`     | Recupera todos los kana almacenados en la base de datos. | Público       |
| POST   | `/api/kanas`     | Crea un nuevo kana en la base de datos.                  | Administrador |
| GET    | `/api/kanas/:id` | Recupera la información de un kana específico.           | Público       |
| PATCH  | `/api/kanas/:id` | Modifica la información de un kana existente.            | Administrador |
| DELETE | `/api/kanas/:id` | Elimina un kana de la base de datos.                     | Administrador |

### Words

| Método | Endpoint                | Descripción                                                  | Parámetros               | Rol requerido         |
| ------ | ----------------------- | ------------------------------------------------------------ | ---------------------    | --------------------- |
| GET    | `/api/words`            | Recupera todas las palabras registradas en la base de datos. | POS, fields, searchForms | Administrador         |
| POST   | `/api/words`            | Crea una nueva palabra en la base de datos.                  | body                     | Usuario no registrado |
| PATCH  | `/api/words/:id`        | Modifica la información de una palabra.                      | updated fields           | Administrador         |
| DELETE | `/api/words/:id`        | Elimina una palabra de la base de datos.                     |                          | Administrador         |

### Usuarios

| Método | Endpoint                | Descripción                                                  | Rol requerido         |
| ------ | ----------------------- | ------------------------------------------------------------ | --------------------- |
| GET    | `/api/users`            | Recupera todos los usuarios registrados en la base de datos. | Administrador         |
| POST   | `/api/users`            | Crea un nuevo usuario en la base de datos.                   | Usuario no registrado |
| PATCH  | `/api/users/:id`        | Modifica los permisos o información de un usuario.           | Administrador         |
| DELETE | `/api/users/:id`        | Elimina un usuario de la base de datos.                      | Administrador         |
| GET    | `/api/users/profile/me` | Recupera la información del usuario autenticado.             | Usuario registrado    |


### Registro y login

| Método | Endpoint        | Descripción                                                                                                 | Rol requerido         |
| ------ | --------------- | ----------------------------------------------------------------------------------------------------------- | --------------------- |
| POST   | `/api/register` | Registra un nuevo usuario en la base de datos.                                                              | Usuario no registrado |
| POST   | `/api/login`    | Verifica las credenciales del usuario y permite el acceso (normalmente devuelve un token de autenticación). | Usuario registrado    |


### Contacto / Reporte de problemas

| Método | Endpoint       | Descripción                                                                | Rol requerido      |
| ------ | -------------- | -------------------------------------------------------------------------- | ------------------ |
| POST   | `/api/reports` | Envía un informe o aviso de error relacionado con una entrada del sistema. | Usuario registrado |


> Comentario: Los endpoints siguen el patrón REST estándar; se pueden extender a filtros y paginación según sea necesario.