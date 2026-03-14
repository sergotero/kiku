import Kana from "../models/kana.model.js";
import createHttpError from "http-errors";

export async function list(req, res) {
  const hiragana = await Kana.find({type: "basic", category: "seion"},{romaji: 1, "hiragana.char": 1, "hiragana.strokes": 1});
  const katakana = await Kana.find({type: "basic", category: "seion"},{romaji: 1, "katakana.char": 1, "katakana.strokes": 1});
  const hiraganaDiphthongs = await Kana.find({type: "diphthong", category: "seion"},{romaji: 1, "hiragana.char": 1, "hiragana.strokes": 1});
  const katakanaDiphthongs = await Kana.find({type: "diphthong", category: "seion"},{romaji: 1, "katakana.char": 1, "katakana.strokes": 1});
  const hiraganaDakuon = await Kana.find({type: "basic", category: "dakuon"},{romaji: 1, "hiragana.char": 1, "hiragana.strokes": 1});
  const katakanaDakuon = await Kana.find({type: "basic", category: "dakuon"},{romaji: 1, "katakana.char": 1, "katakana.strokes": 1});
  const hiraganaHandakuon = await Kana.find({type: "basic", category: "handakuon"},{romaji: 1, "hiragana.char": 1, "hiragana.strokes": 1});
  const katakanaHandakuon = await Kana.find({type: "basic", category: "handakuon"},{romaji: 1, "katakana.char": 1, "katakana.strokes": 1});

  const kanas = { hiragana, katakana, hiraganaDiphthongs, katakanaDiphthongs, hiraganaDakuon, katakanaDakuon, hiraganaHandakuon, katakanaHandakuon };

  res.status(200).json(kanas);
}

export async function detail(req, res) {
  const { id } = req.params;
  
  const kana = await Kana.findById(id);

  if(!kana) {
    throw createHttpError(404, "El kana no está registrado en la base de datos");
  }

  res.status(200).json(kana);
}