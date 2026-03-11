import createHttpError from "http-errors";
import Kanji from "./../models/kanji.model.js";

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
    console.log("Check: ", kanjiCheck);
    
  if(kanjiCheck.length > 0) {
    res.status(400).json( {message: "El kanji ya existe en la base de datos"} );
  } else {
    const newKanji = await Kanji.create(kanji);
    res.status(200).json( newKanji );
  } 
}

export async function list(req, res) {
  const kanjis = await Kanji.find({},{
      kanji: 1,
      classification: 1,
      strokes: 1,
      readings: 1,
      "meanings.en": 1,
      "meanings.es": 1,
      "radicals.components": 1
    }
);
  res.status(200).json(kanjis);
}

export async function detail(req, res) {
  const {id} = req.params;
  
  const kanji = await Kanji.findById(id);
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