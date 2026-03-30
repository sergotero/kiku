import createHttpError from "http-errors";
import Word from "../models/word.model.js";

export async function create(req, res){

  const checkWord = await Word.findOne({
    $or: [
      {searchForms: req.body.word[0].text},
      {romaji: req.body.word[0].text}
    ]
  });

  if(checkWord) {
    throw createHttpError(400, "La palabra ya existe en la base de datos");
  } else {
    const newWord = await Word.create(req.body);
    res.status(201).json(newWord);
  }
}

export async function list(req, res){
  const { page, category, term, example } = req.query;
  const offset = 12;
  const skip = page * offset;
  
  const criterial = {};
  
  if (category) criterial["senses.partOfSpeech.code_XML"] = category;
  if (term) criterial["$or"] = [{searchForms: term}, {romaji: term}];
  if (example) criterial["kanjiCharacters"] = example;

  const words = await Word.find(criterial, {
    "word.text": 1,
    "word.info": 1,
    "readings.text": 1,
    "senses.glosses": 1,
    kanjiCharacters: 1
  }).limit(offset).skip(skip);

  res.status(200).json(words);
}

export async function detail(req, res){
  const { id } = req.params;
  const word = await Word.findById(id, {
    "word.text": 1,
    "word.info": 1,
    "readings.text": 1,
    "senses.partOfSpeech": 1,
    "senses.fields": 1,
    "senses.glosses": 1,
    kanjiCharacters: 1
  }).populate("kanjiCharacters","kanji");

  if(!word) {
    throw createHttpError(404, "La palabra no se encuentra en la base de datos");
  }

  res.status(200).json(word);
}

export async function update(req, res){
  const { id } = req.params;
  const data = req.body;
  const storedWord = await Word.findById(id);

  if (!storedWord) {
    throw createHttpError(404, "La palabra no existe en la base de datos");
  }

  const word = await Word.findByIdAndUpdate(id, data, {returnDocument: "after"});
  res.status(200).json(word);
}

export async function destroy(req, res){
  const { id } = req.params;
  const word = await Word.findByIdAndDelete(id);

  if (!word) {
    throw createHttpError(404, "La palabra no existe en la base de datos");
  }
  
  res.sendStatus(204);
}
