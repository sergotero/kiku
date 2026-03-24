import createHttpError from "http-errors";
import Kanji from "../models/kanji.model.js";
import Stroke from "../models/stroke.model.js";

export async function create(req, res) {
  const kanji = req.body;
  const kanjiCheck = await Kanji.find({kanji: {$eq: kanji.kanji}}, {
      kanji: 1,
      classification: 1,
      strokes: 1,
      readings: 1,
      "meanings.en": 1,
      "meanings.es": 1,
      "radicals.components": 1
    });
    
  if(kanjiCheck.length > 0) {
    res.status(400).json( {message: "El kanji ya existe en la base de datos"} );
  } else {
    const newKanji = await Kanji.create(kanji);
    res.status(200).json( newKanji );
  } 
}

export async function list(req, res) {
  const { page, category, term } = req.query;
  const offset = 12;
  const skip = page * offset;
  
  const criterial = {};

  if (category) {
    if (category.includes("JLPT")) criterial["classification.jlptLevel"] = parseInt(category.slice(4));
    if (category.includes("grado")) criterial["classification.gradeLevel"] = parseInt(category.slice(6));
    if (category === "hyougaiji") criterial["classification.gradeLevel"] = null;
    if (category.includes("top")) criterial["classification.frequencyRank"] = { $lte: parseInt(category.slice(4))};
  }

  if (term) {
    criterial["search"] = term;
  }
  
  const kanjis = await Kanji.find(criterial,{
      kanji: 1,
      classification: 1,
      strokes: 1,
      readings: 1,
      "meanings.en": 1,
      "meanings.es": 1,
    }).limit(offset).skip(skip);
    
  if (kanjis.length < 1) {
    throw createHttpError(404, "No hay kanjis registrados en la base de datos");
  }
  res.status(200).json(kanjis);
}


export async function detail(req, res) {
  const {id} = req.params;
  
  const kanji = await Kanji.findById(id,{
    kanji: 1,
    classification: 1,
    strokes: 1,
    "readings.onyomi": 1,
    "readings.kunyomi": 1,
    "readings.nanori": 1,
    "meanings.en": 1,
    "meanings.es": 1
  }).populate("strokes");
  if (!kanji) {
    throw createHttpError(404, "Este kanji no existe en la base de datos");
  }
  res.status(200).json(kanji);
}

export async function update(req, res) {
  const {id} = req.params;
  const data = req.body;
  const storedKanji = await Kanji.findById(id);

  if (!storedKanji) {
    throw createHttpError(404, "Este kanji no existe en la base de datos");
  }

  const modifiedKanji = await Kanji.findByIdAndUpdate(id, data, {returnDocument: "after"});
  res.status(200).json(modifiedKanji);
}

export async function destroy(req, res) {
  const { id } = req.params;

  const kanji = await Kanji.findByIdAndDelete(id);
  if (!kanji) {
    throw createHttpError(404, "Este kanji no existe en la base de datos");
  }

  res.sendStatus(204);
}