import mongoose from "mongoose";

// --- Sub-schemas ---
const termSchema = mongoose.Schema({
  text: { type: String, required: true, unique: true, index: true },
  info: [String],
  priority: [String]
},
{ _id: false });

const readingSchema = mongoose.Schema({
  text: { type: String, required: true },
  noKanji: { type: Boolean, default: false },
  restrictedTo: [String],
  info: [String],
  priority: [String]
},
{ _id: false });

const partOfSpeechSchema = mongoose.Schema({
  code_XML: {type: String, required: true},
  label: {type: String, required: true} //index?
},
{ _id: false });

const glossesSchema = mongoose.Schema({
  eng: {type: [String], required: true}
},
{ _id: false });

const senseSchema = mongoose.Schema({
  restrictedToKanji: [String],
  restrictedToReading: [String],
  partOfSpeech: [partOfSpeechSchema],
  fields: {type: [String], required: true},
  misc: [String],
  dialect: [String],
  info: [String],
  crossReferences: [String],
  antonyms: [String],
  loanwordSource: [String],
  glosses: glossesSchema,
  examples: [String] 
},
{ _id: false });

// --- Schema Principal ---
const wordSchema = mongoose.Schema({
  id_XML: { type: Number, required: true },
  word: [termSchema],
  readings: [readingSchema],
  senses: [senseSchema],
  kanjiCharacters: {type: [mongoose.Types.ObjectId], ref: "Kanji"},
  searchForms: [String],
  romaji: [String]
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true }
});

const Word = mongoose.model("Word", wordSchema);

export default Word;